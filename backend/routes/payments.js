import express from 'express';
import {
  createPaymentOrder,
  verifyPayment,
  processWalletPayment,
  getPaymentMethods
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/methods', getPaymentMethods);
router.post('/create-order', createPaymentOrder);
router.post('/verify', verifyPayment);
router.post('/wallet', processWalletPayment);

export default router;