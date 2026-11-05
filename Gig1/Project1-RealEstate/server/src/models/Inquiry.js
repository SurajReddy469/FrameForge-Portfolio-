import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide a contact phone number'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Please include your message or inquiry question']
    },
    tourType: {
      type: String,
      enum: ['In-Person Tour', 'Virtual Video Call'],
      default: 'In-Person Tour'
    },
    preferredDate: {
      type: String,
      default: ''
    },
    preferredTime: {
      type: String,
      default: '10:00 AM'
    },
    preferredContact: {
      type: String,
      enum: ['Email', 'Phone', 'WhatsApp'],
      default: 'Phone'
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New'
    }
  },
  {
    timestamps: true
  }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
