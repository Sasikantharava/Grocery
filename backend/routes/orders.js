import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getOrderTracking,
  updateDeliveryLocation
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateOrder, validateId } from '../middleware/validation.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// User routes
router.post('/', validateOrder, createOrder);
router.get('/', getOrders);
router.get('/:id', validateId, getOrder);
router.patch('/:id/cancel', validateId, cancelOrder);
router.get('/:id/tracking', validateId, getOrderTracking);

// Admin/Delivery routes
router.patch('/:id/status', authorize('admin', 'delivery'), validateId, updateOrderStatus);
router.patch('/:id/location', authorize('delivery'), validateId, updateDeliveryLocation);

export default router;