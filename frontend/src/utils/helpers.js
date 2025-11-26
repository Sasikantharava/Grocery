/**
 * Format currency with proper localization
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'INR')
 * @param {object} options - Additional formatting options
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'INR', options = {}) => {
  const defaultOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options
  };
  
  try {
    return new Intl.NumberFormat('en-IN', defaultOptions).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currency} ${amount}`;
  }
};

/**
 * Format date with proper localization
 * @param {Date|string} date - The date to format
 * @param {object} options - Additional formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  try {
    return dateObj.toLocaleDateString('en-IN', defaultOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateObj.toString();
  }
};

/**
 * Format time with proper localization
 * @param {Date|string} date - The date to format
 * @param {object} options - Additional formatting options
 * @returns {string} Formatted time string
 */
export const formatTime = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  try {
    return dateObj.toLocaleTimeString('en-IN', defaultOptions);
  } catch (error) {
    console.error('Error formatting time:', error);
    return dateObj.toString();
  }
};

/**
 * Format date and time together
 * @param {Date|string} date - The date to format
 * @param {object} options - Additional formatting options
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  try {
    return dateObj.toLocaleString('en-IN', options);
  } catch (error) {
    console.error('Error formatting date time:', error);
    return dateObj.toString();
  }
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - The original price
 * @param {number} sellingPrice - The selling price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, sellingPrice) => {
  if (!originalPrice || originalPrice <= 0 || !sellingPrice || sellingPrice <= 0) return 0;
  if (originalPrice <= sellingPrice) return 0;
  
  return Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);
};

/**
 * Generate a unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} Unique ID
 */
export const generateId = (prefix = '') => {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 * @param {Function} func - The function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
  /**
   * Get item from local storage
   * @param {string} key - The key to retrieve
   * @returns {any|null} The stored value or null
   */
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  },
  
  /**
   * Set item in local storage
   * @param {string} key - The key to set
   * @param {any} value - The value to store
   * @returns {boolean} Success status
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting to localStorage:', error);
      return false;
    }
  },
  
  /**
   * Remove item from local storage
   * @param {string} key - The key to remove
   * @returns {boolean} Success status
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },
  
  /**
   * Clear all items from local storage
   * @returns {boolean} Success status
   */
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
  
  /**
   * Check if local storage is available
   * @returns {boolean} Availability status
   */
  isAvailable: () => {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
};

/**
 * Session storage helpers with error handling
 */
export const sessionStorage = {
  get: (key) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting from sessionStorage:', error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting to sessionStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  },
  
  isAvailable: () => {
    try {
      const test = '__test__';
      window.sessionStorage.setItem(test, test);
      window.sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
};

/**
 * URL helpers with error handling
 */
export const urlHelpers = {
  /**
   * Add parameters to URL
   * @param {string} url - Base URL
   * @param {object} params - Parameters to add
   * @returns {string} URL with parameters
   */
  addParams: (url, params) => {
    try {
      const urlObj = new URL(url, window.location.origin);
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          urlObj.searchParams.set(key, params[key]);
        }
      });
      return urlObj.toString();
    } catch (error) {
      console.error('Error adding params to URL:', error);
      return url;
    }
  },
  
  /**
   * Get parameters from URL
   * @param {string} url - URL to parse
   * @returns {object} URL parameters
   */
  getParams: (url = window.location.href) => {
    try {
      const urlObj = new URL(url);
      const params = {};
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    } catch (error) {
      console.error('Error getting params from URL:', error);
      return {};
    }
  },
  
  /**
   * Remove parameters from URL
   * @param {string} url - Base URL
   * @param {array} paramsToRemove - Parameters to remove
   * @returns {string} URL without specified parameters
   */
  removeParams: (url, paramsToRemove) => {
    try {
      const urlObj = new URL(url, window.location.origin);
      paramsToRemove.forEach(param => {
        urlObj.searchParams.delete(param);
      });
      return urlObj.toString();
    } catch (error) {
      console.error('Error removing params from URL:', error);
      return url;
    }
  },
  
  /**
   * Build a URL from path and params
   * @param {string} path - URL path
   * @param {object} params - URL parameters
   * @returns {string} Complete URL
   */
  build: (path, params = {}) => {
    try {
      const url = new URL(path, window.location.origin);
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          url.searchParams.set(key, params[key]);
        }
      });
      return url.toString();
    } catch (error) {
      console.error('Error building URL:', error);
      return path;
    }
  }
};

