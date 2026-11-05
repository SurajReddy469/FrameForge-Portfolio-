const express = require('express');
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect, authorize } = require('./authMiddleware');

router.route('/')
  .get(getServices)
  .post(protect, authorize('admin'), createService);

router.route('/:id')
  .put(protect, authorize('admin'), updateService)
  .delete(protect, authorize('admin'), deleteService);

module.exports = router;
