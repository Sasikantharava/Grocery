/**
 * Application configuration
 */
export const APP_CONFIG = {
  name: 'FreshMart',
  version: '1.0.0',
  description: 'Grocery Delivery App',
  supportEmail: 'support@freshmart.com',
  supportPhone: '+1 (555) 123-4567',
  website: 'https://freshmart.com',
  author: 'FreshMart Team',
  copyright: `© ${new Date().getFullYear()} FreshMart. All rights reserved.`,
  
  // App behavior settings
  settings: {
    autoLogoutTime: 30 * 60 * 1000, // 30 minutes in ms
    sessionTimeout: 15 * 60 * 1000, // 15 minutes in ms
    maxLoginAttempts: 5,
    passwordMinLength: 6,
    cartMaxQuantity: 10,
    searchDebounceTime: 500,
    imageUploadMaxSize: 5 * 1024 * 1024, // 5MB
    imageUploadFormats: ['jpg', 'jpeg', 'png', 'webp'],
    paginationPageSize: 12
  },
  
  // Feature flags
  features: {
    enableWallet: true,
    enableLoyaltyPoints: true,
    enableScheduledDelivery: true,
    enableGuestCheckout: false,
    enableSocialLogin: true,
    enablePushNotifications: true,
    enableLocationServices: true,
    enableDarkMode: false,
    enableHighContrastMode: true
  },
  
  // API configuration
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'https://api.freshmart.com',
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000
  },
  
  // Cache configuration
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes in ms
    maxSize: 50, // Maximum number of cached items
    strategy: 'lru' // 'lru', 'fifo', 'lifo'
  }
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification'
  },
  PRODUCTS: {
    LIST: '/products',
    FEATURED: '/products/featured',
    TRENDING: '/products/trending',
    DEALS: '/products/deals',
    SINGLE: '/products/:id',
    REVIEWS: '/products/:id/reviews',
    ADD_REVIEW: '/products/:id/reviews',
    CATEGORY: '/products/category/:slug',
    SEARCH: '/products/search',
    SIMILAR: '/products/:id/similar',
    RECOMMENDED: '/products/recommended'
  },
  CATEGORIES: {
    LIST: '/categories',
    TREE: '/categories/tree',
    FEATURED: '/categories/featured'
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    UPDATE: '/cart/items/:productId',
    REMOVE: '/cart/items/:productId',
    CLEAR: '/cart/clear',
    APPLY_COUPON: '/cart/coupon',
    REMOVE_COUPON: '/cart/coupon',
    ESTIMATE: '/cart/estimate'
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    SINGLE: '/orders/:id',
    TRACKING: '/orders/:id/tracking',
    CANCEL: '/orders/:id/cancel',
    RETURN: '/orders/:id/return',
    REORDER: '/orders/:id/reorder',
    INVOICE: '/orders/:id/invoice'
  },
  PAYMENTS: {
    METHODS: '/payments/methods',
    CREATE_ORDER: '/payments/create-order',
    VERIFY: '/payments/verify/:id',
    WALLET_BALANCE: '/payments/wallet/balance',
    WALLET_TRANSACTIONS: '/payments/wallet/transactions',
    WALLET_TOPUP: '/payments/wallet/topup'
  },
  ADDRESSES: {
    LIST: '/addresses',
    CREATE: '/addresses',
    UPDATE: '/addresses/:id',
    DELETE: '/addresses/:id',
    SET_DEFAULT: '/addresses/:id/default'
  },
  WISHLIST: {
    LIST: '/wishlist',
    ADD: '/wishlist/items',
    REMOVE: '/wishlist/items/:productId',
    CLEAR: '/wishlist/clear'
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/read-all',
    PREFERENCES: '/notifications/preferences'
  },
  UPLOADS: {
    IMAGE: '/uploads/image',
    DOCUMENT: '/uploads/document'
  }
};

/**
 * Product categories with enhanced metadata
 */
