import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  ArrowLeft,
  ShoppingBag,
  Package,
  Clock,
  Shield,
  RefreshCw,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useCart } from '../hooks/useCart.js';
import { useAuth } from '../hooks/useAuth.js';
import CartItem from '../components/cart/CartItem.js';
import CartSummary from '../components/cart/CartSummary.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';

const Cart = () => {
  const { items, totalItems, getCart, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [localItems, setLocalItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getCart();
    }
  }, [isAuthenticated, getCart]);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await getCart();
    } catch (error) {
      console.error('Failed to refresh cart:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    if (items.length === 0) return;
    
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-lg p-8 text-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={36} className="text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Your Cart is Waiting
              </h1>
              <p className="text-gray-600 mb-6">
                Please log in to view your cart and start shopping for fresh groceries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-green-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  <span>Login to Continue</span>
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 border-2 border-primary-200 px-6 py-3 rounded-full font-medium hover:bg-primary-50 transition-all duration-300"
                >
                  <span>Browse Products</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (localItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-lg p-8 text-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart size={36} className="text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet. 
                Start shopping for fresh groceries now!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-green-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
              >
                <ShoppingBag size={20} />
                <span>Start Shopping</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </Link>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                <p className="text-gray-600">
                  {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Total Items</p>
                  <p className="text-2xl font-bold text-primary-600">{totalItems}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Est. Delivery</p>
                  <div className="flex items-center text-green-600">
                    <Clock size={16} className="mr-1" />
                    <span className="font-medium">30-45 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <AnimatePresence>
                {localItems.map((item, index) => (
                  <motion.div
                    key={`${item.product?._id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Cart Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles size={18} className="text-blue-600" />
                <h3 className="font-semibold text-blue-900">Shopping Tips</h3>
              </div>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start space-x-2">
                  <Package size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Orders above ₹500 qualify for free delivery</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Clock size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Delivery within 30-45 minutes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Fresh quality guaranteed or money back</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Contact-free delivery available</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary onProceedToCheckout={handleProceedToCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;