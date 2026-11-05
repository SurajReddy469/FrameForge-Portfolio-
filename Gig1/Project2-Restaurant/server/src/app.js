const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { generalLimiter } = require('./utils/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Secure CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5174',
  'http://localhost:5174',
  'http://localhost:5173',
  'http://127.0.0.1:5174'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server or curl requests with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS security policy'));
  },
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Global baseline rate limiter
app.use('/api', generalLimiter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'GourmetHaven Fine Dining Restaurant API',
    brand: 'FrameForge Portfolio',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'demo-offline',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Production Safe Error Handler (masks internal stack traces)
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected operational error occurred',
    ...(isProd ? {} : { stack: err.stack })
  });
});

module.exports = app;
