const mongoose = require('mongoose');

const fitnessClassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Class title is required'],
      trim: true
    },
    instructorName: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['HIIT', 'Yoga', 'Strength', 'Spin', 'Boxing', 'CrossFit', 'Pilates'],
      required: true
    },
    scheduleDay: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    scheduleTime: {
      type: String,
      required: true // e.g. "07:00 AM", "06:30 PM"
    },
    durationMin: {
      type: Number,
      default: 50
    },
    capacityMax: {
      type: Number,
      default: 20
    },
    capacityBooked: {
      type: Number,
      default: 0
    },
    intensity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Extreme'],
      default: 'High'
    },
    room: {
      type: String,
      default: 'Studio A (Main Turf)'
    },
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    },
    caloriesBurnedEst: {
      type: Number,
      default: 550
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('FitnessClass', fitnessClassSchema);
