import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Property from '../models/Property.js';

// Helper: Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'development_only_change_this_secret_32_chars',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// Fallback in-memory users for demo resilience
const demoUsers = [
  {
    _id: 'usr_admin_01',
    name: 'FrameForge Admin',
    email: 'admin@urbannest.com',
    role: 'admin',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>"
  },
  {
    _id: 'usr_demo_02',
    name: 'Rahul Sharma',
    email: 'user@urbannest.com',
    role: 'user',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>"
  }
];

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
      return res.status(400).json({ success: false, message: 'Name must be between 2 and 80 characters' });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }
    if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
      return res.status(400).json({ success: false, message: 'Password must be between 8 and 128 characters' });
    }

    if (mongoose.connection.readyState !== 1) {
      const cleanEmail = email.trim().toLowerCase();
      if (demoUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }
      const demoId = `usr_demo_${Date.now()}`;
      const token = generateToken(demoId);
      const newUser = {
        _id: demoId,
        name: name.trim(),
        email: cleanEmail,
        role: 'user', // strictly enforced user role
        avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>"
      };
      demoUsers.push(newUser);
      return res.status(201).json({
        success: true,
        data: {
          ...newUser,
          token
        }
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email: email.trim().toLowerCase(),
      password,
      role: 'user'
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (mongoose.connection.readyState !== 1) {
      const cleanEmail = email.trim().toLowerCase();
      const demoUser = demoUsers.find(u => u.email.toLowerCase() === cleanEmail);
      if (demoUser) {
        return res.json({
          success: true,
          data: {
            _id: demoUser._id,
            name: demoUser.name,
            email: demoUser.email,
            role: demoUser.role,
            avatar: demoUser.avatar,
            token: generateToken(demoUser._id),
            isDemoMode: true
          }
        });
      }
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const demo = demoUsers.find(u => String(u._id) === String(req.user?._id)) || demoUsers[0];
      return res.json({ success: true, data: demo });
    }
    const user = await User.findById(req.user._id).populate('favorites');
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle favorite property
// @route   POST /api/auth/favorites/:propertyId
// @access  Private
export const toggleFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { propertyId } = req.params;
    if (!user) return res.status(404).json({ success: false, message: 'User no longer exists' });
    if (!/^[a-f\d]{24}$/i.test(propertyId)) {
      return res.status(400).json({ success: false, message: 'Invalid property ID' });
    }
    const propertyExists = await Property.exists({ _id: propertyId });
    if (!propertyExists) return res.status(404).json({ success: false, message: 'Property listing not found' });

    const isFav = user.favorites.some((id) => id.toString() === propertyId);
    if (isFav) {
      user.favorites = user.favorites.filter((id) => id.toString() !== propertyId);
    } else {
      user.favorites.push(propertyId);
    }

    await user.save();
    res.json({
      success: true,
      isFavorite: !isFav,
      favorites: user.favorites
    });
  } catch (error) {
    next(error);
  }
};
