import mongoose from 'mongoose';

const deliveryPartnerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['bike', 'scooter', 'cycle', 'car']
  },
  vehicleNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  licenseNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  currentLocation: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    address: String,
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  currentOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  totalDeliveries: {
    type: Number,
    default: 0
  },
  rating: {
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
  earnings: {
    total: {
      type: Number,
      default: 0
    },
    pending: {
      type: Number,
      default: 0
    },
    paid: {
      type: Number,
      default: 0
    }
  },
  documents: {
    license: {
      public_id: String,
      url: String,
      verified: {
        type: Boolean,
        default: false
      }
    },
    rc: {
      public_id: String,
      url: String,
      verified: {
        type: Boolean,
        default: false
      }
    },
    insurance: {
      public_id: String,
      url: String,
      verified: {
        type: Boolean,
        default: false
      }
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Update location method
deliveryPartnerSchema.methods.updateLocation = function(lat, lng, address = '') {
  this.currentLocation = {
    lat,
    lng,
    address,
    lastUpdated: new Date()
  };
  return this.save();
};

// Assign order method
deliveryPartnerSchema.methods.assignOrder = function(orderId) {
  this.currentOrder = orderId;
  this.isAvailable = false;
  return this.save();
};

// Complete delivery method
deliveryPartnerSchema.methods.completeDelivery = function(amount) {
  this.currentOrder = undefined;
  this.isAvailable = true;
  this.totalDeliveries += 1;
  this.earnings.total += amount;
  this.earnings.pending += amount;
  return this.save();
};

// Update rating method
deliveryPartnerSchema.methods.updateRating = function(newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Check if partner is eligible for delivery
deliveryPartnerSchema.methods.isEligible = function() {
  return this.isOnline && 
         this.isAvailable && 
         this.isVerified && 
         this.isActive;
};

// Index for location-based queries
deliveryPartnerSchema.index({ 
  'currentLocation': '2dsphere',
  isOnline: 1,
  isAvailable: 1 
});

export default mongoose.model('DeliveryPartner', deliveryPartnerSchema);