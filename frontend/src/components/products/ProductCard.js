import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye,
  Plus,
  Minus,
  Truck,
  Shield,
  Clock,
  BarChart3,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../hooks/useCart.js';
import { useAuth } from '../../hooks/useAuth.js';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [quickAddQuantity, setQuickAddQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const imageRef = useRef(null);
  const { addItemToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }

    try {
      await addItemToCart(product._id, quickAddQuantity);
      setQuickAddQuantity(1);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const handleQuickAdd = (increment) => {
    const newQuantity = quickAddQuantity + increment;
    if (newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
      setQuickAddQuantity(newQuantity);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(true); // Still set to true to show placeholder
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock < 10;
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group relative"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Loading Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Product Image */}
        <Link to={`/products/${product._id}`}>
          <motion.img
            ref={imageRef}
            src={product.images?.[0]?.url || '/api/placeholder/300/300'}
            alt={product.name}
            className={`w-full h-56 object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Link>
        
        {/* Gradient Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discountPercentage > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
            >
              -{discountPercentage}% OFF
            </motion.div>
          )}
          
          {product.featured && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center"
            >
              <Sparkles size={12} className="mr-1" />
              Featured
            </motion.div>
          )}
          
          {isLowStock && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center"
            >
              <Clock size={12} className="mr-1" />
              Only {product.stock} left
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          </motion.button>

          {/* Quick View Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-primary-600 transition-all duration-300 shadow-lg backdrop-blur-sm flex items-center justify-center"
          >
            <Eye size={18} />
          </motion.button>

          {/* Compare Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCompare(!showCompare)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm ${
              showCompare
                ? 'bg-primary-500 text-white'
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-primary-600'
            }`}
          >
            <ArrowUpDown size={18} />
          </motion.button>
        </div>

        {/* Quick Add to Cart - Shows on Hover */}
        <AnimatePresence>
          {isHovered && !isOutOfStock && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-3 left-3 right-3"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuickAdd(-1)}
                      disabled={quickAddQuantity <= 1}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900">
                      {quickAddQuantity}
                    </span>
                    <button
                      onClick={() => handleQuickAdd(1)}
                      disabled={quickAddQuantity >= product.stock}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-green-500 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <ShoppingCart size={16} />
                    <span>Add</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-xl">
              <span className="text-gray-900 font-semibold">Out of Stock</span>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category Badge */}
        {product.category && (
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full">
              {product.category.name}
            </span>
          </div>
        )}

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors text-lg">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.ratings?.average || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {product.ratings?.average || '4.5'}
            </span>
            <span className="text-sm text-gray-500">
              ({product.ratings?.count || 0})
            </span>
          </div>
          
          {product.popular && (
            <div className="flex items-center text-xs text-green-600 font-medium">
              <BarChart3 size={12} className="mr-1" />
              Popular
            </div>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Delivery Info */}
          <div className="flex items-center text-xs text-green-600 font-medium">
            <Truck size={14} className="mr-1" />
            <span>Free</span>
          </div>
        </div>

        {/* Stock and Unit Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center">
            <Shield size={12} className="mr-1 text-green-500" />
            {isOutOfStock 
              ? 'Out of stock' 
              : isLowStock
                ? `Only ${product.stock} left`
                : 'In stock'
            }
          </span>
          <span>{product.unitValue}{product.unit}</span>
        </div>

        {/* Mobile Add to Cart */}
        {product.stock > 0 && (
          <div className="mt-3 lg:hidden">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-green-500 text-white px-4 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;