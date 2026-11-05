const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const ReservationSlot = require('../models/ReservationSlot');
const { ZONE_CAPACITY, isReservationActive } = require('../utils/reservationCapacity');

const inMemoryReservations = [];

/**
 * Collision-resistant unique reservation code generator
 */
async function generateUniqueReservationCode() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = 'GH-RES-' + Math.floor(100000 + Math.random() * 900000);
    if (mongoose.connection.readyState === 1) {
      const exists = await Reservation.exists({ reservationCode: code });
      if (!exists) return code;
    } else {
      const exists = inMemoryReservations.some(r => r.reservationCode === code);
      if (!exists) return code;
    }
  }
  return 'GH-RES-' + Date.now().toString().slice(-6);
}

exports.createReservation = async (req, res) => {
  let reservedSlotKey;
  let reservedGuestCount = 0;
  try {
    const reservationCode = await generateUniqueReservationCode();
    const { reservationDate, reservationTime, seatingZone, guestsCount } = req.body;
    const zone = seatingZone || 'Main Dining Hall';
    const slotKey = `${reservationDate}|${reservationTime}|${zone}`;
    const capacity = ZONE_CAPACITY[zone];

    if (mongoose.connection.readyState === 1) {
      const existingReservations = await Reservation.find({ reservationDate, reservationTime, seatingZone: zone, status: { $nin: ['Cancelled', 'Completed'] } }).select('guestsCount');
      const legacyBookedGuests = existingReservations.reduce((sum, reservation) => sum + reservation.guestsCount, 0);
      try {
        await ReservationSlot.updateOne({ slotKey }, { $setOnInsert: { capacity, bookedGuests: legacyBookedGuests } }, { upsert: true });
      } catch (error) {
        if (error.code !== 11000) throw error;
      }
      await Reservation.updateMany(
        { reservationDate, reservationTime, seatingZone: zone, status: { $nin: ['Cancelled', 'Completed'] }, slotKey: { $exists: false } },
        { $set: { slotKey } }
      );
      const slot = await ReservationSlot.findOneAndUpdate(
        { slotKey, $expr: { $lte: [{ $add: ['$bookedGuests', Number(guestsCount)] }, '$capacity'] } },
        { $inc: { bookedGuests: Number(guestsCount) } },
        { new: true }
      );
      if (!slot) {
        return res.status(409).json({ success: false, message: `No capacity remains in ${zone} for this time slot.` });
      }
    } else {
      const bookedGuests = inMemoryReservations
        .filter(r => r.reservationDate === reservationDate && r.reservationTime === reservationTime && r.seatingZone === zone && isReservationActive(r.status))
        .reduce((sum, reservation) => sum + reservation.guestsCount, 0);
      if (bookedGuests + Number(guestsCount) > capacity) {
        return res.status(409).json({ success: false, message: `No capacity remains in ${zone} for this time slot.` });
      }
    }
    reservedSlotKey = slotKey;
    reservedGuestCount = Number(guestsCount);
    const reservationData = {
      ...req.body,
      reservationCode,
      status: 'Pending',
      slotKey,
      createdAt: new Date().toISOString()
    };

    let createdRes;
    if (mongoose.connection.readyState === 1) {
      try {
        createdRes = await Reservation.create(reservationData);
      } catch (error) {
        throw error;
      }
    } else {
      createdRes = { ...reservationData, _id: 'res_' + Date.now() };
      inMemoryReservations.unshift(createdRes);
    }

    res.status(201).json({
      success: true,
      message: 'Table reserved successfully! A confirmation code has been generated.',
      data: createdRes,
      isDemoMode: mongoose.connection.readyState !== 1
    });
  } catch (error) {
    if (reservedSlotKey && reservedGuestCount && mongoose.connection.readyState === 1) {
      await ReservationSlot.updateOne({ slotKey: reservedSlotKey }, { $inc: { bookedGuests: -reservedGuestCount } }).catch(() => {});
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const { status, date, search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      if (date) query.reservationDate = date;
      if (search) {
        query.$or = [
          { guestName: { $regex: search, $options: 'i' } },
          { reservationCode: { $regex: search, $options: 'i' } },
          { guestPhone: { $regex: search, $options: 'i' } }
        ];
      }

      const totalCount = await Reservation.countDocuments(query);
      const reservations = await Reservation.find(query)
        .sort({ reservationDate: 1, reservationTime: 1 })
        .skip(skip)
        .limit(limitNum);

      return res.json({
        success: true,
        count: reservations.length,
        totalCount,
        page: pageNum,
        totalPages: Math.ceil(totalCount / limitNum) || 1,
        data: reservations
      });
    }

    // In-memory fallback pagination
    let filtered = [...inMemoryReservations];
    if (status && status !== 'All') {
      filtered = filtered.filter(r => r.status === status);
    }
    if (date) {
      filtered = filtered.filter(r => r.reservationDate === date);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(r => r.guestName.toLowerCase().includes(s) || r.reservationCode.toLowerCase().includes(s) || r.guestPhone.includes(s));
    }

    const totalCount = filtered.length;
    const paginated = filtered.slice(skip, skip + limitNum);

    res.json({
      success: true,
      count: paginated.length,
      totalCount,
      page: pageNum,
      totalPages: Math.ceil(totalCount / limitNum) || 1,
      data: paginated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Confirmed', 'Pending', 'Seated', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    if (mongoose.connection.readyState === 1) {
      const current = await Reservation.findById(req.params.id);
      if (!current) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      const terminal = ['Cancelled', 'Completed'];
      if (terminal.includes(current.status) && !terminal.includes(status)) {
        return res.status(400).json({ success: false, message: 'Cancelled or completed reservations cannot be reopened; create a new reservation instead.' });
      }
      const reservation = await Reservation.findOneAndUpdate(
        { _id: req.params.id, status: current.status },
        { status, ...(terminal.includes(status) ? { $unset: { slotKey: 1 } } : {}) },
        { new: true, runValidators: true }
      );
      if (!reservation) {
        return res.status(409).json({ success: false, message: 'Reservation changed during this update. Refresh and retry.' });
      }
      if (!terminal.includes(current.status) && terminal.includes(status) && current.slotKey) {
        await ReservationSlot.updateOne(
          { slotKey: current.slotKey, bookedGuests: { $gte: current.guestsCount } },
          { $inc: { bookedGuests: -current.guestsCount } }
        );
      }
      return res.json({ success: true, data: reservation });
    }

    const reservation = inMemoryReservations.find(r => r._id === req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    if (['Cancelled', 'Completed'].includes(reservation.status) && !['Cancelled', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Cancelled or completed reservations cannot be reopened; create a new reservation instead.' });
    }
    reservation.status = status;
    res.json({ success: true, data: reservation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) {
        return res.status(404).json({ success: false, message: 'Reservation not found' });
      }
      return res.json({ success: true, message: 'Reservation removed' });
    }

    const index = inMemoryReservations.findIndex(r => r._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    inMemoryReservations.splice(index, 1);
    res.json({ success: true, message: 'Reservation removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
