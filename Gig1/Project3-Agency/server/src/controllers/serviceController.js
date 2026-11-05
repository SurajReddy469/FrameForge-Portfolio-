const mongoose = require('mongoose');
const Service = require('../models/Service');
const { sampleServices } = require('../utils/seeder');

const inMemoryServices = sampleServices.map((s, idx) => ({
  ...s,
  _id: 'srv-' + (idx + 1)
}));

exports.getServices = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const services = await Service.find().sort({ startingPriceUSD: 1 });
      return res.json({ success: true, count: services.length, data: services });
    }
    res.json({ success: true, count: inMemoryServices.length, data: inMemoryServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const service = await Service.create(req.body);
      return res.status(201).json({ success: true, data: service });
    }

    const mock = { ...req.body, _id: 'srv_' + Date.now() };
    inMemoryServices.push(mock);
    res.status(201).json({ success: true, data: mock });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
      return res.json({ success: true, data: service });
    }

    const s = inMemoryServices.find(item => item._id === req.params.id);
    if (!s) return res.status(404).json({ success: false, message: 'Service not found' });
    Object.assign(s, req.body);
    res.json({ success: true, data: s });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const service = await Service.findByIdAndDelete(req.params.id);
      if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
      return res.json({ success: true, message: 'Service removed' });
    }

    const index = inMemoryServices.findIndex(item => item._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Service not found' });
    inMemoryServices.splice(index, 1);
    res.json({ success: true, message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.inMemoryServices = inMemoryServices;
