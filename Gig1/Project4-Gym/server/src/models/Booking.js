const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    classId: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true
    },
    instructorName: {
      type: String,
      required: true
    },
    scheduleDay: {
      type: String,
      required: true
    },
    scheduleTime: {
      type: String,
      required: true
    },
    room: {
      type: String,
      default: 'Studio A'
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Attended', 'Cancelled'],
      default: 'Confirmed'
    },
    qrHash: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
