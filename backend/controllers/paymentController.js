import Order from '../models/Order.js';
import Wallet from '../models/Wallet.js';
import { createRazorpayOrder, validateWebhookSignature } from '../config/razorpay.js';

// @desc    Get available payment methods
// @route   GET /api/payments/methods
// @access  Private
export const getPaymentMethods = async (req, res) => {
  try {
    const methods = [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        description: 'Pay using your credit or debit card',
        icon: '💳',
        available: true
      },
      {
        id: 'upi',
        name: 'UPI',
        description: 'Pay using UPI apps like Google Pay, PhonePe',
        icon: '📱',
        available: true
      },
      {
        id: 'wallet',
        name: 'Wallet',
        description: 'Pay using your wallet balance',
        icon: '💰',
        available: true
      },
      {
        id: 'netbanking',
        name: 'Net Banking',
        description: 'Pay using net banking',
        icon: '🏦',
        available: true
      },
      {
        id: 'cod',
        name: 'Cash on Delivery',
        description: 'Pay when you receive your order',
        icon: '💵',
        available: true,
        minOrder: 0,
        maxOrder: 2000
      }
    ];

    res.json({
      success: true,
      data: methods
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment methods',
      error: error.message
    });
  }
};

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
export const createPaymentOrder = async (req, res) => {
  try {
    const { orderId, amount, currency = 'INR' } = req.body;

    // Validate order exists and belongs to user
    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(
      amount,
      currency,
      `order_${order.orderId}_${Date.now()}`
    );

    // Update order with Razorpay order ID
    order.paymentInfo.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({
      success: true,
      data: {
        order: razorpayOrder,
        key: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    console.error('Create payment order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment order',
      error: error.message
    });
  }
};

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Validate webhook signature
    const isValidSignature = validateWebhookSignature(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature
    );

    if (!isValidSignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Find and update order
    const order = await Order.findOne({
      _id: orderId,
      'paymentInfo.razorpayOrderId': razorpay_order_id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update payment info
    order.paymentInfo.razorpayPaymentId = razorpay_payment_id;
    order.paymentInfo.razorpaySignature = razorpay_signature;
    order.paymentInfo.status = 'completed';
    order.orderStatus = 'confirmed';

    await order.save();

    // Emit payment success event
    const { io } = await import('../server.js');
    io.emit('payment-success', {
      orderId: order._id,
      paymentId: razorpay_payment_id
    });

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        order: order._id,
        paymentId: razorpay_payment_id,
        status: 'completed'
      }
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message
    });
  }
};

// @desc    Process wallet payment
// @route   POST /api/payments/wallet
// @access  Private
export const processWalletPayment = async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const { orderId, amount } = req.body;

    // Validate order
    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id
    }).session(session);

    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check wallet balance
    const wallet = await Wallet.findOne({ user: req.user._id }).session(session);
    
    if (!wallet || wallet.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Insufficient wallet balance'
      });
    }

    // Process wallet payment
    await wallet.addTransaction({
      type: 'debit',
      amount: amount,
      description: 'Order payment',
      reference: `ORDER_${order.orderId}`,
      order: order._id,
      metadata: { orderType: 'purchase' }
    }, { session });

    // Update order payment status
    order.paymentInfo.method = 'wallet';
    order.paymentInfo.status = 'completed';
    order.orderStatus = 'confirmed';
    order.priceSummary.walletUsed = amount;

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({
      success: true,
      message: 'Wallet payment processed successfully',
      data: {
        order: order._id,
        walletBalance: wallet.balance - amount,
        status: 'completed'
      }
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Process wallet payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing wallet payment',
      error: error.message
    });
  }
};

// @desc    Razorpay webhook handler
// @route   POST /api/payments/webhook
// @access  Public
export const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const body = req.body;

    // Verify webhook signature
    const isValid = validateWebhookSignature(JSON.stringify(body), signature);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid webhook signature'
      });
    }

    const event = body.event;
    const payload = body.payload;

    switch (event) {
      case 'payment.captured':
        // Handle successful payment
        await handleSuccessfulPayment(payload.payment.entity);
        break;
      
      case 'payment.failed':
        // Handle failed payment
        await handleFailedPayment(payload.payment.entity);
        break;
      
      case 'refund.processed':
        // Handle refund
        await handleRefund(payload.refund.entity);
        break;
      
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    res.json({ success: true, message: 'Webhook processed' });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing webhook',
      error: error.message
    });
  }
};

// Helper function to handle successful payment
const handleSuccessfulPayment = async (payment) => {
  try {
    const order = await Order.findOne({
      'paymentInfo.razorpayOrderId': payment.order_id
    });

    if (order) {
      order.paymentInfo.razorpayPaymentId = payment.id;
      order.paymentInfo.status = 'completed';
      order.orderStatus = 'confirmed';
      await order.save();

      // Emit payment success event
      const { io } = await import('../server.js');
      io.emit('payment-success', {
        orderId: order._id,
        paymentId: payment.id
      });
    }
  } catch (error) {
    console.error('Handle successful payment error:', error);
  }
};

// Helper function to handle failed payment
const handleFailedPayment = async (payment) => {
  try {
    const order = await Order.findOne({
      'paymentInfo.razorpayOrderId': payment.order_id
    });

    if (order) {
      order.paymentInfo.status = 'failed';
      await order.save();

      // Emit payment failure event
      const { io } = await import('../server.js');
      io.emit('payment-failed', {
        orderId: order._id,
        error: payment.error_description
      });
    }
  } catch (error) {
    console.error('Handle failed payment error:', error);
  }
};

// Helper function to handle refund
const handleRefund = async (refund) => {
  try {
    const order = await Order.findOne({
      'paymentInfo.razorpayPaymentId': refund.payment_id
    });

    if (order && order.user) {
      // Credit wallet with refund amount
      const wallet = await Wallet.findOne({ user: order.user });
      if (wallet) {
        await wallet.addTransaction({
          type: 'credit',
          amount: refund.amount / 100, // Convert from paise to rupees
          description: 'Payment refund',
          reference: `REFUND_${refund.id}`,
          order: order._id,
          metadata: { refundId: refund.id, refundType: 'payment' }
        });
      }

      order.paymentInfo.status = 'refunded';
      await order.save();
    }
  } catch (error) {
    console.error('Handle refund error:', error);
  }
};