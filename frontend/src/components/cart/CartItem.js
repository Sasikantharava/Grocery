import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Heart,
  AlertCircle,
  Shield,
  Clock,
  Tag
} from 'lucide-react';
import { useCart } from '../../hooks/useCart.js';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSavingForLater, setIsSavingForLater] = useState(false);
  const { updateItemQuantity, removeItemFromCart } = useCart();

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > (item.product?.stock || 10)) {
      // Show stock limit message
      return;
    }

    setQuantity(newQuantity);
    try {
      await updateItemQuantity(item.product._id, newQuantity);
    } catch (error) {
      // Revert on error
      setQuantity(item.quantity);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeItemFromCart(item.product._id);
    } catch (error) {
      setIsRemoving(false);
    }
  };

  const handleSaveForLater = () => {
    setIsSavingForLater(true);
    // Implement save for later functionality
    setTimeout(() => {
      setIsSavingForLater(false);
    }, 1000);
  };

  const incrementQuantity = () => handleQuantityChange(quantity + 1);
  const decrementQuantity = () => handleQuantityChange(quantity - 1);

  const itemTotal = item.price * quantity;
  const isLowStock = item.product?.stock < 10 && item.product?.stock > 0;
  const isOutOfStock = item.product?.stock === 0;
  const hasDiscount = item.product?.originalPrice && item.product.originalPrice > item.price;
  const discountAmount = hasDiscount ? (item.product.originalPrice - item.price) * quantity : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 1, height: 'auto' }}
      animate={{ 
        opacity: isRemoving ? 0 : 1, 
        height: isRemoving ? 0 : 'auto',
        scale: isRemoving ? 0.9 : 1 
      }}
      exit={{ opacity: 0, height: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <Link 
            to={`/products/${item.product?._id}`}
            className="flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src={item.product?.images?.[0]?.url || '/api/placeholder/100/100'}
                alt={item.product?.name}
                className="w-24 h-24 object-cover rounded-2xl bg-gray-100"
              />
              
              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{Math.round(((item.product.originalPrice - item.price) / item.product.originalPrice) * 100)}%
                </div>
              )}
            </motion.div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link 
                  to={`/products/${item.product?._id}`}
                  className="block"
                >
                  <h3 className="font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 text-lg">
                    {item.product?.name}
                  </h3>
                </Link>
                
                <div className="flex items-center space-x-3 mt-2">
                  <p className="text-sm text-gray-500">
                    {item.product?.unitValue}
                    {item.product?.unit}
                  </p>
                  
                  {item.product?.brand && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {item.product.brand}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <AnimatePresence>
                  {isLowStock && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-1 text-xs text-orange-600 mt-2"
                    >
                      <AlertCircle size={12} />
                      <span>Only {item.product.stock} left in stock</span>
                    </motion.p>
                  )}
                  {isOutOfStock && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-1 text-xs text-red-600 mt-2"
                    >
                      <AlertCircle size={12} />
                      <span>Out of stock</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Price */}
              <div className="text-right ml-4">
                <p className="text-xl font-bold text-gray-900">
                  ₹{item.price}
                </p>
                {hasDiscount && (
                  <p className="text-sm text-gray-500 line-through">
                    ₹{item.product.originalPrice}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={decrementQuantity}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Minus size={16} />
                  </motion.button>
                  
                  <span className="w-10 text-center font-bold text-gray-900">
                    {quantity}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={incrementQuantity}
                    disabled={quantity >= (item.product?.stock || 10) || isOutOfStock}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>

                {/* Save for Later */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveForLater}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  title="Save for later"
                >
                  <Heart size={18} fill={isSavingForLater ? 'currentColor' : 'none'} />
                </motion.button>
              </div>

              {/* Item Total and Remove */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ₹{itemTotal}
                  </p>
                  {discountAmount > 0 && (
                    <p className="text-xs text-green-600 font-medium">
                      You save ₹{discountAmount}
                    </p>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRemove}
                  disabled={isRemoving}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Benefits */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Shield size={12} className="text-green-500" />
              <span>Quality Assured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={12} className="text-blue-500" />
              <span>Fast Delivery</span>
            </div>
            {item.product?.isOrganic && (
              <div className="flex items-center space-x-1">
                <Tag size={12} className="text-green-500" />
                <span>Organic</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;