const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-with-at-least-32-characters-for-suite';
const app = require('../src/app');
const { calculateOrderTotals } = require('../src/utils/pricingService');

test('GourmetHaven Complete Production Verification Suite', async (t) => {
  await t.test('1. Health check returns 200 and operational status', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.equal(res.body.service, 'GourmetHaven Fine Dining Restaurant API');
  });

  await t.test('2. Security: Public registration prevents privilege escalation', async () => {
    const randomEmail = `hacker_${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Malicious Attacker',
        email: randomEmail,
        password: 'password123',
        role: 'admin' // Attempting to self-assign admin role!
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    // Verified: Server strictly enforces 'user' role
    assert.equal(res.body.data.role, 'user');
  });

  await t.test('3. Input Validation: Invalid email and short password are rejected', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Bad Input User',
        email: 'not-an-email',
        password: '123'
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /valid email/);
  });

  await t.test('4. Security: Order creation recalculates totals and ignores tampered client prices', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Test Diner',
        customerEmail: 'diner@test.com',
        customerPhone: '+91 99999 88888',
        orderType: 'Delivery',
        deliveryAddress: {
          street: '402 Skyline Boulevard',
          city: 'Hyderabad',
          postalCode: '500033'
        },
        items: [
          {
            title: 'Truffle Infused Wild Mushroom Risotto',
            price: 1, // Malicious client claims price is ₹1 instead of official ₹890!
            quantity: 2
          }
        ],
        subtotal: 2, // Tampered subtotal
        totalAmount: 5 // Tampered grand total
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    // Server must have looked up catalog price (890 * 2 = 1780)
    assert.equal(res.body.data.subtotal, 1780);
    // 5% GST tax on 1780 = 89
    assert.equal(res.body.data.tax, 89);
    // Free delivery on orders >= 999
    assert.equal(res.body.data.deliveryFee, 0);
    // Authoritative total = 1780 + 89 = 1869 (NOT ₹5!)
    assert.equal(res.body.data.totalAmount, 1869);
    // Verified sandbox payment status
    assert.equal(res.body.data.paymentStatus, 'Pending');
  });

  await t.test('4a. Pricing uses the current trusted menu price map for database menu items', async () => {
    const totals = calculateOrderTotals({
      items: [{ menuItem: 'menu-id-1', title: 'Admin Updated Dish', price: 1, quantity: 2 }],
      orderType: 'Takeaway',
      menuPriceMap: { 'menu-id-1': 725, 'Admin Updated Dish': 725 }
    });
    assert.equal(totals.subtotal, 1450);
    assert.equal(totals.totalAmount, 1523);
  });

  await t.test('5. Order Idempotency: Retried request returns cached order without double-creation', async () => {
    const testKey = 'idemp_test_' + Date.now();
    const payload = {
      idempotencyKey: testKey,
      customerName: 'Idempotency Tester',
      customerEmail: 'idemp@example.com',
      customerPhone: '+91 98888 77777',
      orderType: 'Takeaway',
      items: [
        {
          title: 'Sicilian Pistachio Tiramisu',
          quantity: 1
        }
      ]
    };

    const firstRes = await request(app).post('/api/orders').send(payload);
    assert.equal(firstRes.status, 201);
    const firstOrderNumber = firstRes.body.data.orderNumber;

    // Send identical request with same idempotency key
    const secondRes = await request(app).post('/api/orders').send(payload);
    assert.equal(secondRes.status, 200);
    assert.equal(secondRes.body.isReplay, true);
    assert.equal(secondRes.body.data.orderNumber, firstOrderNumber);
  });

  await t.test('5a. Pricing rejects unknown menu items instead of trusting client prices', async () => {
    const res = await request(app).post('/api/orders').send({
      customerName: 'Test Diner', customerEmail: 'unknown@test.com', customerPhone: '+91 99999 88888',
      orderType: 'Takeaway', items: [{ title: 'Unknown Dish', price: 1, quantity: 1 }]
    });
    assert.equal(res.status, 400);
    assert.match(res.body.message, /not available/i);
  });

  await t.test('5b. Concurrent requests with one idempotency key create one order', async () => {
    const payload = {
      idempotencyKey: 'concurrent_' + Date.now(),
      customerName: 'Concurrent Diner', customerEmail: 'concurrent@example.com',
      customerPhone: '+91 98888 77777', orderType: 'Takeaway',
      items: [{ title: 'Sicilian Pistachio Tiramisu', quantity: 1 }]
    };
    const [first, second] = await Promise.all([
      request(app).post('/api/orders').send(payload),
      request(app).post('/api/orders').send(payload)
    ]);
    assert.equal(first.status, 201);
    assert.equal(second.status, 200);
    assert.equal(second.body.isReplay, true);
    assert.equal(first.body.data.orderNumber, second.body.data.orderNumber);
  });

  await t.test('6. Security: Admin order list rejects unauthenticated callers', async () => {
    const res = await request(app).get('/api/orders');
    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /Not authorized/);
  });

  await t.test('7. Security: Admin order list rejects non-admin users', async () => {
    const randomEmail = `regular_${Date.now()}@example.com`;
    const regRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Regular Customer',
        email: randomEmail,
        password: 'password123'
      });
    const userToken = regRes.body.data.token;

    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${userToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /not authorized to access this route/);
  });

  await t.test('8. State Machine: Illegal order status transition is blocked', async () => {
    const createRes = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'State Tester',
        customerEmail: 'state@example.com',
        customerPhone: '+91 97777 66666',
        orderType: 'Takeaway',
        items: [{ title: 'Molten Valrhona Dark Chocolate Dome', quantity: 1 }]
      });

    const orderId = createRes.body.data._id;
    assert.ok(orderId);

    const adminAuth = await request(app).post('/api/auth/login').send({ email: 'admin@gourmethaven.com', password: 'admin123' });
    const adminToken = adminAuth.body.data.token;

    // Attempt illegal jump directly from 'Received' to 'Delivered'
    const illegalRes = await request(app)
      .put(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ orderStatus: 'Delivered' });

    assert.equal(illegalRes.status, 400);
    assert.match(illegalRes.body.message, /Illegal state transition/);

    const legalRes = await request(app)
      .put(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ orderStatus: 'Preparing' });
    assert.equal(legalRes.status, 200);
    assert.equal(legalRes.body.data.orderStatus, 'Preparing');
  });

  await t.test('8a. Fixed mock admin token cannot authorize protected routes', async () => {
    const res = await request(app).get('/api/orders').set('Authorization', 'Bearer mock-jwt-admin-token');
    assert.equal(res.status, 401);
  });

  await t.test('9. Reservation Validation: Past dates and invalid shifts are rejected', async () => {
    // Attempt past date
    const pastRes = await request(app)
      .post('/api/reservations')
      .send({
        guestName: 'Time Traveler',
        guestEmail: 'traveler@example.com',
        guestPhone: '+91 98888 11111',
        guestsCount: 2,
        reservationDate: '2020-01-01', // Past date!
        reservationTime: '20:00'
      });

    assert.equal(pastRes.status, 400);
    assert.match(pastRes.body.message, /cannot be in the past/);

    // Attempt invalid time slot
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const invalidTimeRes = await request(app)
      .post('/api/reservations')
      .send({
        guestName: 'Late Diner',
        guestEmail: 'diner@example.com',
        guestPhone: '+91 98888 11111',
        guestsCount: 2,
        reservationDate: tomorrow,
        reservationTime: '03:30' // 3:30 AM is invalid
      });

    assert.equal(invalidTimeRes.status, 400);
    assert.match(invalidTimeRes.body.message, /Invalid time slot/);
  });

  await t.test('9a. Reservation capacity allows multiple parties but prevents overbooking', async () => {
    const reservation = {
      guestName: 'First Guest', guestEmail: 'first@example.com', guestPhone: '+91 98888 11111',
      guestsCount: 20, reservationDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      reservationTime: '20:00', seatingZone: 'Main Dining Hall'
    };
    const [first, second] = await Promise.all([
      request(app).post('/api/reservations').send(reservation),
      request(app).post('/api/reservations').send({ ...reservation, guestName: 'Second Guest', guestEmail: 'second@example.com' })
    ]);
    assert.equal(first.status, 201);
    assert.equal(second.status, 201);
    const overflow = await request(app).post('/api/reservations').send({ ...reservation, guestName: 'Overflow Guest', guestEmail: 'overflow@example.com', guestsCount: 1 });
    assert.equal(overflow.status, 409);
  });

  await t.test('9b. Reservation party size respects seating-zone capacity', async () => {
    const res = await request(app).post('/api/reservations').send({
      guestName: 'Large Group', guestEmail: 'large@example.com', guestPhone: '+91 98888 11111',
      guestsCount: 9, reservationDate: new Date(Date.now() + 86400000 * 8).toISOString().split('T')[0],
      reservationTime: '20:00', seatingZone: 'Private Chef Table'
    });
    assert.equal(res.status, 400);
    assert.match(res.body.message, /accommodates up to 8/);
  });

  await t.test('10. Public Tracking Endpoint safely looks up by Order Number without exposing PII', async () => {
    const createRes = await request(app)
      .post('/api/orders')
      .send({
        customerName: 'Kavita Menon',
        customerEmail: 'kavita@example.com',
        customerPhone: '+91 95555 44444',
        orderType: 'Takeaway',
        items: [{ title: 'Molten Valrhona Dark Chocolate Dome', quantity: 1 }]
      });

    const orderNumber = createRes.body.data.orderNumber;
    const trackRes = await request(app).get(`/api/orders/track/${orderNumber}`);
    assert.equal(trackRes.status, 200);
    assert.equal(trackRes.body.data.orderNumber, orderNumber);
    assert.equal(trackRes.body.data.orderStatus, 'Received');
    // Verify phone and email are not exposed in public tracker
    assert.equal(trackRes.body.data.customerPhone, undefined);
    assert.equal(trackRes.body.data.customerEmail, undefined);
  });

  await t.test('11. Dashboard collected revenue excludes unpaid orders', async () => {
    const adminLogin = await request(app).post('/api/auth/login').send({ email: 'admin@gourmethaven.com', password: 'admin123' });
    const res = await request(app).get('/api/orders/stats').set('Authorization', `Bearer ${adminLogin.body.data.token}`);
    assert.equal(res.status, 200);
    assert.equal(res.body.data.totalRevenue, 0);
  });
});
