const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateRegistration } = require('../middleware/validationMiddleware');

router.post('/register', validateRegistration, register);
router.post('/login', authLimiter, login);
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
