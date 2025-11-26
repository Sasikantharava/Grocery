import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Wallet from '../models/Wallet.js';
import { generateOrderTimeline, calculateDeliveryTime } from '../utils/helpers.js';
import { io } from '../server.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const { items, shippingAddress, paymentMethod, couponCode, deliveryInstructions, useWallet } = req.body;

    // Validate products and calculate total
    let itemsTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product).session(session);
      
      if (!product || !product.isActive) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: `Product ${item.product} not found or inactive`
        });
      }

      if (product.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Only ${product.stock} available`
        });
      }

      // Update product stock
      product.stock -= item.quantity;
      await product.save({ session });

      const itemTotal = product.price * item.quantity;
      itemsTotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]?.url,
        unit: product.unit,
        unitValue: product.unitValue
      });
    }

    // Calculate price summary
    const priceSummary = {
      itemsTotal,
      deliveryFee: itemsTotal > 500 ? 0 : 40, // Free delivery above ₹500
      tax: Math.round(itemsTotal * 0.05), // 5% tax
      discount: 0,
      couponDiscount: 0,
      walletUsed: 0,
      grandTotal: itemsTotal
    };

    // Apply coupon if provided
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode.toUpperCase() }).session(session);
      
      if (coupon && coupon.isValid()) {
        const discount = coupon.calculateDiscount(itemsTotal);
        priceSummary.couponDiscount = discount;
        priceSummary.grandTotal -= discount;
        
        // Increment coupon usage
        coupon.usedCount += 1;
        await coupon.save({ session });
      }
    }

    // Apply wallet if requested
    if (useWallet) {
      const wallet = await Wallet.findOne({ user: req.user._id }).session(session);
      
      if (wallet && wallet.balance > 0) {
        const walletUse = Math.min(wallet.balance, priceSummary.grandTotal);
        priceSummary.walletUsed = walletUse;
        priceSummary.grandTotal -= walletUse;

        // Add wallet transaction
        await wallet.addTransaction({
          type: 'debit',
          amount: walletUse,
          description: 'Order payment',
          reference: `ORDER_${Date.now()}`,
          metadata: { orderType: 'purchase' }
        }, { session });
      }
    }

    // Add delivery fee and tax to grand total
    priceSummary.grandTotal += priceSummary.deliveryFee + priceSummary.tax;

    // Create order
    const order = await Order.create([{
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentInfo: {
        method: paymentMethod,
        status: paymentMethod === 'cod' ? 'pending' : 'pending'
      },
      priceSummary,
      coupon: coupon?._id,
      deliveryInstructions,
      tracking: {
        estimatedDelivery: new Date(Date.now() + 30 * 60000) // 30 minutes default
      }
    }], { session });

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], coupon: undefined },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Populate order data
    const populatedOrder = await Order.findById(order[0]._id)
      .populate('items.product')
      .populate('user', 'name email phone')
      .populate('coupon');

    // Emit order created event
    io.emit('order-created', { order: populatedOrder });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: populatedOrder
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = { user: req.user._id };
    if (status) {
      filter.orderStatus = status;
    }

    const orders = await Order.find(filter)
      .populate('items.product')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: {
        orders,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email phone')
      .populate('coupon')
      .populate('deliveryPartner', 'user vehicleType vehicleNumber')
      .populate('deliveryPartner.user', 'name phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order or is admin/delivery
    if (order.user._id.toString() !== req.user._id.toString() && 
        !['admin', 'delivery'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    // Generate timeline
    const timeline = generateOrderTimeline(order.orderStatus);

    res.json({
      success: true,
      data: {
        ...order.toObject(),
        timeline
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin/Delivery
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    order.orderStatus = status;
    order.updateStatus(status);

    if (status === 'delivered') {
      order.paymentInfo.status = 'completed';
    } else if (status === 'cancelled') {
      // Restore product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { stock: item.quantity } }
        );
      }

      // Refund wallet amount if used
      if (order.priceSummary.walletUsed > 0) {
        const wallet = await Wallet.findOne({ user: order.user });
        if (wallet) {
          await wallet.addTransaction({
            type: 'credit',
            amount: order.priceSummary.walletUsed,
            description: 'Order cancellation refund',
            reference: `REFUND_${order.orderId}`,
            order: order._id,
            metadata: { refundType: 'cancellation' }
          });
        }
      }
    }

    await order.save();

    // Emit status update
    io.to(order._id.toString()).emit('order-status-updated', {
      orderId: order._id,
      status: order.orderStatus,
      updatedAt: order.updatedAt
    });

    // Notify user
    io.emit('order-notification', {
      userId: order.user._id,
      orderId: order._id,
      message: `Your order ${order.orderId} is now ${status}`,
      type: 'status_update'
    });

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
};

// @desc    Cancel order
// @route   PATCH /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.orderStatus = 'cancelled';
    order.cancellationReason = reason;

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }

    // Refund wallet amount if used
    if (order.priceSummary.walletUsed > 0) {
      const wallet = await Wallet.findOne({ user: req.user._id });
      if (wallet) {
        await wallet.addTransaction({
          type: 'credit',
          amount: order.priceSummary.walletUsed,
          description: 'Order cancellation refund',
          reference: `REFUND_${order.orderId}`,
          order: order._id,
          metadata: { refundType: 'cancellation' }
        });
      }
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: error.message
    });
  }
};

// @desc    Get order tracking
// @route   GET /api/orders/:id/tracking
// @access  Private
export const getOrderTracking = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('deliveryPartner', 'user vehicleType vehicleNumber currentLocation')
      .populate('deliveryPartner.user', 'name phone');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString() && 
        !['admin', 'delivery'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    const timeline = generateOrderTimeline(order.orderStatus);

    res.json({
      success: true,
      data: {
        order: {
          _id: order._id,
          orderId: order.orderId,
          status: order.orderStatus,
          estimatedDelivery: order.tracking.estimatedDelivery,
          deliveredAt: order.tracking.deliveredAt
        },
        deliveryPartner: order.deliveryPartner,
        timeline,
        currentLocation: order.tracking.currentLocation
      }
    });
  } catch (error) {
    console.error('Get order tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order tracking',
      error: error.message
    });
  }
};

// @desc    Update delivery location
// @route   PATCH /api/orders/:id/location
// @access  Private/Delivery
export const updateDeliveryLocation = async (req, res) => {
  try {
    const { lat, lng, address } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update location
    order.tracking.currentLocation = {
      lat,
      lng,
      address,
      updatedAt: new Date()
    };

    await order.save();

    // Emit location update to order room
    io.to(order._id.toString()).emit('delivery-location-updated', {
      orderId: order._id,
      location: order.tracking.currentLocation
    });

    res.json({
      success: true,
      message: 'Delivery location updated',
      data: order.tracking.currentLocation
    });
  } catch (error) {
    console.error('Update delivery location error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating delivery location',
      error: error.message
    });
  }
};