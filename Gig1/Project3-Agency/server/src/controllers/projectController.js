const mongoose = require('mongoose');
const Project = require('../models/Project');
const { sampleProjects } = require('../utils/seeder');

const inMemoryProjects = sampleProjects.map((p, idx) => ({
  ...p,
  _id: 'proj-' + (idx + 1),
  createdAt: new Date(Date.now() - (idx * 86400000 * 3)).toISOString()
}));

exports.getProjects = async (req, res) => {
  try {
    const { category, search, featured, sort } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (featured === 'true') query.isFeatured = true;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { clientName: { $regex: search, $options: 'i' } },
          { challenge: { $regex: search, $options: 'i' } }
        ];
      }

      let result = Project.find(query);
      if (sort === 'year-desc') result = result.sort({ year: -1 });
      else result = result.sort({ createdAt: -1 });

      const projects = await result;
      return res.json({ success: true, count: projects.length, data: projects });
    }

    // In-memory fallback
    let filtered = [...inMemoryProjects];
    if (category && category !== 'All') filtered = filtered.filter(p => p.category === category);
    if (featured === 'true') filtered = filtered.filter(p => p.isFeatured);
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.clientName.toLowerCase().includes(s));
    }
    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    let project = null;
    if (mongoose.connection.readyState === 1) {
      project = await Project.findById(req.params.id);
    } else {
      project = inMemoryProjects.find(p => p._id === req.params.id);
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.create(req.body);
      return res.status(201).json({ success: true, data: project });
    }

    const mockProject = {
      ...req.body,
      _id: 'proj_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    inMemoryProjects.unshift(mockProject);
    res.status(201).json({ success: true, data: mockProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.json({ success: true, data: project });
    }

    const project = inMemoryProjects.find(p => p._id === req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    Object.assign(project, req.body);
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.json({ success: true, message: 'Case study removed' });
    }

    const index = inMemoryProjects.findIndex(p => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Project not found' });
    inMemoryProjects.splice(index, 1);
    res.json({ success: true, message: 'Case study removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.inMemoryProjects = inMemoryProjects;
