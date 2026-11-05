const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  getAppointmentByCode,
  updateAppointmentStatus,
  cancelAppointment,
  exportAppointmentsCSV,
} = require('../controllers/appointmentController');
const { verifyToken, requireRole } = require('../middleware/auth');
const { bookingLimiter } = require('../middleware/rateLimiter');
const { validateAppointment } = require('../middleware/validationMiddleware');

// Optional auth helper for booking
const optionalToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'medicare_super_secret_jwt_key_2026');
      req.user = decoded;
    } catch (e) {
      // Ignore invalid token on optional auth
    }
  }
  next();
};

// Public/patient booking
router.post('/', bookingLimiter, optionalToken, validateAppointment, bookAppointment);

// Patient appointments
router.get('/my', verifyToken, getMyAppointments);

// Public confirmation look up by code
router.get('/code/:code', getAppointmentByCode);

// Admin / staff roster
router.get('/', verifyToken, requireRole(['admin', 'doctor']), getAllAppointments);

// Admin CSV export (must be before :id routes)
router.get('/export/csv', verifyToken, requireRole(['admin']), exportAppointmentsCSV);

// Status update (check-in, complete)
router.patch('/:id/status', verifyToken, requireRole(['admin', 'doctor']), updateAppointmentStatus);

// Cancel appointment
router.post('/:id/cancel', verifyToken, cancelAppointment);

module.exports = router;