/**
 * String manipulation helpers
 */
export const stringHelpers = {
  /**
   * Capitalize first letter of a string
   * @param {string} str - String to capitalize
   * @returns {string} Capitalized string
   */
  capitalize: (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  /**
   * Truncate string to specified length
   * @param {string} str - String to truncate
   * @param {number} length - Maximum length
   * @param {string} suffix - Suffix to add (default: '...')
   * @returns {string} Truncated string
   */
  truncate: (str, length = 50, suffix = '...') => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substr(0, length) + suffix;
  },
  
  /**
   * Convert string to slug
   * @param {string} text - Text to convert
   * @returns {string} Slugified string
   */
  slugify: (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
  
  /**
   * Convert camelCase to Title Case
   * @param {string} str - String to convert
   * @returns {string} Title case string
   */
  camelToTitle: (str) => {
    if (!str) return '';
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  },
  
  /**
   * Generate random string
   * @param {number} length - Length of string
   * @returns {string} Random string
   */
  random: (length = 10) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  },
  
  /**
   * Check if string is empty or whitespace
   * @param {string} str - String to check
   * @returns {boolean} Whether string is empty
   */
  isEmpty: (str) => {
    return !str || str.trim().length === 0;
  },
  
  /**
   * Convert string to title case
   * @param {string} str - String to convert
   * @returns {string} Title case string
   */
  toTitleCase: (str) => {
    if (!str) return '';
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
};

/**
 * Number manipulation helpers
 */
export const numberHelpers = {
  /**
   * Format number with proper localization
   * @param {number} num - Number to format
   * @param {object} options - Formatting options
   * @returns {string} Formatted number
   */
  format: (num, options = {}) => {
    try {
      return new Intl.NumberFormat('en-IN', options).format(num);
    } catch (error) {
      console.error('Error formatting number:', error);
      return num.toString();
    }
  },
  
  /**
   * Round number to specified decimal places
   * @param {number} num - Number to round
   * @param {number} decimals - Decimal places
   * @returns {number} Rounded number
   */
  round: (num, decimals = 2) => {
    if (isNaN(num)) return 0;
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
  
  /**
   * Generate random number between min and max
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  random: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  /**
   * Check if value is a number
   * @param {any} value - Value to check
   * @returns {boolean} Whether value is a number
   */
  isNumber: (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  
  /**
   * Convert number to words
   * @param {number} num - Number to convert
   * @returns {string} Number in words
   */
  toWords: (num) => {
    if (isNaN(num)) return '';
    
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', '', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const thousands = ['', 'thousand', 'million', 'billion', 'trillion'];
    
    let numStr = Math.floor(num).toString();
    let result = '';
    
    if (numStr.length > 3) {
      const thousand = Math.floor(numStr.length / 3);
      result = thousands[thousand] + ' ';
      numStr = numStr.substring(numStr.length % 3);
    }
    
    if (numStr.length > 0) {
      const num = parseInt(numStr);
      
      if (num < 20) {
        result += (num < 10 ? ones[num] : tens[Math.floor(num / 10)]);
      } else {
        result += tens[Math.floor(num / 10)];
        result += ' ' + ones[num % 10];
      }
    }
    
    return result;
  }
};

/**
 * Array manipulation helpers
 */
export const arrayHelpers = {
  /**
   * Shuffle array elements
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  shuffle: (array) => {
    if (!Array.isArray(array)) return [];
    
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
  
  /**
   * Get unique elements from array
   * @param {Array} array - Array to process
   * @param {string|Function} key - Property key or comparison function
   * @returns {Array} Array with unique elements
   */
  unique: (array, key) => {
    if (!Array.isArray(array)) return [];
    
    if (!key) {
      return [...new Set(array)];
    }
    
    const seen = new Set();
    return array.filter(item => {
      const value = typeof key === 'function' ? key(item) : item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  },
  
  /**
   * Chunk array into smaller arrays
   * @param {Array} array - Array to chunk
   * @param {number} size - Chunk size
   * @returns {Array} Array of chunks
   */
  chunk: (array, size) => {
    if (!Array.isArray(array)) return [];
    
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },
  
  /**
   * Group array elements by a key
   * @param {Array} array - Array to group
   * @param {string|Function} key - Property key or grouping function
   * @returns {Object} Grouped object
   */
  groupBy: (array, key) => {
    if (!Array.isArray(array)) return {};
    
    return array.reduce((result, item) => {
      const groupKey = typeof key === 'function' ? key(item) : item[key];
      
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      result[groupKey].push(item);
      return result;
    }, {});
  },
  
  /**
   * Sort array by a key
   * @param {Array} array - Array to sort
   * @param {string|Function} key - Property key or comparison function
   * @param {string} order - Sort order ('asc' or 'desc')
   * @returns {Array} Sorted array
   */
  sortBy: (array, key, order = 'asc') => {
    if (!Array.isArray(array)) return [];
    
    return [...array].sort((a, b) => {
      let valueA = typeof key === 'function' ? key(a) : a[key];
      let valueB = typeof key === 'function' ? key(b) : b[key];
      
      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
};

/**
 * Object manipulation helpers
 */
export const objectHelpers = {
  /**
   * Deep clone an object
   * @param {Object} obj - Object to clone
   * @returns {Object} Cloned object
   */
  deepClone: (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => objectHelpers.deepClone(item));
    
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = objectHelpers.deepClone(obj[key]);
      }
    }
    return clonedObj;
  },
  
  /**
   * Check if object is empty
   * @param {Object} obj - Object to check
   * @returns {boolean} Whether object is empty
   */
  isEmpty: (obj) => {
    if (obj == null) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    return Object.keys(obj).length === 0;
  },
  
  /**
   * Pick specific properties from an object
   * @param {Object} obj - Source object
   * @param {Array} keys - Keys to pick
   * @returns {Object} Object with picked properties
   */
  pick: (obj, keys) => {
    if (!obj || !Array.isArray(keys)) return {};
    
    const result = {};
    keys.forEach(key => {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
    });
    return result;
  },
  
  /**
   * Omit specific properties from an object
   * @param {Object} obj - Source object
   * @param {Array} keys - Keys to omit
   * @returns {Object} Object without omitted properties
   */
  omit: (obj, keys) => {
    if (!obj || !Array.isArray(keys)) return obj;
    
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },
  
  /**
   * Merge objects
   * @param {...Object} objects - Objects to merge
   * @returns {Object} Merged object
   */
  merge: (...objects) => {
    return objects.reduce((result, obj) => {
      return { ...result, ...obj };
    }, {});
  }
};

/**
 * Validation helpers
 */
export const validationHelpers = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  isEmail: (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @param {string} country - Country code for validation rules
   * @returns {boolean} Whether phone is valid
   */
  isPhone: (phone, country = 'IN') => {
    if (!phone) return false;
    
    // Indian phone number validation
    if (country === 'IN') {
      const phoneRegex = /^\+91[6-9]\d{9}$/;
      return phoneRegex.test(phone);
    }
    
    // Generic phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  },
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} Password strength details
   */
  getPasswordStrength: (password) => {
    if (!password) return { score: 0, feedback: 'Empty password' };
    
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Password should be at least 8 characters');
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Password should contain at least one lowercase letter');
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Password should contain at least one uppercase letter');
    }
    
    // Number check
    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Password should contain at least one number');
    }
    
    // Special character check
    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Password should contain at least one special character');
    }
    
    let strength = 'Weak';
    if (score >= 4) strength = 'Strong';
    else if (score >= 3) strength = 'Medium';
    else if (score >= 2) strength = 'Fair';
    
    return { score, strength, feedback };
  },
  
  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} Whether URL is valid
   */
  isUrl: (url) => {
    if (!url) return false;
    
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  /**
   * Validate PIN code format
   * @param {string} pinCode - PIN code to validate
   * @param {string} country - Country code for validation rules
   * @returns {boolean} Whether PIN code is valid
   */
  isPinCode: (pinCode, country = 'IN') => {
    if (!pinCode) return false;
    
    // Indian PIN code validation (6 digits)
    if (country === 'IN') {
      const pinCodeRegex = /^\d{6}$/;
      return pinCodeRegex.test(pinCode);
    }
    
    // Generic PIN validation (5-8 digits)
    const pinCodeRegex = /^\d{5,8}$/;
    return pinCodeRegex.test(pinCode);
  },
  
  /**
   * Validate required fields
   * @param {Object} data - Data object with fields
   * @param {Array} requiredFields - Array of required field names
   * @returns {object} Validation result
   */
  validateRequired: (data, requiredFields) => {
    const errors = {};
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors[field] = `${field} is required`;
        isValid = false;
      }
    });
    
    return { isValid, errors };
  }
};

