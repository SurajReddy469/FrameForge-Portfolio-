const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const FitnessClass = require('../models/FitnessClass');
const User = require('../models/User');
const {
  validateBookingRules,
  generateBookingCode,
  generateQRHash
} = require('../utils/capacityEngine');
const { sampleBookings, sampleClasses } = require('../utils/seeder');
const { inMemoryClasses } = require('./classController');

const inMemoryBookings = sampleBookings.map((b, idx) => ({
  ...b,
  _id: 'bk-' + (idx + 1),
  createdAt: new Date(Date.now() - idx * 86400000).toISOString()
}));

exports.bookClass = async (req, res) => {
  try {
    const { classId } = req.body;
    const user = req.user;

    // 1. Fetch Class
    let targetClass = null;
    let existingBookings = [];

    if (mongoose.connection.readyState === 1) {
      targetClass = await FitnessClass.findById(classId);
      existingBookings = await Booking.find({ userId: user._id });
    } else {
      targetClass = inMemoryClasses.find(c => c._id === classId || c.id === classId);
      existingBookings = inMemoryBookings.filter(b => b.userId === (user._id || user.id));
    }

    if (!targetClass) {
      return res.status(404).json({ success: false, message: 'Class session not found' });
    }

    // 2. Validate Membership & Capacity Rules
    const ruleCheck = validateBookingRules({
      user,
      targetClass,
      existingBookings
    });

    if (!ruleCheck.allowed) {
      return res.status(ruleCheck.status || 400).json({
        success: false,
        message: ruleCheck.message
      });
    }

    // 3. Generate Codes
    const bookingCode = generateBookingCode();
    const qrHash = generateQRHash(bookingCode, user._id || user.id);

    const bookingPayload = {
      bookingCode,
      userId: user._id || user.id,
      userName: user.name,
      userEmail: user.email,
      classId: targetClass._id || targetClass.id,
      className: targetClass.title,
      instructorName: targetClass.instructorName,
      scheduleDay: targetClass.scheduleDay,
      scheduleTime: targetClass.scheduleTime,
      room: targetClass.room || 'Studio A',
      status: 'Confirmed',
      qrHash,
      createdAt: new Date().toISOString()
    };

    // 4. Atomic Updates (DB or In-Memory)
    if (mongoose.connection.readyState === 1) {
      const booking = await Booking.create(bookingPayload);

      // Increment booked capacity
      await FitnessClass.findByIdAndUpdate(classId, { $inc: { capacityBooked: 1 } });

      // Deduct class credit if not Elite
      if (user.membershipTier !== 'Elite' && user.classCredits > 0) {
        await User.findByIdAndUpdate(user._id, { $inc: { classCredits: -1 } });
      }

      return res.status(201).json({
        success: true,
        message: `Reservation confirmed for ${targetClass.title} on ${targetClass.scheduleDay} at ${targetClass.scheduleTime}!`,
        data: booking
      });
    }

    // In-memory update
    const mockBooking = { ...bookingPayload, _id: 'bk_' + Date.now() };
    inMemoryBookings.unshift(mockBooking);

    targetClass.capacityBooked = (targetClass.capacityBooked || 0) + 1;
    if (user.membershipTier !== 'Elite' && user.classCredits > 0) {
      user.classCredits -= 1;
    }

    res.status(201).json({
      success: true,
      message: `Reservation confirmed for ${targetClass.title} on ${targetClass.scheduleDay} at ${targetClass.scheduleTime}!`,
      data: mockBooking
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    if (mongoose.connection.readyState === 1) {
      const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, data: bookings });
    }

    const bookings = inMemoryBookings.filter(b => b.userId === userId || b.userEmail === req.user.email);
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    let booking = null;

    if (mongoose.connection.readyState === 1) {
      booking = await Booking.findById(id);
      if (!booking) return res.status(404).json({ success: false, message: 'Reservation not found' });

      if (booking.userId !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
      }

      booking.status = 'Cancelled';
      await booking.save();

      // Decrement class capacity
      await FitnessClass.findByIdAndUpdate(booking.classId, { $inc: { capacityBooked: -1 } });

      // Refund credit
      if (req.user.membershipTier !== 'Elite') {
        await User.findByIdAndUpdate(booking.userId, { $inc: { classCredits: 1 } });
      }

      return res.json({ success: true, message: 'Reservation cancelled and credit returned.', data: booking });
    }

    booking = inMemoryBookings.find(b => b._id === id || b.bookingCode === id);
    if (!booking) return res.status(404).json({ success: false, message: 'Reservation not found' });

    booking.status = 'Cancelled';

    const targetClass = inMemoryClasses.find(c => c._id === booking.classId || c.title === booking.className);
    if (targetClass && targetClass.capacityBooked > 0) {
      targetClass.capacityBooked -= 1;
    }

    if (req.user.membershipTier !== 'Elite') {
      req.user.classCredits = (req.user.classCredits || 0) + 1;
    }

    res.json({ success: true, message: 'Reservation cancelled and credit returned.', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkInBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const booking = await Booking.findByIdAndUpdate(id, { status: 'Attended' }, { new: true });
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
      return res.json({ success: true, message: 'Attendance verified! Member checked in.', data: booking });
    }

    const booking = inMemoryBookings.find(b => b._id === id || b.bookingCode === id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    booking.status = 'Attended';

    res.json({ success: true, message: 'Attendance verified! Member checked in.', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const { status, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { bookingCode: { $regex: search, $options: 'i' } },
          { userName: { $regex: search, $options: 'i' } },
          { userEmail: { $regex: search, $options: 'i' } },
          { className: { $regex: search, $options: 'i' } }
        ];
      }

      const bookings = await Booking.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, data: bookings });
    }

    let filtered = [...inMemoryBookings];
    if (status && status !== 'All') filtered = filtered.filter(b => b.status === status);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(b =>
        b.bookingCode.toLowerCase().includes(q) ||
        b.userName.toLowerCase().includes(q) ||
        b.userEmail.toLowerCase().includes(q) ||
        b.className.toLowerCase().includes(q)
      );
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalBookings = inMemoryBookings.length;
    const confirmedCount = inMemoryBookings.filter(b => b.status === 'Confirmed').length;
    const attendedCount = inMemoryBookings.filter(b => b.status === 'Attended').length;

    const totalCapacityMax = inMemoryClasses.reduce((acc, c) => acc + (c.capacityMax || 20), 0);
    const totalCapacityBooked = inMemoryClasses.reduce((acc, c) => acc + (c.capacityBooked || 0), 0);
    const utilizationRate = Math.round((totalCapacityBooked / (totalCapacityMax || 1)) * 100);

    res.json({
      success: true,
      data: {
        totalBookings,
        confirmedCount,
        attendedCount,
        utilizationRate,
        activeMembersCount: 248,
        monthlyRevenueUSD: 19840
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.exportBookingsCSV = async (req, res) => {
  try {
    let bookings = [];
    if (mongoose.connection.readyState === 1) {
      bookings = await Booking.find().sort({ createdAt: -1 });
    } else {
      bookings = inMemoryBookings;
    }

    const headers = ['Booking Code', 'Member Name', 'Member Email', 'Class Title', 'Instructor', 'Day', 'Time', 'Room', 'Status', 'QR Hash', 'Date'];
    const rows = bookings.map(b => [
      `"${(b.bookingCode || '').replace(/"/g, '""')}"`,
      `"${(b.userName || '').replace(/"/g, '""')}"`,
      `"${(b.userEmail || '').replace(/"/g, '""')}"`,
      `"${(b.className || '').replace(/"/g, '""')}"`,
      `"${(b.instructorName || '').replace(/"/g, '""')}"`,
      `"${(b.scheduleDay || '').replace(/"/g, '""')}"`,
      `"${(b.scheduleTime || '').replace(/"/g, '""')}"`,
      `"${(b.room || '').replace(/"/g, '""')}"`,
      `"${(b.status || '').replace(/"/g, '""')}"`,
      `"${(b.qrHash || '').replace(/"/g, '""')}"`,
      `"${(b.createdAt ? new Date(b.createdAt).toISOString() : '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=fitpulse_bookings_${Date.now()}.csv`);
    return res.status(200).send(csvContent);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.inMemoryBookings = inMemoryBookings;
