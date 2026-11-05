const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const { sampleDishes } = require('../utils/seeder');

exports.getMenuItems = async (req, res) => {
  try {
    const { category, dietary, search, featured, sort } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let items = [...sampleDishes];
      if (category && category !== 'All') {
        items = items.filter(d => d.category === category);
      }
      if (dietary && dietary !== 'All') {
        items = items.filter(d => d.dietaryTags?.includes(dietary));
      }
      if (featured === 'true') {
        items = items.filter(d => d.isFeatured);
      }
      if (search) {
        const s = search.toLowerCase();
        items = items.filter(d => d.title.toLowerCase().includes(s) || d.description.toLowerCase().includes(s));
      }
      if (sort === 'price-low') {
        items.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        items.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        items.sort((a, b) => b.rating - a.rating);
      }
      return res.json({ success: true, count: items.length, data: items, isFallback: true });
    }
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (dietary && dietary !== 'All') {
      query.dietaryTags = dietary;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let result = MenuItem.find(query);

    if (sort === 'price-low') {
      result = result.sort({ price: 1 });
    } else if (sort === 'price-high') {
      result = result.sort({ price: -1 });
    } else if (sort === 'rating') {
      result = result.sort({ rating: -1 });
    } else {
      result = result.sort({ createdAt: -1 });
    }

    const items = await result;
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const item = sampleDishes.find(d => d._id === req.params.id || d.title === req.params.id) || sampleDishes[0];
      return res.json({ success: true, data: item, isFallback: true });
    }
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }
    res.json({ success: true, message: 'Dish removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
