const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect, authorize } = require('./authMiddleware');

router.route('/')
  .get(getProjects)
  .post(protect, authorize('admin'), createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, authorize('admin'), updateProject)
  .delete(protect, authorize('admin'), deleteProject);

module.exports = router;
