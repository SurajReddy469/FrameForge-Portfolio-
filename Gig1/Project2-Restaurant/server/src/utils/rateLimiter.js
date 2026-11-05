const rateLimit = require('express-rate-limit');

// Authentication Rate Limiter (Protects against brute force login/registration)
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.'
  }
});

// Order Creation Rate Limiter
exports.orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Order creation limit reached from this IP. Please try again shortly.'
  }
});

// Table Reservation Rate Limiter
exports.reservationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Reservation request limit reached from this IP. Please try again shortly.'
  }
});

// General API Limiter
exports.generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please slow down.'
  }
});