/**
 * Date manipulation helpers
 */
export const dateHelpers = {
  /**
   * Check if date is today
   * @param {Date|string} date - Date to check
   * @returns {boolean} Whether date is today
   */
  isToday: (date) => {
    const today = new Date();
    const compareDate = new Date(date);
    return today.toDateString() === compareDate.toDateString();
  },
  
  /**
   * Check if date is yesterday
   * @param {Date|string} date - Date to check
   * @returns {boolean} Whether date is yesterday
   */
  isYesterday: (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const compareDate = new Date(date);
    return yesterday.toDateString() === compareDate.toDateString();
  },
  
  /**
   * Add days to a date
   * @param {Date|string} date - Original date
   * @param {number} days - Number of days to add
   * @returns {Date} New date
   */
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  
  /**
   * Calculate difference in minutes between two dates
   * @param {Date|string} date1 - First date
   * @param {Date|string} date2 - Second date
   * @returns {number} Difference in minutes
   */
  differenceInMinutes: (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.abs(d1 - d2) / (1000 * 60);
  },
  
  /**
   * Calculate difference in days between two dates
   * @param {Date|string} date1 - First date
   * @param {Date|string} date2 - Second date
   * @returns {number} Difference in days
   */
  differenceInDays: (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },
  
  /**
   * Get relative time string (e.g., "2 hours ago")
   * @param {Date|string} date - Date to format
   * @returns {string} Relative time string
   */
  getRelativeTime: (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) {
      return 'just now';
    } else if (diffMins < 60) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return formatDate(date);
    }
  }
};

