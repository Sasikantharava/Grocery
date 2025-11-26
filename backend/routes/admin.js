import express from 'express';
import {
  getDashboardStats,
  getSalesAnalytics,
  getLowStockProducts,
  getRecentOrders,
  getTopProducts,
  getUserStats
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/analytics', getSalesAnalytics);
router.get('/dashboard/recent-orders', getRecentOrders);
router.get('/dashboard/top-products', getTopProducts);
router.get('/dashboard/low-stock', getLowStockProducts);
router.get('/dashboard/user-stats', getUserStats);

export default router;