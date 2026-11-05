const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { inMemoryUsers } = require('../utils/seeder');
const { getDbStatus } = require('../config/db');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || 'medicare_super_secret_jwt_key_2026',
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, bloodGroup } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    if (getDbStatus()) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email address already exists.',
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Force role to 'patient' regardless of any request body
      const newUser = await User.create({
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        role: 'patient',
        phone: phone || '',
        bloodGroup: bloodGroup || 'Unknown',
      });

      const token = generateToken(newUser);

      return res.status(201).json({
        success: true,
        message: 'Patient account created successfully.',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone,
          bloodGroup: newUser.bloodGroup,
        },
      });
    }

    // In-memory fallback
    const memExisting = inMemoryUsers.find((u) => u.email === cleanEmail);
    if (memExisting) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newMemUser = {
      _id: `usr_patient_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: 'patient',
      phone: phone || '',
      bloodGroup: bloodGroup || 'Unknown',
      createdAt: new Date(),
    };

    inMemoryUsers.push(newMemUser);
    const token = generateToken(newMemUser);

    return res.status(201).json({
      success: true,
      message: 'Patient account created successfully.',
      token,
      user: {
        id: newMemUser._id,
        name: newMemUser.name,
        email: newMemUser.email,
        role: newMemUser.role,
        phone: newMemUser.phone,
        bloodGroup: newMemUser.bloodGroup,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating your account.',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    let user;
    if (getDbStatus()) {
      user = await User.findOne({ email: cleanEmail });
    } else {
      user = inMemoryUsers.find((u) => u.email === cleanEmail);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password.',
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password.',
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login.',
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    let user;
    if (getDbStatus()) {
      user = await User.findById(userId).select('-password');
    } else {
      user = inMemoryUsers.find((u) => String(u._id) === String(userId));
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.',
    });
  }
};

module.exports = { register, login, getCurrentUser };
