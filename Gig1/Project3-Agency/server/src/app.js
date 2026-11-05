const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { generalLimiter } = require('./utils/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const leadRoutes = require('./routes/leadRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5175',
  'http://localhost:5175',
  'http://localhost:5174',
  'http://localhost:5173',
  'http://127.0.0.1:5175'
];

app.use(cors({
  origin: (origin, callback) => {
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
    service: 'ApexMedia Digital Agency & Client Engagement Platform API',
    brand: 'FrameForge Portfolio',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/services', serviceRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Production Error Handler (masks internal traces)
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
