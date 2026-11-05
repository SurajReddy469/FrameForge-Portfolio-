const Department = require('../models/Department');
const Doctor = require('../models/Doctor');
const { inMemoryDepartments, inMemoryDoctors } = require('../utils/seeder');
const { getDbStatus } = require('../config/db');

const getDepartments = async (req, res) => {
  try {
    let departments;
    if (getDbStatus()) {
      departments = await Department.find().sort({ name: 1 });
    } else {
      departments = inMemoryDepartments;
    }

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch departments.',
    });
  }
};

const getDepartmentByCode = async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    let department;
    let doctors;

    if (getDbStatus()) {
      department = await Department.findOne({ code });
      if (!department) {
        return res.status(404).json({
          success: false,
          message: `Department with code ${code} not found.`,
        });
      }
      doctors = await Doctor.find({ departmentCode: code, isActive: true });
    } else {
      department = inMemoryDepartments.find((d) => d.code === code);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: `Department with code ${code} not found.`,
        });
      }
      doctors = inMemoryDoctors.filter((doc) => doc.departmentCode === code && doc.isActive);
    }

    return res.status(200).json({
      success: true,
      data: {
        ...department,
        doctors,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching department details.',
    });
  }
};

module.exports = { getDepartments, getDepartmentByCode };
