const express = require('express');
const router = express.Router();
const {
  bookClass,
  getMyBookings,
  cancelBooking,
  checkInBooking,
  getAllBookings,
  getStats,
  exportBookingsCSV
} = require('../controllers/bookingController');
const { protect, authorize } = require('./authMiddleware');
const { validateBooking } = require('../utils/validationMiddleware');
const { bookingLimiter } = require('../utils/rateLimiter');

router.post('/', protect, bookingLimiter, validateBooking, bookClass);
router.get('/my', protect, getMyBookings);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/checkin', protect, authorize('admin', 'trainer'), checkInBooking);

// Admin & Manager routes
router.get('/all', protect, authorize('admin', 'trainer'), getAllBookings);
router.get('/stats', protect, authorize('admin', 'trainer'), getStats);
router.get('/export/csv', protect, authorize('admin'), exportBookingsCSV);

module.exports = router;
