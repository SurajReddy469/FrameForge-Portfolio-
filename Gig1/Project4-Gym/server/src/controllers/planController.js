const mongoose = require('mongoose');
const Plan = require('../models/Plan');
const { samplePlans } = require('../utils/seeder');

const inMemoryPlans = samplePlans.map((p, idx) => ({
  ...p,
  _id: 'pln-' + (idx + 1)
}));

exports.getPlans = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const plans = await Plan.find().sort({ priceMonthlyUSD: 1 });
      return res.json({ success: true, count: plans.length, data: plans });
    }
    res.json({ success: true, count: inMemoryPlans.length, data: inMemoryPlans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.inMemoryPlans = inMemoryPlans;
