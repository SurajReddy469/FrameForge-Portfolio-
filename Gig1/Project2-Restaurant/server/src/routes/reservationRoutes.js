const express = require('express');
const router = express.Router();
const {
  createReservation,
  getReservations,
  updateReservationStatus,
  deleteReservation
} = require('../controllers/reservationController');
const { protect, authorize } = require('./authMiddleware');
const { validateReservation } = require('../utils/validationMiddleware');
const { reservationLimiter } = require('../utils/rateLimiter');

router.route('/')
  .post(reservationLimiter, validateReservation, createReservation)
  .get(protect, authorize('admin'), getReservations);

router.route('/:id')
  .put(protect, authorize('admin'), updateReservationStatus)
  .delete(protect, authorize('admin'), deleteReservation);

module.exports = router;
