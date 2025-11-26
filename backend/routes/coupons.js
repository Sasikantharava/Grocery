import express from 'express';
import {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon
} from '../controllers/couponController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateCoupon as validateCouponData, validateId } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/validate/:code', validateCoupon);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin'));

router.get('/', getCoupons);
router.get('/:id', validateId, getCoupon);
router.post('/', validateCouponData, createCoupon);
router.put('/:id', validateId, validateCouponData, updateCoupon);
router.delete('/:id', validateId, deleteCoupon);

export default router;