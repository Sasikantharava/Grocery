import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateId } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', getCategories);
router.get('/tree', getCategoryTree);
router.get('/:id', validateId, getCategory);

// Admin routes
router.post('/', protect, authorize('admin'), createCategory);
router.put('/:id', protect, authorize('admin'), validateId, updateCategory);
router.delete('/:id', protect, authorize('admin'), validateId, deleteCategory);

export default router;