/**
 * Device and browser detection helpers
 */
export const deviceHelpers = {
  /**
   * Check if device is mobile
   * @returns {boolean} Whether device is mobile
   */
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  
  /**
   * Check if device is tablet
   * @returns {boolean} Whether device is tablet
   */
  isTablet: () => {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
  },
  
  /**
   * Check if device is desktop
   * @returns {boolean} Whether device is desktop
   */
  isDesktop: () => {
    return !deviceHelpers.isMobile() && !deviceHelpers.isTablet();
  },
  
  /**
   * Get browser name
   * @returns {string} Browser name
   */
  getBrowser: () => {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    else if (userAgent.indexOf("Safari") > -1) return "Safari";
    else if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    else if (userAgent.indexOf("MSIE") > -1) return "IE";
    else return "Unknown";
  },
  
  /**
   * Get operating system
   * @returns {string} Operating system name
   */
  getOS: () => {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Win") > -1) return "Windows";
    else if (userAgent.indexOf("Mac") > -1) return "MacOS";
    else if (userAgent.indexOf("Linux") > -1) return "Linux";
    else if (userAgent.indexOf("Android") > -1) return "Android";
    else if (userAgent.indexOf("iOS") > -1) return "iOS";
    else return "Unknown";
  }
};

/**
 * Image processing helpers
 */
export const imageHelpers = {
  /**
   * Get image dimensions from URL
   * @param {string} url - Image URL
   * @returns {Promise} Promise with image dimensions
   */
  getDimensions: (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  },
  
  /**
   * Compress image
   * @param {File} file - Image file
   * @param {number} quality - Compression quality (0-1)
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   * @returns {Promise} Promise with compressed image
   */
  compress: (file, quality = 0.8, maxWidth = 1024, maxHeight = 1024) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
};

export default {
  formatCurrency,
  formatDate,
  formatTime,
  formatDateTime,
  calculateDiscount,
  generateId,
  debounce,
  throttle,
  storage,
  sessionStorage,
  urlHelpers,
  stringHelpers,
  numberHelpers,
  arrayHelpers,
  objectHelpers,
  validationHelpers,
  dateHelpers,
  deviceHelpers,
  imageHelpers
};