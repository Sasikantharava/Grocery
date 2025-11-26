import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subCategory: String,
  brand: String,
  images: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],
  stock: {
    type: Number,
    required: [true, 'Please provide product stock'],
    min: [0, 'Stock cannot be negative']
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'g', 'l', 'ml', 'piece', 'pack']
  },
  unitValue: {
    type: Number,
    required: true
  },
  tags: [String],
  features: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  expiryDate: Date,
  isVegetarian: {
    type: Boolean,
    default: true
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lowStockAlert: {
    type: Number,
    default: 10
  },
  featured: {
    type: Boolean,
    default: false
  },
  deliveryTime: {
    type: Number,
    default: 30, // minutes
    min: 10,
    max: 120
  }
}, {
  timestamps: true
});

// Calculate discount percentage virtual
productSchema.virtual('discountPercentage').get(function() {
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

// Update average rating when reviews are modified
productSchema.methods.updateRatings = function() {
  if (this.reviews.length > 0) {
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.ratings.average = (total / this.reviews.length).toFixed(1);
    this.ratings.count = this.reviews.length;
  } else {
    this.ratings.average = 0;
    this.ratings.count = 0;
  }
};

// Index for search functionality
productSchema.index({ 
  name: 'text', 
  description: 'text', 
  brand: 'text', 
  tags: 'text' 
});

productSchema.index({ category: 1, price: 1 });
productSchema.index({ featured: 1, createdAt: -1 });

export default mongoose.model('Product', productSchema);