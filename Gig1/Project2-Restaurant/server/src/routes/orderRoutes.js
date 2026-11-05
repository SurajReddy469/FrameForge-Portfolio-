const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByNumber,
  updateOrderStatus,
  getStats
} = require('../controllers/orderController');
const { protect, authorize } = require('./authMiddleware');
const { validateOrder } = require('../utils/validationMiddleware');
const { orderLimiter } = require('../utils/rateLimiter');

router.get('/stats', protect, authorize('admin'), getStats);
router.get('/track/:orderNumber', getOrderByNumber);

router.route('/')
  .post(orderLimiter, validateOrder, createOrder)
  .get(protect, authorize('admin'), getOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, authorize('admin'), updateOrderStatus);

module.exports = router;
