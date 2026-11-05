const express = require('express');
const router = express.Router();
const { getDepartments, getDepartmentByCode } = require('../controllers/departmentController');

router.get('/', getDepartments);
router.get('/:code', getDepartmentByCode);

module.exports = router;
