const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const bookingLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 60,
  message: {
    success: false,
    message: 'Too many appointment requests created. Please wait before scheduling another slot.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: {
    success: false,
    message: 'Rate limit exceeded. Please throttle your requests.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter, bookingLimiter, apiLimiter };
