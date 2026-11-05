const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const { calculateScopeEstimate } = require('../utils/pricingEstimator');
const { sampleLeads } = require('../utils/seeder');

const inMemoryLeads = sampleLeads.map((l, idx) => ({
  ...l,
  _id: 'lead-' + (idx + 1),
  createdAt: l.createdAt || new Date(Date.now() - (idx * 86400000 * 2)).toISOString()
}));

async function generateUniqueLeadCode() {
  for (let i = 0; i < 5; i++) {
    const code = 'APEX-LEAD-' + Math.floor(100000 + Math.random() * 900000);
    if (mongoose.connection.readyState === 1) {
      const exists = await Lead.exists({ leadCode: code });
      if (!exists) return code;
    } else {
      const exists = inMemoryLeads.some(l => l.leadCode === code);
      if (!exists) return code;
    }
  }
  return 'APEX-LEAD-' + Date.now().toString().slice(-6);
}

exports.calculateEstimate = (req, res) => {
  try {
    const { projectType, features, timeline } = req.body;
    const estimate = calculateScopeEstimate({ projectType, features, timeline });
    res.json({ success: true, data: estimate });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createLead = async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      companyName,
      clientPhone,
      projectType,
      timeline,
      features,
      message
    } = req.body;

    const leadCode = await generateUniqueLeadCode();

    // Compute verified estimate if features were provided
    const scope = calculateScopeEstimate({
      projectType,
      features: features || [],
      timeline: timeline || '1 - 3 Months'
    });

    const leadPayload = {
      leadCode,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim().toLowerCase(),
      companyName: (companyName || '').trim(),
      clientPhone: (clientPhone || '').trim(),
      projectType,
      timeline: timeline || '1 - 3 Months',
      estimatedBudget: scope.suggestedTier,
      scopeBreakdown: {
        features: scope.verifiedFeatures,
        calculatedEstimateUSD: scope.calculatedEstimateUSD
      },
      message: message.trim(),
      status: 'New',
      createdAt: new Date().toISOString()
    };

    if (mongoose.connection.readyState === 1) {
      const lead = await Lead.create(leadPayload);
      return res.status(201).json({
        success: true,
        message: 'Project inquiry submitted successfully. Our partners will reach out within 24 hours.',
        data: lead
      });
    }

    const mockLead = { ...leadPayload, _id: 'lead_' + Date.now() };
    inMemoryLeads.unshift(mockLead);

    res.status(201).json({
      success: true,
      message: 'Project inquiry submitted successfully. Our partners will reach out within 24 hours.',
      data: mockLead
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { clientName: { $regex: search, $options: 'i' } },
          { clientEmail: { $regex: search, $options: 'i' } },
          { companyName: { $regex: search, $options: 'i' } },
          { leadCode: { $regex: search, $options: 'i' } }
        ];
      }

      const totalCount = await Lead.countDocuments(query);
      const leads = await Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum);

      return res.json({
        success: true,
        count: leads.length,
        totalCount,
        page: pageNum,
        totalPages: Math.ceil(totalCount / limitNum) || 1,
        data: leads
      });
    }

    // In-memory fallback
    let filtered = [...inMemoryLeads];
    if (status && status !== 'All') filtered = filtered.filter(l => l.status === status);
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(l => l.clientName.toLowerCase().includes(s) || l.companyName.toLowerCase().includes(s) || l.leadCode.toLowerCase().includes(s));
    }

    const totalCount = filtered.length;
    const paginated = filtered.slice(skip, skip + limitNum);

    res.json({
      success: true,
      count: paginated.length,
      totalCount,
      page: pageNum,
      totalPages: Math.ceil(totalCount / limitNum) || 1,
      data: paginated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ['New', 'In Review', 'Proposal Sent', 'Won', 'Archived'];
    if (!valid.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${valid.join(', ')}` });
    }

    if (mongoose.connection.readyState === 1) {
      const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      return res.json({ success: true, data: lead });
    }

    const lead = inMemoryLeads.find(l => l._id === req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    lead.status = status;
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const totalLeads = await Lead.countDocuments();
      const newLeads = await Lead.countDocuments({ status: 'New' });
      const proposalsSent = await Lead.countDocuments({ status: 'Proposal Sent' });
      const wonDeals = await Lead.countDocuments({ status: 'Won' });

      return res.json({
        success: true,
        data: { totalLeads, newLeads, proposalsSent, wonDeals }
      });
    }

    const totalLeads = inMemoryLeads.length;
    const newLeads = inMemoryLeads.filter(l => l.status === 'New').length;
    const proposalsSent = inMemoryLeads.filter(l => l.status === 'Proposal Sent').length;
    const wonDeals = inMemoryLeads.filter(l => l.status === 'Won').length;

    res.json({
      success: true,
      data: { totalLeads, newLeads, proposalsSent, wonDeals }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.inMemoryLeads = inMemoryLeads;

