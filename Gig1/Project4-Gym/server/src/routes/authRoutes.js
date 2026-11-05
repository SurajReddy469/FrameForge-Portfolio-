const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('./authMiddleware');
const { validateRegister, validateLogin } = require('../utils/validationMiddleware');
const { authLimiter } = require('../utils/rateLimiter');

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;
