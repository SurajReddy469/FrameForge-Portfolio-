const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    reservationCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },
    guestName: {
      type: String,
      required: [true, 'Guest name is required'],
      trim: true
    },
    guestEmail: {
      type: String,
      required: [true, 'Guest email is required'],
      lowercase: true,
      trim: true,
      index: true
    },
    guestPhone: {
      type: String,
      required: [true, 'Contact phone number is required']
    },
    guestsCount: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'Minimum 1 guest'],
      max: [20, 'Maximum 20 guests per reservation']
    },
    reservationDate: {
      type: String, // YYYY-MM-DD
      required: [true, 'Reservation date is required'],
      index: true
    },
    reservationTime: {
      type: String, // HH:MM
      required: [true, 'Reservation time slot is required']
    },
    slotKey: {
      type: String,
      default: undefined
    },
    seatingZone: {
      type: String,
      enum: ['Main Dining Hall', 'Outdoor Terrace Garden', 'Private Chef Table', 'Skyline Rooftop Lounge'],
      default: 'Main Dining Hall'
    },
    occasion: {
      type: String,
      enum: ['Casual Dining', 'Birthday Celebration', 'Anniversary Dinner', 'Business Meeting', 'Romantic Date'],
      default: 'Casual Dining'
    },
    specialRequests: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Seated', 'Completed', 'Cancelled'],
      default: 'Pending',
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for optimal queries
reservationSchema.index({ reservationDate: 1, reservationTime: 1, status: 1 });
reservationSchema.index({ guestEmail: 1, createdAt: -1 });
reservationSchema.index({ slotKey: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
