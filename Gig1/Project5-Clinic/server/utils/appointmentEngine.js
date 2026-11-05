const crypto = require('crypto');

/**
 * Generate a unique collision-resistant appointment confirmation code
 * Format: CARE-APPT-XXXXXX (e.g. CARE-APPT-7E9B2F)
 */
const generateAppointmentCode = () => {
  const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `CARE-APPT-${randomHex}`;
};

/**
 * Checks if a slot is already taken for a specific doctor on a given date and timeSlot.
 * Active appointments are status: 'Confirmed' or 'Checked-In'.
 */
const isSlotAvailable = (appointments, doctorId, date, timeSlot) => {
  const activeExisting = appointments.find(
    (appt) =>
      appt.doctorId === doctorId &&
      appt.date === date &&
      appt.timeSlot === timeSlot &&
      ['Confirmed', 'Checked-In'].includes(appt.status)
  );

  return !activeExisting;
};

/**
 * RFC 4180 compliant CSV export
 */
const exportAppointmentsToCSV = (appointments = []) => {
  const headers = [
    'Appointment Code',
    'Date',
    'Time Slot',
    'Doctor Name',
    'Department',
    'Patient Name',
    'Patient Email',
    'Patient Phone',
    'Patient Age',
    'Gender',
    'Consultation Fee ($)',
    'Status',
    'Symptoms',
    'Medical History',
    'Created At',
  ];

  const escapeField = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = appointments.map((appt) => [
    escapeField(appt.appointmentCode),
    escapeField(appt.date),
    escapeField(appt.timeSlot),
    escapeField(appt.doctorName),
    escapeField(appt.department),
    escapeField(appt.patientName),
    escapeField(appt.patientEmail),
    escapeField(appt.patientPhone),
    escapeField(appt.patientAge),
    escapeField(appt.patientGender),
    escapeField(appt.consultationFee),
    escapeField(appt.status),
    escapeField(appt.symptoms),
    escapeField(appt.medicalHistory || 'None'),
    escapeField(appt.createdAt ? new Date(appt.createdAt).toISOString() : ''),
  ]);

  return [headers.map(escapeField).join(','), ...rows.map((r) => r.join(','))].join('\r\n');
};

module.exports = {
  generateAppointmentCode,
  isSlotAvailable,
  exportAppointmentsToCSV,
};
