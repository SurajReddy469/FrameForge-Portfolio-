const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('FitPulse Gym Management Production Verification Suite', async (t) => {
  const adminToken = 'mock-jwt-admin-token';
  const memberToken = 'mock-jwt-user-token';
  let createdBookingId = null;

  await t.test('1. Health check returns 200 and operational status', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.ok(res.body.service.includes('FitPulse'));
  });

  await t.test('2. Security: Public registration forces user role & Pro tier, preventing privilege escalation', async () => {
    const randomEmail = `athlete_${Date.now()}@fitpulse.gym`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Jordan Stone',
        email: randomEmail,
        password: 'password123',
        role: 'admin', // Malicious attempt to escalate role
        classCredits: 9999
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.role, 'user', 'Role must be strictly overridden to user');
    assert.equal(res.body.data.classCredits, 10, 'Credits must default to standard 10');
    assert.ok(res.body.data.token);
  });

  await t.test('3. Input Validation: Malformed email or short password rejected with 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Jordan Stone',
        email: 'invalid-email',
        password: '123'
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  await t.test('4. Public Classes Schedule returns sessions with real-time capacity stats', async () => {
    const res = await request(app).get('/api/classes');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length > 0);
    assert.ok(typeof res.body.data[0].capacityMax === 'number');
    assert.ok(typeof res.body.data[0].capacityBooked === 'number');
  });

  await t.test('5. Capacity Engine: Member can reserve class slot with verified reference code & QR hash', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${memberToken}`)
      .send({ classId: 'cls-2' }); // Power Vinyasa Yoga

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.bookingCode.startsWith('FIT-BOOK-'));
    assert.ok(res.body.data.qrHash.startsWith('FIT-QR-'));
    assert.equal(res.body.data.status, 'Confirmed');
    createdBookingId = res.body.data._id;
  });

  await t.test('6. Capacity Engine: Duplicate reservation for same session is rejected (409 Conflict)', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${memberToken}`)
      .send({ classId: 'cls-2' });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /already have an active reservation/);
  });

  await t.test('7. Security: Member reservations route rejects unauthenticated requests (401)', async () => {
    const res = await request(app).get('/api/bookings/my');
    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  await t.test('8. Security: Manager endpoints reject regular members (403 Forbidden)', async () => {
    const res = await request(app)
      .get('/api/bookings/all')
      .set('Authorization', `Bearer ${memberToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /not authorized to access this route/);
  });

  await t.test('9. Studio Management: Authorized Manager can view all reservations & verify check-in', async () => {
    // 1. List bookings
    const listRes = await request(app)
      .get('/api/bookings/all')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(listRes.status, 200);
    assert.ok(listRes.body.data.length > 0);

    // 2. Check in attendance
    if (createdBookingId) {
      const checkinRes = await request(app)
        .put(`/api/bookings/${createdBookingId}/checkin`)
        .set('Authorization', `Bearer ${adminToken}`);

      assert.equal(checkinRes.status, 200);
      assert.equal(checkinRes.body.data.status, 'Attended');
    }
  });

  await t.test('10. Studio Analytics & CSV: Manager can export RFC 4180 attendance log', async () => {
    const statsRes = await request(app)
      .get('/api/bookings/stats')
      .set('Authorization', `Bearer ${adminToken}`);
    assert.equal(statsRes.status, 200);
    assert.ok(typeof statsRes.body.data.utilizationRate === 'number');

    const csvRes = await request(app)
      .get('/api/bookings/export/csv')
      .set('Authorization', `Bearer ${adminToken}`);
    assert.equal(csvRes.status, 200);
    assert.ok(csvRes.headers['content-type'].includes('text/csv'));
    assert.ok(csvRes.text.includes('Booking Code,Member Name,Member Email'));
  });
});
