const express = require('express');
const router = express.Router();
const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
} = require('../controllers/classController');
const { protect, authorize } = require('./authMiddleware');
const { validateClass } = require('../utils/validationMiddleware');

router.route('/')
  .get(getClasses)
  .post(protect, authorize('admin'), validateClass, createClass);

router.route('/:id')
  .get(getClassById)
  .put(protect, authorize('admin'), updateClass)
  .delete(protect, authorize('admin'), deleteClass);

module.exports = router;
