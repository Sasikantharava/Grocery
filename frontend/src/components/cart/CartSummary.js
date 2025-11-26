import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Tag, 
  ShoppingBag, 
  Truck,
  Shield,
  ArrowRight,
  CheckCircle,
  Percent,
  Gift
} from 'lucide-react';
import { useCart } from '../../hooks/useCart.js';

const CartSummary = ({ onProceedToCheckout }) => {
  const { items, totalPrice, discount, coupon, applyCartCoupon, removeCartCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);

  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice - discount + deliveryFee + tax;
  const freeDeliveryRemaining = totalPrice < 500 ? 500 - totalPrice : 0;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    setCouponError('');

    try {
      await applyCartCoupon(couponCode);
      setCouponCode('');
      setShowCouponSuccess(true);
      setTimeout(() => setShowCouponSuccess(false), 3000);
    } catch (error) {
      setCouponError(error.message || 'Invalid coupon code');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCartCoupon();
    } catch (error) {
      console.error('Failed to remove coupon:', error);
    }
  };

  const summaryItems = [
    {
      label: 'Items Total',
      value: `₹${totalPrice}`,
      color: 'text-gray-600'
    },
    {
      label: 'Delivery Fee',
      value: deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`,
      color: deliveryFee === 0 ? 'text-green-600' : 'text-gray-600'
    },
    {
      label: 'Tax & Charges',
      value: `₹${tax}`,
      color: 'text-gray-600'
    }
  ];

  if (discount > 0) {
    summaryItems.push({
      label: 'Discount',
      value: `-₹${discount}`,
      color: 'text-green-600'
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 sticky top-4"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <ShoppingBag size={24} className="text-primary-500" />
          <span>Order Summary</span>
        </h2>
        <p className="text-gray-600 mt-1">
          {items.length} item{items.length !== 1 ? 's' : ''} in cart
        </p>
      </div>

      {/* Coupon Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2 mb-3">
          <Tag size={18} className="text-primary-600" />
          <span className="font-medium text-gray-900">Apply Coupon</span>
        </div>

        <AnimatePresence>
          {coupon && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200 mb-3"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800">{coupon.code}</p>
                  <p className="text-sm text-green-600">{coupon.description}</p>
                </div>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                Remove
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCouponSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-3 p-3 bg-green-50 rounded-xl border border-green-200"
            >
              <p className="text-sm text-green-800 font-medium">Coupon applied successfully!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!coupon && (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplyCoupon}
                disabled={isApplyingCoupon || !couponCode.trim()}
                className="px-4 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isApplyingCoupon ? 'Applying...' : 'Apply'}
              </motion.button>
            </div>
            {couponError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm"
              >
                {couponError}
              </motion.p>
            )}
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="p-6 border-b border-gray-100">
        <div className="space-y-3">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-600">{item.label}</span>
              <span className={`font-medium ${item.color}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
          <span className="text-lg font-bold text-gray-900">Total Amount</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ₹{finalTotal}
            </div>
            {deliveryFee === 0 && (
              <p className="text-sm text-green-600 font-medium">Free delivery applied!</p>
            )}
          </div>
        </div>
      </div>

      {/* Free Delivery Banner */}
      {freeDeliveryRemaining > 0 && (
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center space-x-2 text-blue-700">
            <Truck size={16} />
            <span className="text-sm font-medium">
              Add ₹{freeDeliveryRemaining} more for FREE delivery!
            </span>
          </div>
        </div>
      )}

      {/* Offers Banner */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <div className="flex items-center space-x-2 text-purple-700">
          <Gift size={16} />
          <span className="text-sm font-medium">
            Special offer: Get 10% off on orders above ₹1000!
          </span>
        </div>
      </div>

      {/* Security & Benefits */}
      <div className="p-6">
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Shield size={16} className="text-green-500" />
            <span>Safe and Secure Payments</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck size={16} className="text-primary-500" />
            <span>Delivery in 30-45 minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Fresh quality guaranteed</span>
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onProceedToCheckout}
          disabled={items.length === 0}
          className="w-full mt-6 bg-gradient-to-r from-primary-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={20} />
        </motion.button>

        {/* Continue Shopping */}
        <Link
          to="/products"
          className="block w-full mt-3 text-center text-gray-600 hover:text-primary-600 transition-colors font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
};

export default CartSummary;