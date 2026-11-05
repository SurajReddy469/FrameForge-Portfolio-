import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a property title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [1, 'Price must be greater than zero']
    },
    propertyType: {
      type: String,
      required: [true, 'Please specify property type'],
      enum: ['Apartment', 'House', 'Villa', 'Penthouse', 'Commercial']
    },
    purpose: {
      type: String,
      required: [true, 'Please specify purpose (For Sale or For Rent)'],
      enum: ['For Sale', 'For Rent']
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, default: '500081' },
      country: { type: String, default: 'India' }
    },
    specs: {
      bedrooms: { type: Number, required: true, default: 1, min: 0 },
      bathrooms: { type: Number, required: true, default: 1, min: 0 },
      areaSqFt: { type: Number, required: true, min: 1 },
      parkingSpaces: { type: Number, default: 1, min: 0 },
      yearBuilt: { type: Number, default: 2023 }
    },
    amenities: {
      type: [String],
      default: ['Air Conditioning', 'High-Speed Wi-Fi', 'Security 24/7']
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one property image']
    },
    featured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['Available', 'Pending', 'Sold'],
      default: 'Available'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Indexes for high-speed multi-criteria filtering
propertySchema.index({ 'address.city': 1, propertyType: 1, purpose: 1, price: 1 });

const Property = mongoose.model('Property', propertySchema);
export default Property;
