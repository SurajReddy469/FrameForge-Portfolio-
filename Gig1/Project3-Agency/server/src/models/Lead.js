const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    leadCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true
    },
    clientEmail: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      index: true
    },
    companyName: {
      type: String,
      default: ''
    },
    clientPhone: {
      type: String,
      default: ''
    },
    projectType: {
      type: String,
      required: true,
      enum: ['Full-Stack Web', 'SaaS Platform', 'Mobile App', 'Design System', 'Custom Enterprise']
    },
    timeline: {
      type: String,
      enum: ['< 1 Month', '1 - 3 Months', '3 - 6 Months', 'Flexible'],
      default: '1 - 3 Months'
    },
    estimatedBudget: {
      type: String,
      default: '$5,000 - $10,000'
    },
    scopeBreakdown: {
      features: [String],
      platforms: [String],
      calculatedEstimateUSD: Number
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Proposal Sent', 'Won', 'Archived'],
      default: 'New',
      index: true
    }
  },
  {
    timestamps: true
  }
);

leadSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
