const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide department name'],
    unique: true,
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Please provide department code'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'Stethoscope',
  },
  headOfDepartment: {
    type: String,
    default: 'Staff Chief',
  },
  roomNumber: {
    type: String,
    default: 'Wing A',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Department', departmentSchema);
