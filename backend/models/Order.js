import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    image: String,
    unit: String,
    unitValue: Number
  }],
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    pinCode: String,
    phone: String,
    landmark: String
  },
  paymentInfo: {
    method: {
      type: String,
      enum: ['card', 'upi', 'wallet', 'cod', 'netbanking'],
      required: true
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  orderStatus: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'preparing',
      'out-for-delivery',
      'delivered',
      'cancelled',
      'returned'
    ],
    default: 'pending'
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPartner'
  },
  tracking: {
    currentLocation: {
      lat: Number,
      lng: Number,
      address: String
    },
    estimatedDelivery: Date,
    deliveredAt: Date
  },
  priceSummary: {
    itemsTotal: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    couponDiscount: {
      type: Number,
      default: 0
    },
    grandTotal: {
      type: Number,
      required: true
    },
    walletUsed: {
      type: Number,
      default: 0
    }
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon'
  },
  deliveryInstructions: String,
  cancellationReason: String,
  refundAmount: Number,
  isRated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Generate order ID before saving
orderSchema.pre('save', async function(next) {
  if (!this.orderId) {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderId = `ORD${timestamp}${random}`;
  }
  next();
});

// Calculate estimated delivery time
orderSchema.methods.calculateEstimatedDelivery = function() {
  const deliveryTime = Math.max(...this.items.map(item => 
    item.product?.deliveryTime || 30
  ));
  this.tracking.estimatedDelivery = new Date(Date.now() + deliveryTime * 60000);
};

// Update order status with timestamps
orderSchema.methods.updateStatus = function(newStatus) {
  this.orderStatus = newStatus;
  
  if (newStatus === 'delivered') {
    this.tracking.deliveredAt = new Date();
  }
};

// Virtual for isDelivered
orderSchema.virtual('isDelivered').get(function() {
  return this.orderStatus === 'delivered';
});

// Virtual for isCancelled
orderSchema.virtual('isCancelled').get(function() {
  return this.orderStatus === 'cancelled';
});

// Index for efficient queries
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderId: 1 });
orderSchema.index({ 'paymentInfo.status': 1 });
orderSchema.index({ orderStatus: 1 });

export default mongoose.model('Order', orderSchema);