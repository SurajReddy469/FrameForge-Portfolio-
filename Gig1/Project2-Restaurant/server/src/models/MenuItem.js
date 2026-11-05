const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Dish title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Dish description is required']
    },
    price: {
      type: Number,
      required: [true, 'Dish price is required'],
      min: [0, 'Price must be positive']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Starters', 'Main Course', 'Woodfired & Pasta', 'Chef Specials', 'Desserts', 'Beverages']
    },
    dietaryTags: {
      type: [String],
      default: ['Vegetarian']
    },
    spiceLevel: {
      type: String,
      enum: ['None', 'Mild', 'Medium', 'Fiery'],
      default: 'Mild'
    },
    preparationTime: {
      type: Number, // in minutes
      default: 20
    },
    calories: {
      type: Number,
      default: 450
    },
    imageUrl: {
      type: String,
      required: [true, 'Dish image URL is required']
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4.8
    },
    numReviews: {
      type: Number,
      default: 42
    }
  },
  {
    timestamps: true
  }
);

menuItemSchema.index({ category: 1, isAvailable: 1, isFeatured: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
