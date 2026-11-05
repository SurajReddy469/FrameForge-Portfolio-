const mongoose = require('mongoose');
const FitnessClass = require('../models/FitnessClass');
const { sampleClasses } = require('../utils/seeder');

const inMemoryClasses = sampleClasses.map((c, idx) => ({
  ...c,
  _id: 'cls-' + (idx + 1),
  createdAt: new Date().toISOString()
}));

exports.getClasses = async (req, res) => {
  try {
    const { category, day, intensity, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (day && day !== 'All') query.scheduleDay = day;
      if (intensity && intensity !== 'All') query.intensity = intensity;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { instructorName: { $regex: search, $options: 'i' } },
          { room: { $regex: search, $options: 'i' } }
        ];
      }

      const classes = await FitnessClass.find(query).sort({ scheduleDay: 1, scheduleTime: 1 });
      return res.json({ success: true, count: classes.length, data: classes });
    }

    // In-memory fallback
    let filtered = [...inMemoryClasses];
    if (category && category !== 'All') filtered = filtered.filter(c => c.category === category);
    if (day && day !== 'All') filtered = filtered.filter(c => c.scheduleDay === day);
    if (intensity && intensity !== 'All') filtered = filtered.filter(c => c.intensity === intensity);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q) ||
        c.room.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const c = await FitnessClass.findById(req.params.id);
      if (!c) return res.status(404).json({ success: false, message: 'Class session not found' });
      return res.json({ success: true, data: c });
    }

    const c = inMemoryClasses.find(item => item._id === req.params.id);
    if (!c) return res.status(404).json({ success: false, message: 'Class session not found' });
    res.json({ success: true, data: c });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newClass = await FitnessClass.create(req.body);
      return res.status(201).json({ success: true, message: 'Class scheduled successfully', data: newClass });
    }

    const mockClass = {
      ...req.body,
      _id: 'cls_' + Date.now(),
      capacityBooked: 0,
      createdAt: new Date().toISOString()
    };
    inMemoryClasses.push(mockClass);

    res.status(201).json({ success: true, message: 'Class scheduled successfully', data: mockClass });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await FitnessClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Class not found' });
      return res.json({ success: true, data: updated });
    }

    const c = inMemoryClasses.find(item => item._id === req.params.id);
    if (!c) return res.status(404).json({ success: false, message: 'Class not found' });
    Object.assign(c, req.body);
    res.json({ success: true, data: c });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const deleted = await FitnessClass.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Class not found' });
      return res.json({ success: true, message: 'Class deleted' });
    }

    const index = inMemoryClasses.findIndex(item => item._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Class not found' });
    inMemoryClasses.splice(index, 1);
    res.json({ success: true, message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.inMemoryClasses = inMemoryClasses;
