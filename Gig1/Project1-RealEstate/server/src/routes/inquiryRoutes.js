import express from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiryController.js';
import { protect, authorizeAdmin } from '../middleware/authMiddleware.js';
import { createRateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

// Public route for visitors to inquire on listings
router.post('/', createRateLimit({ windowMs: 15 * 60 * 1000, max: 8, message: 'Too many inquiries from this address. Please try again later.' }), createInquiry);

// Admin routes to view and update leads
router.get('/', protect, authorizeAdmin, getInquiries);
router.put('/:id/status', protect, authorizeAdmin, updateInquiryStatus);
router.delete('/:id', protect, authorizeAdmin, deleteInquiry);

export default router;
