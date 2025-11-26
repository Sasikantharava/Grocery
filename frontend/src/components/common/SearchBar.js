import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Sparkles, Package, ShoppingCart, ArrowRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([
    'Apples', 'Bananas', 'Milk', 'Bread', 'Eggs', 'Rice', 'Tomatoes', 'Chicken'
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Simulate fetching suggestions based on query
    if (query.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockSuggestions = popularSearches.filter(item => 
          item.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3);
        setSuggestions(mockSuggestions);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.toLowerCase()}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative p-6 border-b border-gray-100">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="text-primary-500" size={22} />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Search for fruits, vegetables, dairy, and more..."
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-primary-500 text-lg placeholder-gray-400 bg-gray-50 focus:bg-white transition-all duration-200"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Search Tips */}
          <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs mr-1">Enter</kbd>
              to search
            </span>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs mr-1">Esc</kbd>
              to close
            </span>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Sparkles size={18} className="text-primary-500" />
                <span className="font-medium">Suggestions</span>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <Search size={16} className="text-gray-400" />
                      <span className="text-gray-700">{suggestion}</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock size={18} className="text-primary-500" />
                  <span className="font-medium">Recent Searches</span>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSearch(search)}
                    className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-gray-700">{search}</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-gray-600 mb-4">
              <TrendingUp size={18} className="text-primary-500" />
              <span className="font-medium">Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSearch(search)}
                  className="px-4 py-2 bg-gray-100 hover:bg-primary-100 hover:text-primary-700 rounded-full text-sm text-gray-700 transition-colors font-medium"
                >
                  {search}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div className="p-6">
            <div className="flex items-center space-x-2 text-gray-600 mb-4">
              <Filter size={18} className="text-primary-500" />
              <span className="font-medium">Browse Categories</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Fruits', emoji: '🍎', color: 'bg-red-50 text-red-700 hover:bg-red-100' },
                { name: 'Vegetables', emoji: '🥦', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                { name: 'Dairy', emoji: '🥛', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
                { name: 'Bakery', emoji: '🍞', color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
                { name: 'Meat', emoji: '🥩', color: 'bg-pink-50 text-pink-700 hover:bg-pink-100' },
                { name: 'Seafood', emoji: '🦐', color: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100' },
                { name: 'Snacks', emoji: '🍿', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
                { name: 'Beverages', emoji: '🥤', color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
              ].map((category, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 hover:scale-105 ${category.color}`}
                >
                  <div className="text-2xl mb-2">{category.emoji}</div>
                  <div className="font-medium text-sm">{category.name}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-gradient-to-r from-primary-50 to-green-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/offers')}
                className="flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                <Sparkles size={18} />
                <span>View Offers</span>
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                <ShoppingCart size={18} />
                <span>Go to Cart</span>
              </button>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              <Package size={18} />
              <span>All Products</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;