export const PRODUCT_CATEGORIES = [
  { 
    id: 'fruits', 
    name: 'Fruits', 
    slug: 'fruits',
    icon: '🍎',
    color: '#ef4444',
    description: 'Fresh and juicy fruits',
    featured: true
  },
  { 
    id: 'vegetables', 
    name: 'Vegetables', 
    slug: 'vegetables',
    icon: '🥦',
    color: '#22c55e',
    description: 'Farm-fresh vegetables',
    featured: true
  },
  { 
    id: 'dairy', 
    name: 'Dairy & Eggs', 
    slug: 'dairy',
    icon: '🥛',
    color: '#3b82f6',
    description: 'Milk, cheese, eggs and more',
    featured: true
  },
  { 
    id: 'bakery', 
    name: 'Bakery', 
    slug: 'bakery',
    icon: '🍞',
    color: '#f59e0b',
    description: 'Fresh bread and baked goods',
    featured: false
  },
  { 
    id: 'beverages', 
    name: 'Beverages', 
    slug: 'beverages',
    icon: '🥤',
    color: '#06b6d4',
    description: 'Cold drinks, juices and more',
    featured: false
  },
  { 
    id: 'snacks', 
    name: 'Snacks', 
    slug: 'snacks',
    icon: '🍿',
    color: '#8b5cf6',
    description: 'Savory and sweet snacks',
    featured: false
  },
  { 
    id: 'meat', 
    name: 'Meat & Fish', 
    slug: 'meat',
    icon: '🍗',
    color: '#dc2626',
    description: 'Fresh meat and seafood',
    featured: false
  },
  { 
    id: 'frozen', 
    name: 'Frozen Foods', 
    slug: 'frozen',
    icon: '🧊',
    color: '#0ea5e9',
    description: 'Frozen ready-to-eat meals',
    featured: false
  },
  { 
    id: 'personal', 
    name: 'Personal Care', 
    slug: 'personal',
    icon: '🧴',
    color: '#ec4899',
    description: 'Personal care and hygiene products',
    featured: false
  },
  { 
    id: 'household', 
    name: 'Household', 
    slug: 'household',
    icon: '🧹',
    color: '#6366f1',
    description: 'Cleaning and household supplies',
    featured: false
  }
];

/**
 * Order statuses with colors and icons
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out-for-delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
  REFUNDED: 'refunded'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.PREPARING]: 'Preparing',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.RETURNED]: 'Returned',
  [ORDER_STATUS.REFUNDED]: 'Refunded'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: '#f59e0b',
  [ORDER_STATUS.CONFIRMED]: '#3b82f6',
  [ORDER_STATUS.PREPARING]: '#8b5cf6',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: '#06b6d4',
  [ORDER_STATUS.DELIVERED]: '#10b981',
  [ORDER_STATUS.CANCELLED]: '#ef4444',
  [ORDER_STATUS.RETURNED]: '#f97316',
  [ORDER_STATUS.REFUNDED]: '#6b7280'
};

/**
 * Payment methods with icons and descriptions
 */
export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  WALLET: 'wallet',
  NETBANKING: 'netbanking',
  COD: 'cod',
  PAYPAL: 'paypal',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card'
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CARD]: 'Credit/Debit Card',
  [PAYMENT_METHODS.UPI]: 'UPI',
  [PAYMENT_METHODS.WALLET]: 'Wallet',
  [PAYMENT_METHODS.NETBANKING]: 'Net Banking',
  [PAYMENT_METHODS.COD]: 'Cash on Delivery',
  [PAYMENT_METHODS.PAYPAL]: 'PayPal',
  [PAYMENT_METHODS.CREDIT_CARD]: 'Credit Card',
  [PAYMENT_METHODS.DEBIT_CARD]: 'Debit Card'
};

/**
 * Delivery settings with time slots
 */
export const DELIVERY_CONFIG = {
  FREE_DELIVERY_THRESHOLD: 500,
  DELIVERY_FEE: 40,
  MIN_DELIVERY_TIME: 30, // minutes
  MAX_DELIVERY_TIME: 45, // minutes
  SCHEDULING_DAYS: 3, // days in advance
  TIME_SLOTS: [
    { id: 'morning', label: 'Morning (8AM - 12PM)', start: '08:00', end: '12:00' },
    { id: 'afternoon', label: 'Afternoon (12PM - 5PM)', start: '12:00', end: '17:00' },
    { id: 'evening', label: 'Evening (5PM - 9PM)', start: '17:00', end: '21:00' }
  ],
  DELIVERY_AREAS: [
    { id: 'north', name: 'North Mumbai', pinCodes: ['400001', '400002', '400003'] },
    { id: 'south', name: 'South Mumbai', pinCodes: ['400004', '400005', '400006'] },
    { id: 'east', name: 'East Mumbai', pinCodes: ['400007', '400008', '400009'] },
    { id: 'west', name: 'West Mumbai', pinCodes: ['400010', '400011', '400012'] }
  ]
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user',
  CART_DATA: 'cart',
  WISHLIST_DATA: 'wishlist',
  RECENT_SEARCHES: 'recent_searches',
  THEME_PREFERENCE: 'theme',
  LANGUAGE_PREFERENCE: 'language',
  NOTIFICATION_PERMISSION: 'notification_permission',
  LOCATION_PERMISSION: 'location_permission',
  LAST_LOGIN: 'last_login',
  APP_VERSION: 'app_version'
};

