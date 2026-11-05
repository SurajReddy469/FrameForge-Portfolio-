const mongoose = require('mongoose');

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

const trainerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Trainer name is required'],
      trim: true
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'], // e.g. "Olympic Weightlifting & Strength"
      trim: true
    },
    experienceYears: {
      type: Number,
      default: 5
    },
    certifications: {
      type: [String],
      default: ['NASM-CPT', 'CrossFit Level 2', 'CPR/AED']
    },
    rating: {
      type: Number,
      default: 4.95
    },
    reviewCount: {
      type: Number,
      default: 84
    },
    bio: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR
    },
    availableSlots: {
      type: [String],
      default: ['09:00 AM', '11:30 AM', '03:00 PM', '05:30 PM']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trainer', trainerSchema);
