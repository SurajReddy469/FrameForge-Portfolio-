import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  toggleFavorite
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { createRateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

const authRateLimit = createRateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many authentication attempts. Please try again later.' });
router.post('/register', authRateLimit, registerUser);
router.post('/login', authRateLimit, loginUser);
router.get('/me', protect, getMe);
router.post('/favorites/:propertyId', protect, toggleFavorite);

export default router;
