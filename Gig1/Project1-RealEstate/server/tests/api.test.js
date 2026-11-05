import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('UrbanNest Real Estate Production Verification Suite', async (t) => {
  let userToken = '';
  let adminToken = '';

  await t.test('1. Health check returns 200 and operational status', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.equal(res.body.service, 'UrbanNest Real Estate API');
  });

  await t.test('2. Security: Public registration forces user role and prevents privilege escalation', async () => {
    const randomEmail = `buyer_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Prospective Buyer',
        email: randomEmail,
        password: 'password123',
        role: 'admin' // Attempted privilege escalation
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.role, 'user');
    assert.ok(res.body.data.token);
    userToken = res.body.data.token;
  });

  await t.test('3. Input Validation: Invalid email and short password are rejected with 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'A',
        email: 'invalid-email',
        password: '123'
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  await t.test('4. Authentication: Admin login returns admin credentials and token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@urbannest.com',
        password: 'admin_password_or_demo'
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.role, 'admin');
    assert.ok(res.body.data.token);
    adminToken = res.body.data.token;
  });

  await t.test('5. Authentication: Invalid email credentials rejected with 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@urbannest.com',
        password: 'wrongpassword'
      });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  await t.test('6. Public Listings: Browse properties with filters returns listings and count', async () => {
    const res = await request(app).get('/api/properties');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length > 0);
  });

  await t.test('7. Featured Listings: Endpoint returns highlighted properties', async () => {
    const res = await request(app).get('/api/properties/featured');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
  });

  await t.test('8. Single Property Lookup: Valid property ID returns property details', async () => {
    const listRes = await request(app).get('/api/properties');
    const propertyId = listRes.body.data[0]._id;
    const res = await request(app).get(`/api/properties/${propertyId}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data._id, propertyId);
  });

  await t.test('9. Lead Inquiry: Valid inquiry submission creates inquiry lead', async () => {
    const listRes = await request(app).get('/api/properties');
    const propertyId = listRes.body.data[0]._id;
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        property: propertyId,
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        phone: '+1 (555) 234-5678',
        message: 'I am interested in scheduling a tour of this property this weekend.'
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data._id);
  });

  await t.test('10. Lead Inquiry: Missing required fields rejected with 400', async () => {
    const res = await request(app)
      .post('/api/inquiries')
      .send({
        name: 'Incomplete Lead'
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  await t.test('11. Security: Admin inquiry endpoint rejects unauthenticated access (401)', async () => {
    const res = await request(app).get('/api/inquiries');
    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  await t.test('12. Security: Admin inquiry endpoint rejects regular user token (403)', async () => {
    const res = await request(app)
      .get('/api/inquiries')
      .set('Authorization', `Bearer ${userToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
  });

  await t.test('13. Admin Inquiries: Authorized admin can view inquiry leads', async () => {
    const res = await request(app)
      .get('/api/inquiries')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
  });

  await t.test('14. Admin Stats: Authorized admin can view portfolio dashboard metrics', async () => {
    const res = await request(app)
      .get('/api/properties/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(typeof res.body.data.totalProperties === 'number');
  });
});
