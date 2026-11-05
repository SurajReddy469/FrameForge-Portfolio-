// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Date regex YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Standard flexible phone check: requires between 7 and 15 digits
const isValidPhone = (phone) => {
  if (typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Name must be at least 2 characters long.',
    });
  }

  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long.',
    });
  }

  // Enforce zero role escalation: public registration CANNOT set role to admin or doctor
  if (req.body.role && req.body.role !== 'patient') {
    return res.status(403).json({
      success: false,
      message: 'Privilege escalation blocked. Public registration role must be patient.',
    });
  }

  next();
};

const validateAppointment = (req, res, next) => {
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
  } = req.body;

  if (!doctorId || typeof doctorId !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Doctor ID is required.',
    });
  }

  if (!date || !dateRegex.test(date)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid date format. Expected YYYY-MM-DD.',
    });
  }

  // Ensure appointment is not in the deep past
  const appointmentDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (appointmentDate < today) {
    return res.status(400).json({
      success: false,
      message: 'Cannot schedule an appointment for a past date.',
    });
  }

  if (!timeSlot || typeof timeSlot !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Time slot is required.',
    });
  }

  if (!patientName || patientName.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Patient full name is required (at least 2 characters).',
    });
  }

  if (!patientEmail || !emailRegex.test(patientEmail.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Valid patient email address is required.',
    });
  }

  if (!patientPhone || !isValidPhone(patientPhone.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Valid patient contact phone number is required (7 to 15 digits).',
    });
  }

  const ageNum = Number(patientAge);
  if (isNaN(ageNum) || ageNum < 0 || ageNum > 125) {
    return res.status(400).json({
      success: false,
      message: 'Valid patient age between 0 and 125 is required.',
    });
  }

  if (!['Male', 'Female', 'Other'].includes(patientGender)) {
    return res.status(400).json({
      success: false,
      message: 'Gender must be Male, Female, or Other.',
    });
  }

  if (!symptoms || symptoms.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Please provide primary symptoms or reason for visit (min 3 characters).',
    });
  }

  next();
};

module.exports = { validateRegistration, validateAppointment };
