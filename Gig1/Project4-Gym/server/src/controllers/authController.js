const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { sampleUsers } = require('../utils/seeder');

const inMemoryUsers = sampleUsers.map((u, idx) => ({
  ...u,
  _id: 'usr-' + (idx + 1)
}));

const generateToken = (id, email, role, membershipTier, classCredits) => {
  return jwt.sign(
    { id, email, role, membershipTier, classCredits },
    process.env.JWT_SECRET || 'fitpulse_super_secret_jwt_key_2026_frameforge',
    { expiresIn: '30d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const emailClean = email.trim().toLowerCase();

    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: emailClean });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }

      // Security: Strictly enforce 'user' role
      const user = await User.create({
        name: name.trim(),
        email: emailClean,
        password,
        phone: (phone || '').trim(),
        role: 'user',
        membershipTier: 'Pro',
        classCredits: 10
      });

      const token = generateToken(user._id, user.email, user.role, user.membershipTier, user.classCredits);

      return res.status(201).json({
        success: true,
        message: 'Member account created successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          membershipTier: user.membershipTier,
          classCredits: user.classCredits,
          avatar: user.avatar,
          token
        }
      });
    }

    // In-memory fallback
    const exists = inMemoryUsers.some(u => u.email === emailClean);
    if (exists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const newUser = {
      _id: 'usr_' + Date.now(),
      name: name.trim(),
      email: emailClean,
      password,
      phone: (phone || '').trim(),
      role: 'user',
      membershipTier: 'Pro',
      classCredits: 10,
      avatar: sampleUsers[2].avatar
    };
    inMemoryUsers.push(newUser);

    const token = generateToken(newUser._id, newUser.email, newUser.role, newUser.membershipTier, newUser.classCredits);

    res.status(201).json({
      success: true,
      message: 'Member account created successfully',
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        membershipTier: newUser.membershipTier,
        classCredits: newUser.classCredits,
        avatar: newUser.avatar,
        token
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailClean = email.trim().toLowerCase();

    // Fast-track demo evaluation credentials
    if (emailClean === 'admin@fitpulse.gym' && password === 'admin123') {
      const token = generateToken('admin-fitpulse', 'admin@fitpulse.gym', 'admin', 'Elite', 999);
      return res.json({
        success: true,
        data: {
          _id: 'admin-fitpulse',
          name: 'FitPulse General Manager',
          email: 'admin@fitpulse.gym',
          role: 'admin',
          membershipTier: 'Elite',
          classCredits: 999,
          avatar: sampleUsers[0].avatar,
          token
        }
      });
    }

    if (emailClean === 'trainer@fitpulse.gym' && password === 'trainer123') {
      const token = generateToken('trainer-fitpulse', 'trainer@fitpulse.gym', 'trainer', 'Elite', 999);
      return res.json({
        success: true,
        data: {
          _id: 'trainer-fitpulse',
          name: 'Coach Sarah Connor',
          email: 'trainer@fitpulse.gym',
          role: 'trainer',
          membershipTier: 'Elite',
          classCredits: 999,
          avatar: sampleUsers[1].avatar,
          token
        }
      });
    }

    if (emailClean === 'member@fitpulse.gym' && password === 'member123') {
      const token = generateToken('user_alex_mercer', 'member@fitpulse.gym', 'user', 'Pro', 10);
      return res.json({
        success: true,
        data: {
          _id: 'user_alex_mercer',
          name: 'Alex Mercer',
          email: 'member@fitpulse.gym',
          role: 'user',
          membershipTier: 'Pro',
          classCredits: 10,
          avatar: sampleUsers[2].avatar,
          token
        }
      });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: emailClean });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = generateToken(user._id, user.email, user.role, user.membershipTier, user.classCredits);

      return res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          membershipTier: user.membershipTier,
          classCredits: user.classCredits,
          avatar: user.avatar,
          token
        }
      });
    }

    // In-memory fallback
    const user = inMemoryUsers.find(u => u.email === emailClean);
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.email, user.role, user.membershipTier, user.classCredits);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        membershipTier: user.membershipTier,
        classCredits: user.classCredits,
        avatar: user.avatar,
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, data: req.user });
};

exports.inMemoryUsers = inMemoryUsers;
