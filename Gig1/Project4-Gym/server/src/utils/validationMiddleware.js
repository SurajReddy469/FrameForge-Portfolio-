// Validation Middleware for FitPulse
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Valid full name required (min 2 characters)' });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  // Security: strip role & credits to prevent privilege escalation
  delete req.body.role;
  delete req.body.classCredits;

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  next();
};

exports.validateClass = (req, res, next) => {
  const { title, instructorName, category, scheduleDay, scheduleTime } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({ success: false, message: 'Class title required (min 3 characters)' });
  }

  if (!instructorName || instructorName.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Instructor name required' });
  }

  const validCategories = ['HIIT', 'Yoga', 'Strength', 'Spin', 'Boxing', 'CrossFit', 'Pilates'];
  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
    });
  }

  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  if (!scheduleDay || !validDays.includes(scheduleDay)) {
    return res.status(400).json({
      success: false,
      message: `Invalid day. Must be one of: ${validDays.join(', ')}`
    });
  }

  if (!scheduleTime) {
    return res.status(400).json({ success: false, message: 'Schedule time is required (e.g. 07:00 AM)' });
  }

  next();
};

exports.validateBooking = (req, res, next) => {
  const { classId } = req.body;

  if (!classId) {
    return res.status(400).json({ success: false, message: 'Valid classId is required to reserve a slot' });
  }

  next();
};
