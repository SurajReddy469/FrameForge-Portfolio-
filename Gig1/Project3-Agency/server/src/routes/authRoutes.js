const express = require('express');
const router = express.Router();
const { login, register, getMe } = require('../controllers/authController');
const { protect } = require('./authMiddleware');
const { validateRegister, validateLogin } = require('../utils/validationMiddleware');
const { authLimiter } = require('../utils/rateLimiter');

router.post('/login', authLimiter, validateLogin, login);
router.post('/register', authLimiter, validateRegister, register);
router.get('/me', protect, getMe);

module.exports = router;
