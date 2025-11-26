import User from '../models/User.js';

// Admin authorization middleware
export const adminAuth = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in admin authentication'
    });
  }
};

// Delivery partner authorization middleware
export const deliveryAuth = async (req, res, next) => {
  try {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'delivery')) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Delivery partner privileges required.'
      });
    }
  } catch (error) {
    console.error('Delivery auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in delivery authentication'
    });
  }
};

// Check if user is active
export const checkUserActive = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }
    
    next();
  } catch (error) {
    console.error('Check user active middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking user status'
    });
  }
};