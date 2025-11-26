import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  List, 
  ChevronDown,
  RefreshCw,
  SlidersHorizontal,
  ShoppingCart
} from 'lucide-react';
import ProductCard from './ProductCard.js';
import LoadingSpinner from '../common/LoadingSpinner.js';

const ProductGrid = ({ 
  products, 
  isLoading, 
  isError, 
  error,
  emptyMessage = "No products found",
  className = "",
  onFiltersChange,
  filters,
  onClearFilters
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState(filters?.sortBy || 'createdAt');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    if (onFiltersChange) {
      onFiltersChange({
        ...filters,
        sortBy: newSortBy
      });
    }
  };

  // Loading State with Skeleton Cards
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Sort Bar Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm p-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-1/4"></div>
        </div>
        
        {/* Product Cards Skeleton */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse">
              <div className="h-56 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCw size={24} className="text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Failed to load products
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {error || "Something went wrong while fetching products. Please try again."}
        </p>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-colors"
        >
          <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart size={24} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Try adjusting your search or filter criteria, or explore our popular categories.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span>Clear Filters</span>
            </button>
          )}
          <button
            onClick={() => window.location.href = '/products'}
            className="inline-flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-colors"
          >
            <span>View All Products</span>
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Sort Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {products.length} products
            </span>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <span>Sort by</span>
                <ChevronDown size={16} />
              </button>
              
              {/* Sort Options (Dropdown) */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                {[
                  { value: 'createdAt', label: 'Newest' },
                  { value: 'price', label: 'Price: Low to High' },
                  { value: '-price', label: 'Price: High to Low' },
                  { value: 'name', label: 'Name' },
                  { value: 'ratings.average', label: 'Rating' },
                  { value: 'popular', label: 'Popular' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      sortBy === option.value ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid/List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={
          viewMode === 'grid'
            ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`
            : `space-y-4 ${className}`
        }
      >
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <ProductCard product={product} viewMode={viewMode} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button */}
      {products.length > 0 && (
        <div className="flex justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {/* Handle load more */}}
            className="inline-flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            <span>Load More Products</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;