const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    shortDesc: {
      type: String,
      required: true
    },
    fullDesc: {
      type: String,
      required: true
    },
    iconName: {
      type: String,
      default: 'Code2'
    },
    startingPriceUSD: {
      type: Number,
      required: true
    },
    typicalTurnaroundWeeks: {
      type: Number,
      default: 3
    },
    features: [String],
    deliverables: [String],
    isPopular: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Service', serviceSchema);
