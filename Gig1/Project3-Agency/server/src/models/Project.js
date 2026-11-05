const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true
    },
    industry: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Full-Stack Web', 'SaaS Platform', 'Mobile App', 'Brand & UI/UX', 'Cloud & AI']
    },
    year: {
      type: Number,
      default: 2025
    },
    tagline: {
      type: String,
      required: true
    },
    challenge: {
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    },
    metrics: [
      {
        label: { type: String, required: true }, // e.g. "+340%"
        description: { type: String, required: true } // e.g. "Organic Traffic Growth"
      }
    ],
    coverImage: {
      type: String,
      required: true
    },
    galleryImages: [String],
    liveUrl: {
      type: String,
      default: ''
    },
    techStack: [String],
    isFeatured: {
      type: Boolean,
      default: false
    },
    clientTestimonial: {
      quote: String,
      author: String,
      role: String
    }
  },
  {
    timestamps: true
  }
);

projectSchema.index({ category: 1, isFeatured: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
