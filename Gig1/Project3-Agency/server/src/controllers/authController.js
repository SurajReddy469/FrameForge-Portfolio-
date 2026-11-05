const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const inMemoryUsers = new Map();

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23818cf8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'apexmedia_secret', {
    expiresIn: '30d'
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, title } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    // Security: Forced regular user role
    const enforcedRole = 'user';

    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already registered with this email' });
      }

      const user = await User.create({
        name,
        email: cleanEmail,
        password,
        role: enforcedRole,
        title: title || 'Agency Client'
      });

      return res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          title: user.title,
          token: generateToken(user._id, user.role)
        }
      });
    }

    // In-Memory Resilient Fallback
    if (inMemoryUsers.has(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'User already registered with this email' });
    }

    const mockUser = {
      _id: 'usr_' + Date.now() + Math.random().toString(36).substring(7),
      name,
      email: cleanEmail,
      role: enforcedRole,
      avatar: DEFAULT_AVATAR,
      title: title || 'Agency Client',
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
        title: mockUser.title,
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
    const cleanEmail = email.toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid business email or password' });
      }

      return res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          title: user.title,
          token: generateToken(user._id, user.role)
        }
      });
    }

    // Resilient fallback for evaluation accounts
    if (cleanEmail === 'admin@apexmedia.com' && password === 'admin123') {
      return res.json({
        success: true,
        data: {
          _id: 'admin-apex',
          name: 'FrameForge Principal',
          email: 'admin@apexmedia.com',
          role: 'admin',
          avatar: DEFAULT_AVATAR,
          title: 'Managing Director & Partner',
          token: generateToken('admin-apex', 'admin')
        }
      });
    }

    if (cleanEmail === 'client@apexmedia.com' && password === 'client123') {
      return res.json({
        success: true,
        data: {
          _id: 'client-apex',
          name: 'Sarah Jenkins',
          email: 'client@apexmedia.com',
          role: 'user',
          avatar: DEFAULT_AVATAR,
          title: 'VP of Product, FinScale Inc.',
          token: generateToken('client-apex', 'user')
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
          title: memoryUser.title,
          token: generateToken(memoryUser._id, memoryUser.role)
        }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid business email or password' });
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
