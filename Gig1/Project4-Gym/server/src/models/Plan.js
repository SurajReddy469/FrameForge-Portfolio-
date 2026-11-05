const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    tier: {
      type: String,
      enum: ['Basic', 'Pro', 'Elite'],
      required: true
    },
    priceMonthlyUSD: {
      type: Number,
      required: true
    },
    billingInterval: {
      type: String,
      default: 'month'
    },
    classCreditsMonthly: {
      type: Number,
      default: 10 // Basic = 0 (Gym Floor only), Pro = 12, Elite = -1 (Unlimited)
    },
    features: {
      type: [String],
      default: []
    },
    badge: {
      type: String,
      default: ''
    },
    popular: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);
