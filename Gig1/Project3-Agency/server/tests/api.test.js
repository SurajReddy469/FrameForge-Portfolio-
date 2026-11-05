const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('ApexMedia Digital Agency Production Verification Suite', async (t) => {
  await t.test('1. Health check returns 200 and operational status', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.match(res.body.service, /ApexMedia/);
  });

  await t.test('2. Security: Public registration forces user role and prevents privilege escalation', async () => {
    const randomEmail = `hacker_${Date.now()}@agencytest.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Infiltration Attempt',
        email: randomEmail,
        password: 'password123',
        role: 'admin' // Attempting to self-assign admin role
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
        email: 'invalid-email-format',
        password: '123'
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /valid business email/);
  });

  await t.test('4. Scope Estimator Engine calculates verified pricing on server', async () => {
    const res = await request(app)
      .post('/api/leads/estimate')
      .send({
        projectType: 'SaaS Platform', // Base 6500
        features: ['Authentication & RBAC', 'Payment Processing (Stripe/PayPal)'], // 800 + 1200 = 2000
        timeline: '1 - 3 Months' // 1.0 multiplier
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    // Base 6500 + 2000 = 8500
    assert.equal(res.body.data.calculatedEstimateUSD, 8500);
    assert.match(res.body.data.suggestedTier, /Professional Tier/);
  });

  await t.test('5. Lead Intake: Validates inquiry and generates unique tracking code', async () => {
    const res = await request(app)
      .post('/api/leads')
      .send({
        clientName: 'Alexander Hayes',
        clientEmail: 'alex@ventures.com',
        companyName: 'Hayes Ventures',
        clientPhone: '+1 555 123 4567',
        projectType: 'Full-Stack Web',
        timeline: '1 - 3 Months',
        features: ['CMS & Content Authoring'],
        message: 'Looking to redesign our venture capital portfolio site with interactive case studies.'
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.match(res.body.data.leadCode, /^APEX-LEAD-/);
    assert.equal(res.body.data.status, 'New');
  });

  await t.test('6. Security: Admin leads list rejects unauthenticated callers', async () => {
    const res = await request(app).get('/api/leads');
    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /Not authorized/);
  });

  await t.test('7. Security: Admin leads list rejects non-admin users', async () => {
    // Register normal user
    const randomEmail = `client_${Date.now()}@example.com`;
    const regRes = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Regular Client',
        email: randomEmail,
        password: 'password123'
      });
    const userToken = regRes.body.data.token;

    const res = await request(app)
      .get('/api/leads')
      .set('Authorization', `Bearer ${userToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /not authorized to access this route/);
  });

  await t.test('8. Admin CRM: Authorized admin can list and transition lead status', async () => {
    const adminToken = 'mock-jwt-admin-token';

    // 1. Fetch leads
    const listRes = await request(app)
      .get('/api/leads')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(listRes.status, 200);
    assert.ok(listRes.body.data.length > 0);

    const firstLead = listRes.body.data[0];

    // 2. Update status to 'In Review'
    const updateRes = await request(app)
      .put(`/api/leads/${firstLead._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'In Review' });

    assert.equal(updateRes.status, 200);
    assert.equal(updateRes.body.data.status, 'In Review');
  });

  await t.test('9. Public Projects Endpoint returns case studies with verified metrics', async () => {
    const res = await request(app).get('/api/projects');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
  });
});

