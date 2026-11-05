const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide doctor name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide doctor email'],
    unique: true,
    lowercase: true,
  },
  department: {
    type: String,
    required: true,
  },
  departmentCode: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
    min: 0,
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  reviewsCount: {
    type: Number,
    default: 32,
  },
  workingDays: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  workingHours: {
    start: { type: String, default: '09:00 AM' },
    end: { type: String, default: '05:00 PM' },
  },
  availableSlots: {
    type: [String],
    default: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
  },
  bio: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Doctor', doctorSchema);
