const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
      index: true
    },
    customerPhone: {
      type: String,
      required: [true, 'Contact phone is required']
    },
    orderType: {
      type: String,
      enum: ['Delivery', 'Takeaway'],
      default: 'Delivery'
    },
    deliveryAddress: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      postalCode: { type: String, default: '' },
      landmark: { type: String, default: '' }
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem'
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        specialInstructions: { type: String, default: '' }
      }
    ],
    subtotal: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    tip: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    promoCode: {
      type: String,
      default: ''
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['Credit/Debit Card', 'UPI / Razorpay', 'Cash on Delivery'],
      default: 'Credit/Debit Card'
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Failed'],
      default: 'Pending'
    },
    orderStatus: {
      type: String,
      enum: ['Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Received',
      index: true
    },
    estimatedDeliveryMins: {
      type: Number,
      default: 35
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for optimal queries
orderSchema.index({ createdAt: -1, orderStatus: 1 });
orderSchema.index({ customerEmail: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
