const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const {
  generateAppointmentCode,
  isSlotAvailable,
  exportAppointmentsToCSV,
} = require('../utils/appointmentEngine');
const { inMemoryAppointments, inMemoryDoctors } = require('../utils/seeder');
const { getDbStatus } = require('../config/db');

const bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      date,
      timeSlot,
      patientName,
      patientEmail,
      patientPhone,
      patientAge,
      patientGender,
      symptoms,
      medicalHistory,
    } = req.body;

    const patientId = req.user ? req.user.id : `usr_guest_${Date.now()}`;

    // Verify doctor
    let doctor;
    if (getDbStatus()) {
      doctor = await Doctor.findById(doctorId);
    } else {
      doctor = inMemoryDoctors.find((d) => String(d._id) === String(doctorId));
    }

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'The requested doctor does not exist.',
      });
    }

    // Atomic conflict verification
    if (getDbStatus()) {
      const existing = await Appointment.findOne({
        doctorId,
        date,
        timeSlot,
        status: { $in: ['Confirmed', 'Checked-In'] },
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Slot conflict: ${doctor.name} is already booked at ${timeSlot} on ${date}. Please choose another time.`,
        });
      }

      // Generate unique collision-resistant code
      let appointmentCode = generateAppointmentCode();
      let codeExists = await Appointment.findOne({ appointmentCode });
      while (codeExists) {
        appointmentCode = generateAppointmentCode();
        codeExists = await Appointment.findOne({ appointmentCode });
      }

      const appointment = await Appointment.create({
        appointmentCode,
        patientId,
        patientName: patientName.trim(),
        patientEmail: patientEmail.toLowerCase().trim(),
        patientPhone: patientPhone.trim(),
        patientAge: Number(patientAge),
        patientGender,
        doctorId: doctor._id,
        doctorName: doctor.name,
        department: doctor.department,
        date,
        timeSlot,
        consultationFee: doctor.consultationFee,
        symptoms: symptoms.trim(),
        medicalHistory: (medicalHistory || '').trim(),
        status: 'Confirmed',
      });

      return res.status(201).json({
        success: true,
        message: 'Appointment scheduled and confirmed successfully.',
        data: appointment,
      });
    }

    // In-memory fallback
    const slotAvailable = isSlotAvailable(inMemoryAppointments, doctorId, date, timeSlot);
    if (!slotAvailable) {
      return res.status(409).json({
        success: false,
        message: `Slot conflict: ${doctor.name} is already booked at ${timeSlot} on ${date}. Please choose another time.`,
      });
    }

    let appointmentCode = generateAppointmentCode();
    while (inMemoryAppointments.some((a) => a.appointmentCode === appointmentCode)) {
      appointmentCode = generateAppointmentCode();
    }

    const newAppointment = {
      _id: `appt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      appointmentCode,
      patientId,
      patientName: patientName.trim(),
      patientEmail: patientEmail.toLowerCase().trim(),
      patientPhone: patientPhone.trim(),
      patientAge: Number(patientAge),
      patientGender,
      doctorId: doctor._id,
      doctorName: doctor.name,
      department: doctor.department,
      date,
      timeSlot,
      consultationFee: doctor.consultationFee,
      symptoms: symptoms.trim(),
      medicalHistory: (medicalHistory || '').trim(),
      status: 'Confirmed',
      createdAt: new Date(),
    };

    inMemoryAppointments.unshift(newAppointment);

    return res.status(201).json({
      success: true,
      message: 'Appointment scheduled and confirmed successfully.',
      data: newAppointment,
    });
  } catch (error) {
    console.error('Book appointment error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error scheduling appointment.',
    });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const userEmail = req.user.email;

    let appointments = [];

    if (getDbStatus()) {
      if (userRole === 'doctor') {
        appointments = await Appointment.find({ patientEmail: userEmail }).sort({ date: -1 });
      } else {
        appointments = await Appointment.find({
          $or: [{ patientId: userId }, { patientEmail: userEmail }],
        }).sort({ date: -1 });
      }
    } else {
      appointments = inMemoryAppointments.filter(
        (a) => a.patientId === userId || a.patientEmail.toLowerCase() === userEmail.toLowerCase()
      );
    }

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch your appointments.',
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const { status, search, date } = req.query;

    if (getDbStatus()) {
      let query = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      if (date) {
        query.date = date;
      }
      if (search) {
        query.$or = [
          { appointmentCode: { $regex: search, $options: 'i' } },
          { patientName: { $regex: search, $options: 'i' } },
          { doctorName: { $regex: search, $options: 'i' } },
          { patientPhone: { $regex: search, $options: 'i' } },
        ];
      }

      const appointments = await Appointment.find(query).sort({ date: 1, timeSlot: 1 });
      return res.status(200).json({
        success: true,
        count: appointments.length,
        data: appointments,
      });
    }

    // In-memory fallback
    let results = [...inMemoryAppointments];
    if (status && status !== 'All') {
      results = results.filter((a) => a.status === status);
    }
    if (date) {
      results = results.filter((a) => a.date === date);
    }
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(
        (a) =>
          a.appointmentCode.toLowerCase().includes(s) ||
          a.patientName.toLowerCase().includes(s) ||
          a.doctorName.toLowerCase().includes(s) ||
          a.patientPhone.toLowerCase().includes(s)
      );
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve clinic appointment roster.',
    });
  }
};

