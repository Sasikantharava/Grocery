import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  logout
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
// import { validateRegister, validateLogin } from '../middleware/validation.js'; // COMMENT THIS OUT

const router = express.Router();

// Public routes - WITHOUT validation
router.post('/register', register); // Remove validateRegister
router.post('/login', login); // Remove validateLogin

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', protect, logout);

export default router;