const { describe, it } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_medicare_jwt_secret_key';

const app = require('../app');

describe('MediCare Plus Healthcare API Test Suite', () => {
  let patientToken = '';
  let adminToken = '';
  let createdAppointmentCode = '';

  it('1. GET /api/health should return 200 and service status', async () => {
    const res = await request(app).get('/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'ok');
    assert.strictEqual(res.body.service, 'MediCare Plus Clinical API');
  });

  it('2. GET /api/departments should return list of medical departments', async () => {
    const res = await request(app).get('/api/departments');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 6);
  });

  it('3. GET /api/doctors should return doctors directory with specialties', async () => {
    const res = await request(app).get('/api/doctors');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.data.length >= 6);
    assert.ok(res.body.data[0].consultationFee > 0);
  });

  it('4. POST /api/auth/register should create a new patient account with role patient', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Jane Doe Test',
        email: `janedoe_${Date.now()}@testclinic.com`,
        password: 'Password123!',
        phone: '+1 (555) 789-0123',
        bloodGroup: 'O+',
      });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.user.role, 'patient');
    assert.ok(res.body.token);
  });

  it('5. POST /api/auth/register should block client-side privilege escalation to admin', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Hacker Admin',
        email: `hacker_${Date.now()}@testclinic.com`,
        password: 'Password123!',
        role: 'admin',
      });

    assert.strictEqual(res.status, 403);
    assert.strictEqual(res.body.success, false);
    assert.ok(res.body.message.includes('Privilege escalation blocked'));
  });

  it('6. POST /api/auth/login with valid patient credentials should return JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'patient@medicare.clinic',
        password: 'Password123!',
      });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.token);
    patientToken = res.body.token;
  });

  it('7. POST /api/auth/login with invalid password should return 401 Unauthorized', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'patient@medicare.clinic',
        password: 'WrongPassword!',
      });

    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.body.success, false);
  });

  it('8. POST /api/auth/login as admin should return token with admin role', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@medicare.clinic',
        password: 'Password123!',
      });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.user.role, 'admin');
    assert.ok(res.body.token);
    adminToken = res.body.token;
  });

  it('9. POST /api/appointments should schedule and confirm appointment with code CARE-APPT-', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        doctorId: 'doc_julian_04',
        date: '2026-11-20',
        timeSlot: '02:00 PM',
        patientName: 'Jane Test Patient',
        patientEmail: 'jane.test@example.com',
        patientPhone: '+1 (555) 321-4567',
        patientAge: 38,
        patientGender: 'Female',
        symptoms: 'Recurring tension headaches and sensory visual aura.',
        medicalHistory: 'None',
      });

    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.data.appointmentCode.startsWith('CARE-APPT-'));
    assert.strictEqual(res.body.data.status, 'Confirmed');
    createdAppointmentCode = res.body.data.appointmentCode;
  });

  it('10. Atomic conflict prevention: Scheduling duplicate slot for same doctor should return 409 Conflict', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({
        doctorId: 'doc_julian_04',
        date: '2026-11-20',
        timeSlot: '02:00 PM', // Same slot as previous test!
        patientName: 'Another Patient',
        patientEmail: 'another@example.com',
        patientPhone: '+1 (555) 888-9999',
        patientAge: 45,
        patientGender: 'Male',
        symptoms: 'Headache checkup.',
      });

    assert.strictEqual(res.status, 409);
    assert.strictEqual(res.body.success, false);
    assert.ok(res.body.message.includes('Slot conflict'));
  });

  it('11. GET /api/appointments/code/:code should retrieve appointment details for digital slip', async () => {
    const res = await request(app).get(`/api/appointments/code/${createdAppointmentCode}`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(res.body.data.appointmentCode, createdAppointmentCode);
  });

  it('12. GET /api/appointments without admin authorization should return 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${patientToken}`);

    assert.strictEqual(res.status, 403);
  });

  it('13. GET /api/appointments/export/csv with admin token should return RFC 4180 CSV export', async () => {
    const res = await request(app)
      .get('/api/appointments/export/csv')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.strictEqual(res.status, 200);
    assert.ok(res.headers['content-type'].includes('text/csv'));
    assert.ok(res.text.includes('"Appointment Code"'));
    assert.ok(res.text.includes(createdAppointmentCode));
  });
});