const getAppointmentByCode = async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    let appointment;

    if (getDbStatus()) {
      appointment = await Appointment.findOne({ appointmentCode: code });
    } else {
      appointment = inMemoryAppointments.find((a) => a.appointmentCode === code);
    }

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Appointment with confirmation code ${code} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error looking up appointment confirmation.',
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, cancellationReason } = req.body;

    const allowedStatuses = ['Confirmed', 'Checked-In', 'Completed', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${allowedStatuses.join(', ')}`,
      });
    }

    if (getDbStatus()) {
      const appt = await Appointment.findById(id);
      if (!appt) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
      }

      appt.status = status;
      if (status === 'Checked-In') {
        appt.checkedInAt = new Date();
      }
      if (status === 'Cancelled' && cancellationReason) {
        appt.cancellationReason = cancellationReason;
      }

      await appt.save();

      return res.status(200).json({
        success: true,
        message: `Appointment status updated to ${status}.`,
        data: appt,
      });
    }

    // In-memory fallback
    const memAppt = inMemoryAppointments.find((a) => String(a._id) === String(id));
    if (!memAppt) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    memAppt.status = status;
    if (status === 'Checked-In') {
      memAppt.checkedInAt = new Date();
    }
    if (status === 'Cancelled' && cancellationReason) {
      memAppt.cancellationReason = cancellationReason;
    }

    return res.status(200).json({
      success: true,
      message: `Appointment status updated to ${status}.`,
      data: memAppt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update appointment status.',
    });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const user = req.user;

    let appt;
    if (getDbStatus()) {
      appt = await Appointment.findById(id);
    } else {
      appt = inMemoryAppointments.find((a) => String(a._id) === String(id));
    }

    if (!appt) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    // Check authorization: admin can cancel any; patient can only cancel their own
    if (user.role !== 'admin' && String(appt.patientId) !== String(user.id) && appt.patientEmail !== user.email) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to cancel this appointment.',
      });
    }

    appt.status = 'Cancelled';
    appt.cancellationReason = reason || 'Cancelled by user';

    if (getDbStatus()) {
      await appt.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully.',
      data: appt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to cancel appointment.',
    });
  }
};

const exportAppointmentsCSV = async (req, res) => {
  try {
    let appointments;
    if (getDbStatus()) {
      appointments = await Appointment.find().sort({ date: 1, timeSlot: 1 });
    } else {
      appointments = inMemoryAppointments;
    }

    const csvContent = exportAppointmentsToCSV(appointments);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="medicare_appointments.csv"');
    return res.status(200).send(csvContent);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to export appointments CSV.',
    });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  getAppointmentByCode,
  updateAppointmentStatus,
  cancelAppointment,
  exportAppointmentsCSV,
};
