import { body, validationResult, param } from 'express-validator';

// Validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
    // Remove the complex regex validation for now
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    // .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Please provide a valid 10-digit phone number'),
  
  handleValidationErrors
];

// User login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Product validation
export const validateProduct = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('originalPrice')
    .isFloat({ min: 0 })
    .withMessage('Original price must be a positive number'),
  
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  
  body('category')
    .isMongoId()
    .withMessage('Valid category ID is required'),
  
  body('unit')
    .isIn(['kg', 'g', 'l', 'ml', 'piece', 'pack'])
    .withMessage('Invalid unit type'),
  
  body('unitValue')
    .isFloat({ min: 0 })
    .withMessage('Unit value must be a positive number'),
  
  handleValidationErrors
];

// Order validation
export const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  
  body('items.*.product')
    .isMongoId()
    .withMessage('Valid product ID is required for each item'),
  
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  
  body('shippingAddress.name')
    .notEmpty()
    .withMessage('Recipient name is required'),
  
  body('shippingAddress.street')
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required'),
  
  body('shippingAddress.state')
    .notEmpty()
    .withMessage('State is required'),
  
  body('shippingAddress.pinCode')
    .matches(/^\d{6}$/)
    .withMessage('PIN code must be 6 digits'),
  
  body('shippingAddress.phone')
    .matches(/^\d{10}$/)
    .withMessage('Valid 10-digit phone number is required'),
  
  handleValidationErrors
];

// Review validation
export const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters'),
  
  handleValidationErrors
];

// Coupon validation
export const validateCoupon = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Coupon code is required')
    .isLength({ max: 20 })
    .withMessage('Coupon code cannot exceed 20 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Coupon description is required'),
  
  body('discountType')
    .isIn(['percentage', 'fixed'])
    .withMessage('Discount type must be either percentage or fixed'),
  
  body('discountValue')
    .isFloat({ min: 0 })
    .withMessage('Discount value must be a positive number'),
  
  body('minOrderValue')
    .isFloat({ min: 0 })
    .withMessage('Minimum order value must be a positive number'),
  
  body('validFrom')
    .isISO8601()
    .withMessage('Valid from must be a valid date'),
  
  body('validUntil')
    .isISO8601()
    .withMessage('Valid until must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.validFrom)) {
        throw new Error('Valid until must be after valid from');
      }
      return true;
    }),
  
  handleValidationErrors
];

// MongoDB ID parameter validation
export const validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  
  handleValidationErrors
];