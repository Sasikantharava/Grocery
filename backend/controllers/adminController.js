import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Coupon from '../models/Coupon.js';

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Total statistics
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalRevenue = await Order.aggregate([
      { $match: { orderStatus: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$priceSummary.grandTotal' } } }
    ]);

    // Today's statistics
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: startOfToday }
    });
    const todayRevenue = await Order.aggregate([
      { 
        $match: { 
          orderStatus: 'delivered',
          createdAt: { $gte: startOfToday }
        } 
      },
      { $group: { _id: null, total: { $sum: '$priceSummary.grandTotal' } } }
    ]);

    // Weekly statistics
    const weeklyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfWeek }
    });
    const weeklyRevenue = await Order.aggregate([
      { 
        $match: { 
          orderStatus: 'delivered',
          createdAt: { $gte: startOfWeek }
        } 
      },
      { $group: { _id: null, total: { $sum: '$priceSummary.grandTotal' } } }
    ]);

    // Monthly statistics
    const monthlyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfMonth }
    });
    const monthlyRevenue = await Order.aggregate([
      { 
        $match: { 
          orderStatus: 'delivered',
          createdAt: { $gte: startOfMonth }
        } 
      },
      { $group: { _id: null, total: { $sum: '$priceSummary.grandTotal' } } }
    ]);

    // Order status breakdown
    const orderStatusStats = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    // Low stock products
    const lowStockProducts = await Product.countDocuments({
      stock: { $lte: 10 },
      isActive: true
    });

    const stats = {
      overview: {
        totalOrders,
        totalProducts,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        lowStockProducts
      },
      today: {
        orders: todayOrders,
        revenue: todayRevenue[0]?.total || 0
      },
      weekly: {
        orders: weeklyOrders,
        revenue: weeklyRevenue[0]?.total || 0
      },
      monthly: {
        orders: monthlyOrders,
        revenue: monthlyRevenue[0]?.total || 0
      },
      orderStatus: orderStatusStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

// @desc    Get sales analytics
// @route   GET /api/admin/dashboard/analytics
// @access  Private/Admin
export const getSalesAnalytics = async (req, res) => {
  try {
    const { period = '7d' } = req.query; // 7d, 30d, 90d, 1y
    
    let days;
    switch (period) {
      case '7d':
        days = 7;
        break;
      case '30d':
        days = 30;
        break;
      case '90d':
        days = 90;
        break;
      case '1y':
        days = 365;
        break;
      default:
        days = 7;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    // Sales data by date
    const salesData = await Order.aggregate([
      {
        $match: {
          orderStatus: 'delivered',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          revenue: { $sum: '$priceSummary.grandTotal' },
          orders: { $sum: 1 },
          averageOrderValue: { $avg: '$priceSummary.grandTotal' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Category-wise sales
    const categorySales = await Order.aggregate([
      {
        $match: {
          orderStatus: 'delivered',
          createdAt: { $gte: startDate }
        }
      },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productData'
        }
      },
      { $unwind: '$productData' },
      {
        $lookup: {
          from: 'categories',
          localField: 'productData.category',
          foreignField: '_id',
          as: 'categoryData'
        }
      },
      { $unwind: '$categoryData' },
      {
        $group: {
          _id: '$categoryData.name',
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          orders: { $sum: 1 },
          itemsSold: { $sum: '$items.quantity' }
        }
      },
      {
        $sort: { revenue: -1 }
      }
    ]);

    // Payment method distribution
    const paymentMethods = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$paymentInfo.method',
          count: { $sum: 1 },
          revenue: { $sum: '$priceSummary.grandTotal' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        salesData,
        categorySales,
        paymentMethods,
        period
      }
    });
  } catch (error) {
    console.error('Get sales analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales analytics',
      error: error.message
    });
  }
};

// @desc    Get recent orders
// @route   GET /api/admin/dashboard/recent-orders
// @access  Private/Admin
export const getRecentOrders = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get recent orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent orders',
      error: error.message
    });
  }
};

// @desc    Get top products
// @route   GET /api/admin/dashboard/top-products
// @access  Private/Admin
export const getTopProducts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          orderCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          _id: 1,
          name: '$product.name',
          image: { $arrayElemAt: ['$product.images.url', 0] },
          totalSold: 1,
          totalRevenue: 1,
          orderCount: 1,
          averageRating: '$product.ratings.average'
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.json({
      success: true,
      data: topProducts
    });
  } catch (error) {
    console.error('Get top products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching top products',
      error: error.message
    });
  }
};

// @desc    Get low stock products
// @route   GET /api/admin/dashboard/low-stock
// @access  Private/Admin
export const getLowStockProducts = async (req, res) => {
  try {
    const { threshold = 10 } = req.query;

    const lowStockProducts = await Product.find({
      stock: { $lte: parseInt(threshold) },
      isActive: true
    })
    .populate('category', 'name')
    .sort({ stock: 1 })
    .limit(20);

    res.json({
      success: true,
      data: lowStockProducts
    });
  } catch (error) {
    console.error('Get low stock products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching low stock products',
      error: error.message
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/admin/dashboard/user-stats
// @access  Private/Admin
export const getUserStats = async (req, res) => {
  try {
    // User growth over time
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m',
              date: '$createdAt'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // User role distribution
    const roleDistribution = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // Active vs inactive users
    const activeStatus = await User.aggregate([
      {
        $group: {
          _id: '$isActive',
          count: { $sum: 1 }
        }
      }
    ]);

    // Users with orders
    const usersWithOrders = await Order.distinct('user');

    const stats = {
      userGrowth,
      roleDistribution: roleDistribution.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      activeStatus: activeStatus.reduce((acc, item) => {
        acc[item._id ? 'active' : 'inactive'] = item.count;
        return acc;
      }, {}),
      usersWithOrders: usersWithOrders.length,
      totalUsers: await User.countDocuments()
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
      error: error.message
    });
  }
};