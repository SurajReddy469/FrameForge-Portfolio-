import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';
import { demoPropertyMap } from '../data/demoProperties.js';

// @desc    Submit a new property inquiry / lead
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res, next) => {
  try {
    const { 
      property, 
      name, 
      email, 
      phone, 
      message, 
      preferredContact,
      tourType,
      preferredDate,
      preferredTime 
    } = req.body;

    if (!property || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100 ||
      typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof phone !== 'string' || !/^\+?[\d\s().-]{7,20}$/.test(phone.trim())) {
      return res.status(400).json({ success: false, message: 'Provide a valid property, name, email, and phone number' });
    }
    if (preferredDate && (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || Number.isNaN(Date.parse(`${preferredDate}T00:00:00`)) || new Date(`${preferredDate}T00:00:00`) < new Date(new Date().toDateString()))) {
      return res.status(400).json({ success: false, message: 'Preferred date must be today or a future date' });
    }
    if (message && (typeof message !== 'string' || message.length > 2000)) {
      return res.status(400).json({ success: false, message: 'Message cannot exceed 2000 characters' });
    }

    if (mongoose.connection.readyState !== 1) {
      const demoProp = demoPropertyMap.get(property);
      if (!demoProp && !/^[a-f\d]{24}$/i.test(property)) {
        return res.status(404).json({ success: false, message: 'Property listing not found' });
      }
      return res.status(201).json({
        success: true,
        message: 'Tour inspection booked successfully! An agent will confirm your appointment shortly.',
        data: {
          _id: `inq-${Date.now()}`,
          property,
          name,
          email: email.trim().toLowerCase(),
          phone,
          message: message?.trim() || 'Interested in scheduling a tour.',
          preferredContact: preferredContact || 'Phone',
          tourType: tourType || 'In-Person Tour',
          preferredDate: preferredDate || new Date().toISOString().split('T')[0],
          preferredTime: preferredTime || '10:00 AM',
          status: 'Pending',
          createdAt: new Date().toISOString()
        }
      });
    }

    if (!/^[a-f\d]{24}$/i.test(property) || !(await Property.exists({ _id: property }))) {
      return res.status(404).json({ success: false, message: 'Property listing not found' });
    }

    const inquiry = await Inquiry.create({
      property,
      name,
      email: email.trim().toLowerCase(),
      phone,
      message: message?.trim() || 'Interested in scheduling a tour.',
      preferredContact: preferredContact || 'Phone',
      tourType: tourType || 'In-Person Tour',
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: preferredTime || '10:00 AM'
    });

    res.status(201).json({
      success: true,
      message: 'Tour inspection booked successfully! An agent will confirm your appointment shortly.',
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries (with property populate)
// @route   GET /api/inquiries
// @access  Private/Admin
export const getInquiries = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        count: 0,
        data: []
      });
    }
    const inquiries = await Inquiry.find()
      .populate('property', 'title address price images propertyType')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status (New -> Contacted -> Closed)
// @route   PUT /api/inquiries/:id/status
// @access  Private/Admin
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
