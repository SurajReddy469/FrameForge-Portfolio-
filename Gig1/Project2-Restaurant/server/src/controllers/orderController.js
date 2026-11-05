const mongoose = require('mongoose');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { calculateOrderTotals, isValidOrderTransition } = require('../utils/pricingService');

// In-memory collections for resilient operation
const inMemoryOrders = [];
const processedIdempotencyKeys = new Map(); // key -> { order, timestamp }

// Periodically clean up old idempotency records older than 15 minutes
setInterval(() => {
  const cutoff = Date.now() - 15 * 60 * 1000;
  for (const [key, val] of processedIdempotencyKeys.entries()) {
    if (val.timestamp < cutoff) {
      processedIdempotencyKeys.delete(key);
    }
  }
}, 5 * 60 * 1000).unref();

/**
 * Generates collision-resistant unique order number
 */
async function generateUniqueOrderCode() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = 'GH-ORD-' + Math.floor(100000 + Math.random() * 900000);
    if (mongoose.connection.readyState === 1) {
      const exists = await Order.exists({ orderNumber: code });
      if (!exists) return code;
    } else {
      const exists = inMemoryOrders.some(o => o.orderNumber === code);
      if (!exists) return code;
    }
  }
  return 'GH-ORD-' + Date.now().toString().slice(-6);
}

