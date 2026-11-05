const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true,
  },
  patientEmail: {
    type: String,
    required: [true, 'Patient email is required'],
    lowercase: true,
    trim: true,
  },
  patientPhone: {
    type: String,
    required: [true, 'Patient phone is required'],
    trim: true,
  },
  patientAge: {
    type: Number,
    required: [true, 'Patient age is required'],
    min: 0,
    max: 125,
  },
  patientGender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
    index: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  date: {
    type: String, // YYYY-MM-DD
    required: [true, 'Appointment date is required'],
    index: true,
  },
  timeSlot: {
    type: String, // e.g. "10:00 AM"
    required: [true, 'Time slot is required'],
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0,
  },
  symptoms: {
    type: String,
    required: [true, 'Symptoms/chief complaint is required'],
    trim: true,
  },
  medicalHistory: {
    type: String,
    default: '',
    trim: true,
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Checked-In', 'Completed', 'Cancelled'],
    default: 'Confirmed',
    index: true,
  },
  checkedInAt: {
    type: Date,
  },
  cancellationReason: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to ensure uniqueness of doctor + date + timeSlot for active appointments
appointmentSchema.index({ doctorId: 1, date: 1, timeSlot: 1, status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
