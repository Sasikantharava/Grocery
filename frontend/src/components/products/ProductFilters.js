import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  ChevronDown,
  Star,
  Leaf,
  Truck,
  Sparkles,
  Heart,
  Zap,
  BarChart3
} from 'lucide-react';

const ProductFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  totalProducts 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const priceRanges = [
    { label: 'Under ₹100', min: 0, max: 100 },
    { label: '₹100 - ₹200', min: 100, max: 200 },
    { label: '₹200 - ₹500', min: 200, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: 'Over ₹1000', min: 1000, max: null },
  ];

  const categories = [
    { name: 'Fruits & Vegetables', icon: '🍎', color: 'bg-red-50 text-red-600' },
    { name: 'Dairy & Eggs', icon: '🥛', color: 'bg-blue-50 text-blue-600' },
    { name: 'Bakery', icon: '🍞', color: 'bg-yellow-50 text-yellow-600' },
    { name: 'Beverages', icon: '🥤', color: 'bg-purple-50 text-purple-600' },
    { name: 'Snacks', icon: '🍿', color: 'bg-orange-50 text-orange-600' },
    { name: 'Meat & Fish', icon: '🍗', color: 'bg-pink-50 text-pink-600' },
    { name: 'Frozen Foods', icon: '🧊', color: 'bg-cyan-50 text-cyan-600' },
    { name: 'Personal Care', icon: '🧴', color: 'bg-green-50 text-green-600' },
  ];

  const brands = [
    { name: 'Fresh Farms', verified: true },
    { name: 'Organic Valley', verified: true },
    { name: 'Local Harvest', verified: false },
    { name: 'Premium Select', verified: true },
    { name: 'Daily Fresh', verified: false },
  ];

  const dietaryOptions = [
    { name: 'Organic', icon: Leaf },
    { name: 'Gluten-Free', icon: Heart },
    { name: 'Vegan', icon: Sparkles },
    { name: 'Sugar-Free', icon: Zap },
  ];

  const filterPresets = [
    { name: 'Best Sellers', icon: BarChart3, filters: { sortBy: 'popular' } },
    { name: 'Organic Only', icon: Leaf, filters: { dietary: ['Organic'] } },
    { name: 'Fast Delivery', icon: Truck, filters: { delivery: 'express' } },
    { name: 'Top Rated', icon: Star, filters: { minRating: 4 } },
  ];

  const handlePriceRangeChange = (range) => {
    onFiltersChange({
      ...filters,
      minPrice: range.min,
      maxPrice: range.max,
    });
  };

  const handleCategoryChange = (category) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleBrandChange = (brand) => {
    const currentBrands = filters.brands || [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand];
    
    onFiltersChange({
      ...filters,
      brands: newBrands,
    });
  };

  const handleDietaryChange = (dietary) => {
    const currentDietary = filters.dietary || [];
    const newDietary = currentDietary.includes(dietary)
      ? currentDietary.filter(d => d !== dietary)
      : [...currentDietary, dietary];
    
    onFiltersChange({
      ...filters,
      dietary: newDietary,
    });
  };

  const handleRatingChange = (rating) => {
    onFiltersChange({
      ...filters,
      minRating: rating,
    });
  };

  const handleSortChange = (sortBy) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const applyPreset = (preset) => {
    onFiltersChange({
      ...filters,
      ...preset.filters,
    });
  };

  const hasActiveFilters = 
    filters.minPrice || 
    filters.maxPrice || 
    (filters.categories && filters.categories.length > 0) ||
    (filters.brands && filters.brands.length > 0) ||
    (filters.dietary && filters.dietary.length > 0) ||
    filters.minRating;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Mobile Filter Header */}
      <div className="lg:hidden p-4 border-b border-gray-100">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center space-x-2">
            <Filter size={20} />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                !
              </span>
            )}
          </div>
          <ChevronDown
            size={20}
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Desktop Filter Header */}
      <div className="hidden lg:flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Filter size={20} className="text-primary-500" />
          <h3 className="text-lg font-semibold">Filters</h3>
          <span className="text-gray-500">
            ({totalProducts} products)
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
          >
            <X size={16} className="mr-1" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Filter Presets */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Quick Filters</h4>
                <div className="grid grid-cols-2 gap-2">
                  {filterPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyPreset(preset)}
                      className="flex items-center justify-center space-x-2 p-3 rounded-xl text-sm font-medium bg-gray-50 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                      <preset.icon size={16} />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'createdAt', label: 'Newest' },
                    { value: 'price', label: 'Price: Low to High' },
                    { value: '-price', label: 'Price: High to Low' },
                    { value: 'name', label: 'Name' },
                    { value: 'ratings.average', label: 'Rating' },
                    { value: 'popular', label: 'Popular' },
                  ].map((sortOption) => (
                    <button
                      key={sortOption.value}
                      onClick={() => handleSortChange(sortOption.value)}
                      className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                        filters.sortBy === sortOption.value
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {sortOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => handlePriceRangeChange(range)}
                      className={`flex items-center justify-between w-full p-3 rounded-xl text-sm transition-colors ${
                        filters.minPrice === range.min && filters.maxPrice === range.max
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{range.label}</span>
                      {filters.minPrice === range.min && filters.maxPrice === range.max && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`flex items-center space-x-2 p-3 rounded-xl text-sm transition-colors ${
                        filters.categories?.includes(category.name)
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Options */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Dietary</h4>
                <div className="grid grid-cols-2 gap-2">
                  {dietaryOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleDietaryChange(option.name)}
                      className={`flex items-center space-x-2 p-3 rounded-xl text-sm transition-colors ${
                        filters.dietary?.includes(option.name)
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <option.icon size={16} />
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.brands?.includes(brand.name) || false}
                        onChange={() => handleBrandChange(brand.name)}
                        className="rounded text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 flex-1">{brand.name}</span>
                      {brand.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Customer Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(rating)}
                      className={`flex items-center space-x-2 w-full p-3 rounded-xl text-sm transition-colors ${
                        filters.minRating === rating
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span>& above</span>
                      {filters.minRating === rating && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {filters.minPrice && filters.maxPrice && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                        Price: ₹{filters.minPrice} - ₹{filters.maxPrice}
                        <button
                          onClick={() => onFiltersChange({
                            ...filters,
                            minPrice: null,
                            maxPrice: null,
                          })}
                          className="ml-2 hover:text-primary-900"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    
                    {filters.categories?.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryChange(category)}
                          className="ml-2 hover:text-green-900"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    
                    {filters.dietary?.map((dietary) => (
                      <span
                        key={dietary}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800"
                      >
                        {dietary}
                        <button
                          onClick={() => handleDietaryChange(dietary)}
                          className="ml-2 hover:text-purple-900"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    
                    {filters.brands?.map((brand) => (
                      <span
                        key={brand}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        {brand}
                        <button
                          onClick={() => handleBrandChange(brand)}
                          className="ml-2 hover:text-blue-900"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    
                    {filters.minRating && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        {filters.minRating}+ Stars
                        <button
                          onClick={() => onFiltersChange({
                            ...filters,
                            minRating: null,
                          })}
                          className="ml-2 hover:text-yellow-900"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilters;