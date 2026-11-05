import express from 'express';
import {
  getProperties,
  getFeaturedProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getAdminStats
} from '../controllers/propertyController.js';
import { protect, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/featured', getFeaturedProperties);
router.get('/admin/stats', protect, authorizeAdmin, getAdminStats);
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Admin protected routes
router.post('/', protect, authorizeAdmin, createProperty);
router.put('/:id', protect, authorizeAdmin, updateProperty);
router.delete('/:id', protect, authorizeAdmin, deleteProperty);

export default router;
