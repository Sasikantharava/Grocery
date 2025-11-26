import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate total price virtual
cartSchema.virtual('totalPrice').get(function() {
  return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Calculate total items virtual
cartSchema.virtual('totalItems').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Update lastUpdated on save
cartSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Check if product already exists in cart
cartSchema.methods.itemExists = function(productId) {
  return this.items.some(item => item.product.toString() === productId.toString());
};

// Get item by product ID
cartSchema.methods.getItem = function(productId) {
  return this.items.find(item => item.product.toString() === productId.toString());
};

// Update item quantity
cartSchema.methods.updateQuantity = function(productId, quantity) {
  const item = this.getItem(productId);
  if (item) {
    item.quantity = quantity;
    item.addedAt = new Date();
  }
};

// Remove item from cart
cartSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item => item.product.toString() !== productId.toString());
};

// Clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.coupon = undefined;
};

export default mongoose.model('Cart', cartSchema);