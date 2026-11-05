const mongoose = require('mongoose');

const reservationSlotSchema = new mongoose.Schema({
  slotKey: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true, min: 1 },
  bookedGuests: { type: Number, required: true, min: 0, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ReservationSlot', reservationSlotSchema);
