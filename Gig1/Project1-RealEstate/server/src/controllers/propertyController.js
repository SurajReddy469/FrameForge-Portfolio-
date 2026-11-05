import mongoose from 'mongoose';
import Property from '../models/Property.js';
import { demoProperties, demoPropertyMap } from '../data/demoProperties.js';

const normalizeString = (value) => String(value || '').trim().toLowerCase();
const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildDemoPropertyResponse = (filters = {}) => {
  const {
    search,
    city,
    propertyType,
    purpose,
    minPrice,
    maxPrice,
    bedrooms,
    sortBy,
    page = 1,
    limit = 9
  } = filters;

  let filtered = [...demoProperties];

  if (search) {
    const query = normalizeString(search);
    filtered = filtered.filter((property) => {
      const title = normalizeString(property.title);
      const cityName = normalizeString(property.address?.city);
      const street = normalizeString(property.address?.street);
      return title.includes(query) || cityName.includes(query) || street.includes(query);
    });
  }

  if (city && city !== 'All') {
    filtered = filtered.filter((property) => normalizeString(property.address?.city) === normalizeString(city));
  }

  if (propertyType && propertyType !== 'All') {
    filtered = filtered.filter((property) => property.propertyType === propertyType);
  }

  if (purpose && purpose !== 'All') {
    filtered = filtered.filter((property) => property.purpose === purpose);
  }

  if (minPrice || maxPrice) {
    filtered = filtered.filter((property) => {
      const price = Number(property.price);
      const meetsMin = minPrice ? price >= Number(minPrice) : true;
      const meetsMax = maxPrice ? price <= Number(maxPrice) : true;
      return meetsMin && meetsMax;
    });
  }

  if (bedrooms && bedrooms !== 'All') {
    filtered = filtered.filter((property) => Number(property.specs?.bedrooms) === Number(bedrooms));
  }

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 9;
  const skip = (pageNum - 1) * limitNum;
  const paginated = filtered.slice(skip, skip + limitNum);

  return {
    success: true,
    count: paginated.length,
    total: filtered.length,
    totalPages: Math.max(1, Math.ceil(filtered.length / limitNum)),
    currentPage: pageNum,
    data: paginated,
    isFallback: true
  };
};

// @desc    Get all properties with filtering, search, sorting & pagination
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(buildDemoPropertyResponse(req.query));
    }
    const {
      search,
      city,
      propertyType,
      purpose,
      minPrice,
      maxPrice,
      bedrooms,
      sortBy,
      page = 1,
      limit = 9
    } = req.query;

    const query = {};

    if (search) {
      if (String(search).length > 100) return res.status(400).json({ success: false, message: 'Search must be 100 characters or fewer' });
      const safeSearch = escapeRegex(search);
      query.$or = [
        { title: { $regex: safeSearch, $options: 'i' } },
        { 'address.city': { $regex: safeSearch, $options: 'i' } },
        { 'address.street': { $regex: safeSearch, $options: 'i' } }
      ];
    }

    if (city && city !== 'All') {
      query['address.city'] = { $regex: new RegExp(`^${escapeRegex(city)}$`, 'i') };
    }

    if (propertyType && propertyType !== 'All') {
      query.propertyType = propertyType;
    }

    if (purpose && purpose !== 'All') {
      query.purpose = purpose;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (bedrooms && bedrooms !== 'All') {
      query['specs.bedrooms'] = Number(bedrooms);
    }

    let sortOption = { createdAt: -1 };
    if (sortBy === 'price-low') sortOption = { price: 1 };
    if (sortBy === 'price-high') sortOption = { price: -1 };
    if (sortBy === 'area') sortOption = { 'specs.areaSqFt': -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    if (!Number.isInteger(pageNum) || pageNum < 1 || !Number.isInteger(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ success: false, message: 'Page must be positive and limit must be between 1 and 100' });
    }
    const skip = (pageNum - 1) * limitNum;

    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    return res.json({
      success: true,
      count: properties.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: properties
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
export const getFeaturedProperties = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const featured = demoProperties.filter((p) => p.featured).slice(0, 6);
      return res.json({ success: true, count: featured.length, data: featured });
    }
    const featured = await Property.find({ featured: true }).limit(6).sort({ createdAt: -1 });
    return res.json({ success: true, count: featured.length, data: featured });
  } catch (error) {
    const featured = demoProperties.filter((p) => p.featured).slice(0, 6);
    return res.json({ success: true, count: featured.length, data: featured });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const fallbackProperty = demoPropertyMap.get(req.params.id) || demoProperties[0];
      return res.json({ success: true, data: fallbackProperty, isFallback: true });
    }
    const property = await Property.findById(req.params.id).populate('createdBy', 'name email');

    if (!property) {
      const fallbackProperty = demoPropertyMap.get(req.params.id);
      if (fallbackProperty) {
        return res.json({ success: true, data: fallbackProperty, isFallback: true });
      }
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    return res.json({ success: true, data: property });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid property ID' });
    }
    const fallbackProperty = demoPropertyMap.get(req.params.id);
    if (fallbackProperty) {
      return res.json({ success: true, data: fallbackProperty, isFallback: true });
    }
    return next(error);
  }
};

// @desc    Create new property listing
// @route   POST /api/properties
// @access  Private/Admin
export const createProperty = async (req, res, next) => {
  try {
    const propertyData = {
      ...req.body,
      createdBy: req.user._id
    };

    if (mongoose.connection.readyState !== 1) {
      const demoProp = {
        _id: `prop_demo_${Date.now()}`,
        ...propertyData,
        createdAt: new Date().toISOString()
      };
      demoProperties.unshift(demoProp);
      demoPropertyMap.set(demoProp._id, demoProp);
      return res.status(201).json({ success: true, data: demoProp });
    }

    const property = await Property.create(propertyData);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property listing
// @route   PUT /api/properties/:id
// @access  Private/Admin
export const updateProperty = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const existing = demoPropertyMap.get(req.params.id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Property listing not found' });
      }
      const updated = { ...existing, ...req.body };
      demoPropertyMap.set(req.params.id, updated);
      return res.json({ success: true, data: updated });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    const { _id, createdBy, ...updates } = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: updatedProperty });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete property listing
// @route   DELETE /api/properties/:id
// @access  Private/Admin
export const deleteProperty = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const existing = demoPropertyMap.get(req.params.id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Property listing not found' });
      }
      demoPropertyMap.delete(req.params.id);
      return res.json({ success: true, message: 'Property deleted successfully' });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard summary statistics
// @route   GET /api/properties/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const totalProperties = demoProperties.length;
      const forSale = demoProperties.filter(p => p.purpose === 'For Sale').length;
      const forRent = demoProperties.filter(p => p.purpose === 'For Rent').length;
      const featured = demoProperties.filter(p => p.featured).length;
      return res.json({
        success: true,
        data: {
          totalProperties,
          forSale,
          forRent,
          featured
        }
      });
    }

    const totalProperties = await Property.countDocuments();
    const forSale = await Property.countDocuments({ purpose: 'For Sale' });
    const forRent = await Property.countDocuments({ purpose: 'For Rent' });
    const featured = await Property.countDocuments({ featured: true });

    return res.json({
      success: true,
      data: {
        totalProperties,
        forSale,
        forRent,
        featured
      }
    });
  } catch (error) {
    return next(error);
  }
};
