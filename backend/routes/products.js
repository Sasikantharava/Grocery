import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getFeaturedProducts,
  getProductsByCategory
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateProduct, validateReview, validateId } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:categorySlug', getProductsByCategory);
router.get('/:id', validateId, getProduct);

// Protected routes
router.post('/:id/reviews', protect, validateReview, addReview);

// Admin routes
router.post('/', protect, authorize('admin'), validateProduct, createProduct);
router.put('/:id', protect, authorize('admin'), validateId, validateProduct, updateProduct);
router.delete('/:id', protect, authorize('admin'), validateId, deleteProduct);

export default router;