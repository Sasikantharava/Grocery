import API from './api.js';

export const authService = {
  // Login user
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    return response;
  },

  // Register user
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response;
  },

  // Get current user
  getMe: async () => {
    const response = await API.get('/auth/me');
    return response;
  },

  // Update profile
  updateProfile: async (userData) => {
    const response = await API.put('/auth/profile', userData);
    return response;
  },

  // Logout user
  logout: async () => {
    const response = await API.post('/auth/logout');
    return response;
  },
};

export default authService;