/**
 * Error messages with codes
 */
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

export const ERROR_MESSAGES = {
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection.',
  [ERROR_CODES.UNAUTHORIZED]: 'Please login to continue.',
  [ERROR_CODES.FORBIDDEN]: 'You do not have permission to perform this action.',
  [ERROR_CODES.NOT_FOUND]: 'The requested resource was not found.',
  [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
  [ERROR_CODES.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  [ERROR_CODES.UNKNOWN_ERROR]: 'An unknown error occurred. Please try again.'
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  ORDER_CANCELLED: 'Order cancelled successfully!',
  ITEM_ADDED: 'Item added to cart!',
  ITEM_REMOVED: 'Item removed from cart!',
  CART_CLEARED: 'Cart cleared successfully!',
  COUPON_APPLIED: 'Coupon applied successfully!',
  ADDRESS_ADDED: 'Address added successfully!',
  ADDRESS_UPDATED: 'Address updated successfully!',
  ADDRESS_DELETED: 'Address deleted successfully!',
  REVIEW_ADDED: 'Review added successfully!',
  WISHLIST_ADDED: 'Item added to wishlist!',
  WISHLIST_REMOVED: 'Item removed from wishlist!'
};

/**
 * Validation patterns with country-specific rules
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: {
    IN: /^\+91[6-9]\d{9}$/,
    US: /^\+1\d{10}$/,
    UK: /^\+44\d{10}$/,
    DEFAULT: /^\d{10}$/
  },
  PIN_CODE: {
    IN: /^\d{6}$/,
    US: /^\d{5}$/,
    DEFAULT: /^\d{5,8}$/
  },
  CARD_NUMBER: /^\d{16}$/,
  CVV: /^\d{3,4}$/,
  PASSWORD: {
    MIN_LENGTH: 6,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true
  },
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  NAME: /^[a-zA-Z\s]{2,50}$/
};

/**
 * Default values and limits
 */
export const DEFAULTS = {
  AVATAR: '/images/default-avatar.png',
  PRODUCT_IMAGE: '/images/default-product.png',
  CATEGORY_IMAGE: '/images/default-category.png',
  PAGE_SIZE: 12,
  MAX_QUANTITY: 10,
  MIN_ORDER_VALUE: 100,
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
  SUPPORTED_VIDEO_FORMATS: ['mp4', 'webm'],
  MAX_ADDRESS_COUNT: 5,
  MAX_WISHLIST_COUNT: 50,
  SEARCH_HISTORY_COUNT: 10,
  NOTIFICATION_DISPLAY_COUNT: 5
};

/**
 * Social media configuration
 */
export const SOCIAL_MEDIA = {
  GOOGLE: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: 'profile email',
    redirectUri: `${window.location.origin}/auth/google/callback`
  },
  FACEBOOK: {
    appId: process.env.REACT_APP_FACEBOOK_APP_ID,
    scope: 'email',
    redirectUri: `${window.location.origin}/auth/facebook/callback`
  },
  TWITTER: {
    apiKey: process.env.REACT_APP_TWITTER_API_KEY,
    redirectUri: `${window.location.origin}/auth/twitter/callback`
  }
};

/**
 * Theme configuration
 */
export const THEME_CONFIG = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
  STORAGE_KEY: 'theme',
  DEFAULT: THEME_CONFIG.AUTO
};

/**
 * Language configuration
 */
export const LANGUAGE_CONFIG = {
  EN: 'en',
  HI: 'hi',
  STORAGE_KEY: 'language',
  DEFAULT: LANGUAGE_CONFIG.EN,
  SUPPORTED: [
    { code: LANGUAGE_CONFIG.EN, name: 'English', flag: '🇺🇸' },
    { code: LANGUAGE_CONFIG.HI, name: 'हिन्दी', flag: '🇮🇳' }
  ]
};

/**
 * Notification types
 */
export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PROMOTION: 'promotion',
  SYSTEM: 'system',
  PAYMENT: 'payment',
  DELIVERY: 'delivery'
};

/**
 * Notification channels
 */
export const NOTIFICATION_CHANNELS = {
  PUSH: 'push',
  EMAIL: 'email',
  SMS: 'sms',
  IN_APP: 'in_app'
};

export default {
  APP_CONFIG,
  API_ENDPOINTS,
  PRODUCT_CATEGORIES,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  DELIVERY_CONFIG,
  STORAGE_KEYS,
  ERROR_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_PATTERNS,
  DEFAULTS,
  SOCIAL_MEDIA,
  THEME_CONFIG,
  LANGUAGE_CONFIG,
  NOTIFICATION_TYPES,
  NOTIFICATION_CHANNELS
};