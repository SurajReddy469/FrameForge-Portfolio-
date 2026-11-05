const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const inMemoryUsers = new Map();

const generateToken = (id, role = 'user') => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Security: Public registration CANNOT self-assign 'admin' role. Role is strictly 'user'.
    const enforcedRole = 'user';

    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const user = await User.create({
        name,
        email: cleanEmail,
        password,
        role: enforcedRole,
        phone: phone || '+91 98765 43210'
      });

      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          token: generateToken(user._id, user.role)
        }
      });
    }

    // Resilient In-Memory Storage if DB is offline
    if (inMemoryUsers.has(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const mockUser = {
      _id: 'usr_' + Date.now() + Math.random().toString(36).substring(7),
      name,
      email: cleanEmail,
      role: enforcedRole,
      avatar: DEFAULT_AVATAR,
      phone: phone || '+91 98765 43210',
      password
    };
    inMemoryUsers.set(cleanEmail, mockUser);

    res.status(201).json({
      success: true,
      data: {
        _id: mockUser._id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        avatar: mockUser.avatar,
        phone: mockUser.phone,
        token: generateToken(mockUser._id, mockUser.role)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      return res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phone: user.phone,
          token: generateToken(user._id, user.role)
        }
      });
    }

    // Resilient fallback for demo users or registered users
    if (process.env.NODE_ENV !== 'production' && cleanEmail === 'admin@gourmethaven.com' && password === 'admin123') {
      return res.json({
        success: true,
        data: {
          _id: 'admin-gh',
          name: 'FrameForge Admin',
          email: 'admin@gourmethaven.com',
          role: 'admin',
          avatar: DEFAULT_AVATAR,
          phone: '+91 98765 43210',
          token: generateToken('admin-gh', 'admin')
        }
      });
    }

    if (process.env.NODE_ENV !== 'production' && cleanEmail === 'user@gourmethaven.com' && password === 'user123') {
      return res.json({
        success: true,
        data: {
          _id: 'user-gh',
          name: 'Ananya Deshmukh',
          email: 'user@gourmethaven.com',
          role: 'user',
          avatar: DEFAULT_AVATAR,
          phone: '+91 91234 56789',
          token: generateToken('user-gh', 'user')
        }
      });
    }

    const memoryUser = inMemoryUsers.get(cleanEmail);
    if (memoryUser && memoryUser.password === password) {
      return res.json({
        success: true,
        data: {
          _id: memoryUser._id,
          name: memoryUser.name,
          email: memoryUser.email,
          role: memoryUser.role,
          avatar: memoryUser.avatar,
          phone: memoryUser.phone,
          token: generateToken(memoryUser._id, memoryUser.role)
        }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
