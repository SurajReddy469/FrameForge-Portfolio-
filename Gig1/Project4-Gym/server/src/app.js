require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { generalLimiter } = require('./utils/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const planRoutes = require('./routes/planRoutes');

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5176')
  .split(',').map((origin) => origin.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS security policy'));
  },
  credentials: true
}));

app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(generalLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'FitPulse Gym Management & Interactive Class Booking Platform API',
    brand: 'FrameForge Portfolio',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/plans', planRoutes);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('[FitPulse Server Error]', err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
