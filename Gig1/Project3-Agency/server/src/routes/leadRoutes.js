const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  updateLeadStatus,
  calculateEstimate,
  getStats
} = require('../controllers/leadController');
const { protect, authorize } = require('./authMiddleware');
const { validateLead } = require('../utils/validationMiddleware');
const { leadLimiter } = require('../utils/rateLimiter');

router.post('/estimate', calculateEstimate);
router.get('/stats', protect, authorize('admin'), getStats);

router.route('/')
  .post(leadLimiter, validateLead, createLead)
  .get(protect, authorize('admin'), getLeads);

router.route('/:id')
  .put(protect, authorize('admin'), updateLeadStatus);

module.exports = router;

