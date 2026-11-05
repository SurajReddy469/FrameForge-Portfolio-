const mongoose = require('mongoose');
const Trainer = require('../models/Trainer');
const { sampleTrainers } = require('../utils/seeder');

const inMemoryTrainers = sampleTrainers.map((t, idx) => ({
  ...t,
  _id: 'trn-' + (idx + 1),
  createdAt: new Date().toISOString()
}));

exports.getTrainers = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const trainers = await Trainer.find().sort({ rating: -1 });
      return res.json({ success: true, count: trainers.length, data: trainers });
    }
    res.json({ success: true, count: inMemoryTrainers.length, data: inMemoryTrainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTrainerById = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const trainer = await Trainer.findById(req.params.id);
      if (!trainer) return res.status(404).json({ success: false, message: 'Trainer not found' });
      return res.json({ success: true, data: trainer });
    }

    const t = inMemoryTrainers.find(item => item._id === req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Trainer not found' });
    res.json({ success: true, data: t });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.inMemoryTrainers = inMemoryTrainers;
