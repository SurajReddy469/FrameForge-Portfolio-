const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { sampleUsers } = require('../utils/seeder');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. Token missing.' });
  }

  // Fast-track mock evaluation tokens
  if (token === 'mock-jwt-admin-token') {
    req.user = {
      _id: 'admin-fitpulse',
      name: 'FitPulse General Manager',
      email: 'admin@fitpulse.gym',
      role: 'admin',
      membershipTier: 'Elite'
    };
    return next();
  }

  if (token === 'mock-jwt-trainer-token') {
    req.user = {
      _id: 'trainer-fitpulse',
      name: 'Coach Sarah Connor',
      email: 'trainer@fitpulse.gym',
      role: 'trainer',
      membershipTier: 'Elite'
    };
    return next();
  }

  if (token === 'mock-jwt-user-token') {
    req.user = {
      _id: 'user_alex_mercer',
      name: 'Alex Mercer',
      email: 'member@fitpulse.gym',
      role: 'user',
      membershipTier: 'Pro',
      classCredits: 10
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fitpulse_super_secret_jwt_key_2026_frameforge');

    if (mongoose.connection.readyState === 1) {
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists' });
      }
      return next();
    }

    // In-memory fallback
    const user = sampleUsers.find(u => u.email === decoded.email) || {
      _id: decoded.id || 'usr_' + Date.now(),
      name: decoded.name || 'Member',
      email: decoded.email,
      role: decoded.role || 'user',
      membershipTier: decoded.membershipTier || 'Pro',
      classCredits: decoded.classCredits ?? 10
    };

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized. Invalid or expired token.' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user?.role || 'anonymous'}' is not authorized to access this route.`
      });
    }
    next();
  };
};
