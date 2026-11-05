// Request Validation Middleware for GourmetHaven

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,14}$/;
const { ZONE_CAPACITY } = require('./reservationCapacity');

const ALLOWED_TIMES = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
];

exports.validateRegister = (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Valid full name is required (min 2 characters)' });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid contact phone number' });
  }

  // Security: completely strip any client-supplied role
  delete req.body.role;

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

exports.validateReservation = (req, res, next) => {
  const { guestName, guestEmail, guestPhone, guestsCount, reservationDate, reservationTime } = req.body;

  if (!guestName || guestName.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Guest name is required (min 2 characters)' });
  }

  if (!guestEmail || !EMAIL_REGEX.test(guestEmail)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address for table confirmation' });
  }

  if (!guestPhone || !PHONE_REGEX.test(guestPhone)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid mobile number for reservation updates' });
  }

  const count = parseInt(guestsCount, 10);
  if (isNaN(count) || count < 1 || count > 20) {
    return res.status(400).json({ success: false, message: 'Party size must be between 1 and 20 guests' });
  }

  const zoneCapacity = ZONE_CAPACITY[req.body.seatingZone || 'Main Dining Hall'];
  if (!zoneCapacity) {
    return res.status(400).json({ success: false, message: 'Please choose a valid seating area' });
  }
  if (count > zoneCapacity) {
    return res.status(400).json({ success: false, message: `This seating area accommodates up to ${zoneCapacity} guests` });
  }

  // Date validation: reject past dates
  const todayStr = new Date().toISOString().split('T')[0];
  if (!reservationDate || reservationDate < todayStr) {
    return res.status(400).json({ success: false, message: 'Reservation date cannot be in the past' });
  }

  // Time slot validation: reject invalid shifts
  if (!reservationTime || !ALLOWED_TIMES.includes(reservationTime)) {
    return res.status(400).json({
      success: false,
      message: `Invalid time slot. Allowed shifts: Lunch (${ALLOWED_TIMES.slice(0, 6).join(', ')}) or Dinner (${ALLOWED_TIMES.slice(6).join(', ')})`
    });
  }

  next();
};

exports.validateOrder = (req, res, next) => {
  const { customerName, customerEmail, customerPhone, orderType, items, deliveryAddress } = req.body;

  if (!customerName || customerName.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Customer name is required (min 2 characters)' });
  }

  if (!customerEmail || !EMAIL_REGEX.test(customerEmail)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid customer email' });
  }

  if (!customerPhone || !PHONE_REGEX.test(customerPhone)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid customer phone' });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order must contain at least one menu item' });
  }

  for (const it of items) {
    if (!it.title || typeof it.title !== 'string') {
      return res.status(400).json({ success: false, message: 'Every item must have a valid title' });
    }
    const q = parseInt(it.quantity, 10);
    if (isNaN(q) || q < 1) {
      return res.status(400).json({ success: false, message: `Invalid quantity for item ${it.title}` });
    }
    if (q > 50) {
      return res.status(400).json({ success: false, message: `Quantity for ${it.title} cannot exceed 50` });
    }
  }

  if (orderType === 'Delivery') {
    if (!deliveryAddress || !deliveryAddress.street || !deliveryAddress.city) {
      return res.status(400).json({ success: false, message: 'Street and city are mandatory for home delivery' });
    }
  }

  next();
};
