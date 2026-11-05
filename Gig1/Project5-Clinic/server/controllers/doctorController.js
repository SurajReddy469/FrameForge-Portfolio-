const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { inMemoryDoctors, inMemoryAppointments } = require('../utils/seeder');
const { getDbStatus } = require('../config/db');

const getDoctors = async (req, res) => {
  try {
    const { department, search } = req.query;

    if (getDbStatus()) {
      let query = { isActive: true };
      if (department) {
        query.departmentCode = department.toUpperCase();
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { specialization: { $regex: search, $options: 'i' } },
        ];
      }

      const doctors = await Doctor.find(query).sort({ rating: -1 });
      return res.status(200).json({
        success: true,
        count: doctors.length,
        data: doctors,
      });
    }

    // In-memory fallback
    let filtered = inMemoryDoctors.filter((d) => d.isActive);
    if (department) {
      filtered = filtered.filter((d) => d.departmentCode === department.toUpperCase());
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (d) => d.name.toLowerCase().includes(s) || d.specialization.toLowerCase().includes(s)
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve doctors directory.',
    });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    let doctor;

    if (getDbStatus()) {
      doctor = await Doctor.findById(id);
    } else {
      doctor = inMemoryDoctors.find((d) => String(d._id) === String(id));
    }

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching doctor details.',
    });
  }
};

/**
 * Returns available time slots for a doctor on a specific date (YYYY-MM-DD)
 */
const getDoctorAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter date (YYYY-MM-DD) is required.',
      });
    }

    let doctor;
    let bookedSlots = [];

    if (getDbStatus()) {
      doctor = await Doctor.findById(id);
      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor not found.' });
      }

      const activeAppointments = await Appointment.find({
        doctorId: id,
        date,
        status: { $in: ['Confirmed', 'Checked-In'] },
      }).select('timeSlot');

      bookedSlots = activeAppointments.map((a) => a.timeSlot);
    } else {
      doctor = inMemoryDoctors.find((d) => String(d._id) === String(id));
      if (!doctor) {
        return res.status(404).json({ success: false, message: 'Doctor not found.' });
      }

      bookedSlots = inMemoryAppointments
        .filter(
          (a) =>
            String(a.doctorId) === String(id) &&
            a.date === date &&
            ['Confirmed', 'Checked-In'].includes(a.status)
        )
        .map((a) => a.timeSlot);
    }

    const allSlots = doctor.availableSlots || [];
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    return res.status(200).json({
      success: true,
      data: {
        doctorId: doctor._id,
        doctorName: doctor.name,
        date,
        totalSlots: allSlots.length,
        bookedSlots,
        availableSlots,
        isFullyBooked: availableSlots.length === 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate doctor slot availability.',
    });
  }
};

module.exports = { getDoctors, getDoctorById, getDoctorAvailability };