exports.createOrder = async (req, res) => {
  let inMemoryPendingRecord;
  let resolvePendingOrder;
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      orderType,
      deliveryAddress,
      items,
      promoCode,
      tip,
      paymentMethod,
      idempotencyKey
    } = req.body;

    // 1. Idempotency Protection: Prevent duplicate double-clicks
    const clientKey = req.headers['idempotency-key'] || idempotencyKey;
    if (clientKey) {
      const dbOrder = mongoose.connection.readyState === 1
        ? await Order.findOne({ idempotencyKey: clientKey }) : null;
      if (dbOrder || processedIdempotencyKeys.has(clientKey)) {
        const entry = processedIdempotencyKeys.get(clientKey);
        const cachedOrder = dbOrder || (entry.promise ? await entry.promise : entry.order);
        if (!cachedOrder) throw new Error('Previous order attempt failed. Please retry.');
        return res.status(200).json({
          success: true,
          message: 'Order already processed (idempotent replay)',
          data: cachedOrder,
          isReplay: true
        });
      }
      if (mongoose.connection.readyState !== 1) {
        const promise = new Promise(resolve => { resolvePendingOrder = resolve; });
        inMemoryPendingRecord = { promise, order: null, timestamp: Date.now() };
        processedIdempotencyKeys.set(clientKey, inMemoryPendingRecord);
      }
    }

    // 2. Authoritative Server-side Price Lookup & Verification
    let menuPriceMap;
    if (mongoose.connection.readyState === 1) {
      const titles = items.map(item => item.title).filter(Boolean);
      const ids = items.map(item => item.menuItem).filter(mongoose.isValidObjectId);
      const availableItems = await MenuItem.find({
        isAvailable: true,
        $or: [
          ...(titles.length ? [{ title: { $in: titles } }] : []),
          ...(ids.length ? [{ _id: { $in: ids } }] : [])
        ]
      }).select('_id title price');
      menuPriceMap = {};
      availableItems.forEach(menuItem => {
        menuPriceMap[String(menuItem._id)] = menuItem.price;
        menuPriceMap[menuItem.title] = menuItem.price;
      });
    }
    const {
      verifiedItems,
      subtotal,
      tax,
      deliveryFee,
      tip: validatedTip,
      discountAmount,
      promoCode: verifiedPromo,
      totalAmount
    } = calculateOrderTotals({ items, orderType, promoCode, tip, ...(menuPriceMap ? { menuPriceMap } : {}) });

    // 3. Payment Status: Explicitly indicate sandbox simulation
    const paymentStatus = 'Pending';

    // 4. Generate Unique Order Code
    const orderNumber = await generateUniqueOrderCode();

    const orderPayload = {
      orderNumber,
      idempotencyKey: clientKey || undefined,
      user: req.user ? req.user.id : null,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      orderType: orderType === 'Takeaway' ? 'Takeaway' : 'Delivery',
      deliveryAddress: deliveryAddress || {},
      items: verifiedItems,
      subtotal,
      tax,
      deliveryFee,
      tip: validatedTip,
      discountAmount,
      promoCode: verifiedPromo,
      totalAmount,
      paymentMethod: paymentMethod || 'Credit/Debit Card',
      paymentStatus,
      orderStatus: 'Received',
      estimatedDeliveryMins: orderType === 'Takeaway' ? 20 : 35,
      createdAt: new Date().toISOString()
    };

    let createdOrder;
    if (mongoose.connection.readyState === 1) {
      try {
        createdOrder = await Order.create(orderPayload);
      } catch (error) {
        if (error.code === 11000 && clientKey) {
          const existing = await Order.findOne({ idempotencyKey: clientKey });
          if (existing) {
            return res.status(200).json({ success: true, message: 'Order already processed (idempotent replay)', data: existing, isReplay: true });
          }
        }
        throw error;
      }
    } else {
      createdOrder = { ...orderPayload, _id: 'ord_' + Date.now() };
      inMemoryOrders.unshift(createdOrder);
    }

    if (clientKey && inMemoryPendingRecord) {
      inMemoryPendingRecord.order = createdOrder;
      inMemoryPendingRecord.timestamp = Date.now();
      resolvePendingOrder(createdOrder);
      delete inMemoryPendingRecord.promise;
    }

    res.status(201).json({
      success: true,
      message: 'Order verified, calculated, and placed successfully!',
      data: createdOrder,
      isDemoMode: mongoose.connection.readyState !== 1
    });
  } catch (error) {
    if (inMemoryPendingRecord) {
      resolvePendingOrder(null);
      const clientKey = req.headers['idempotency-key'] || req.body?.idempotencyKey;
      if (clientKey) processedIdempotencyKeys.delete(clientKey);
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (status && status !== 'All') query.orderStatus = status;
      if (search) {
        query.$or = [
          { orderNumber: { $regex: search, $options: 'i' } },
          { customerName: { $regex: search, $options: 'i' } },
          { customerPhone: { $regex: search, $options: 'i' } }
        ];
      }
      const totalCount = await Order.countDocuments(query);
      const orders = await Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum);

      return res.json({
        success: true,
        count: orders.length,
        totalCount,
        page: pageNum,
        totalPages: Math.ceil(totalCount / limitNum) || 1,
        data: orders
      });
    }

    // In-memory pagination
    let filtered = [...inMemoryOrders];
    if (status && status !== 'All') {
      filtered = filtered.filter(o => o.orderStatus === status);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(o => o.orderNumber.toLowerCase().includes(s) || o.customerName.toLowerCase().includes(s));
    }
    const totalCount = filtered.length;
    const paginated = filtered.slice(skip, skip + limitNum);

    res.json({
      success: true,
      count: paginated.length,
      totalCount,
      page: pageNum,
      totalPages: Math.ceil(totalCount / limitNum) || 1,
      data: paginated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    let order = null;
    if (mongoose.connection.readyState === 1) {
      order = await Order.findById(req.params.id);
    } else {
      order = inMemoryOrders.find(o => o._id === req.params.id);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Role check: Only admin or owner can view complete order record
    if (req.user.role !== 'admin' && String(order.user) !== String(req.user.id)) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order record' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderByNumber = async (req, res) => {
  try {
    const code = (req.params.orderNumber || '').toUpperCase().trim();
    let order = null;

    if (mongoose.connection.readyState === 1) {
      order = await Order.findOne({ orderNumber: code });
    } else {
      order = inMemoryOrders.find(o => o.orderNumber === code);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order tracking code not found' });
    }

    // Customer-safe tracking response: Return only necessary operational data (no PII or address leakage)
    res.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        orderType: order.orderType,
        items: order.items,
        orderStatus: order.orderStatus,
        estimatedDeliveryMins: order.estimatedDeliveryMins,
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    let order = null;

    if (mongoose.connection.readyState === 1) {
      order = await Order.findById(req.params.id);
    } else {
      order = inMemoryOrders.find(o => o._id === req.params.id);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Validate state transition rule
    if (!isValidOrderTransition(order.orderStatus, orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Illegal state transition: Cannot change order from '${order.orderStatus}' to '${orderStatus}'`
      });
    }

    if (mongoose.connection.readyState === 1) {
      const updated = await Order.findByIdAndUpdate(
        req.params.id,
        { orderStatus },
        { new: true, runValidators: true }
      );
      return res.json({ success: true, data: updated });
    }

    order.orderStatus = orderStatus;
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const totalOrders = await Order.countDocuments();
      const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });
      const pendingOrders = await Order.countDocuments({ orderStatus: { $in: ['Received', 'Preparing', 'Out for Delivery'] } });
      
      const revenueAgg = await Order.aggregate([
        { $match: { paymentStatus: 'Paid', orderStatus: { $ne: 'Cancelled' } } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
      ]);
      const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

      return res.json({
        success: true,
        data: { totalOrders, deliveredOrders, pendingOrders, totalRevenue }
      });
    }

    const totalOrders = inMemoryOrders.length;
    const deliveredOrders = inMemoryOrders.filter(o => o.orderStatus === 'Delivered').length;
    const pendingOrders = inMemoryOrders.filter(o => ['Received', 'Preparing', 'Out for Delivery'].includes(o.orderStatus)).length;
    const totalRevenue = inMemoryOrders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' && o.orderStatus !== 'Cancelled' ? o.totalAmount : 0), 0);

    res.json({
      success: true,
      data: { totalOrders, deliveredOrders, pendingOrders, totalRevenue }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
