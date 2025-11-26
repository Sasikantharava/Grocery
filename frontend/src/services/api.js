import axios from 'axios';
import { store } from '../store/index.js'; // Changed from '../store.js'
import { logout } from '../store/authSlice.js';

// Create axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://grocery-rdyv.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Handle unauthorized access
      if (status === 401) {
        localStorage.removeItem('token');
        store.dispatch(logout());
        window.location.href = '/login';
      }
      
      // Handle other errors
      if (data.message) {
        console.error('API Error:', data.message);
      }
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default API;