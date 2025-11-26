import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Star,
  ArrowRight,
  Sparkles,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryCarousel = ({ categories, onCategorySelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const visibleCategories = categories.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isDragging) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScrollLeft) {
          carouselRef.current.scrollLeft = 0;
          setCurrentIndex(0);
        } else {
          carouselRef.current.scrollLeft += 1;
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isDragging, categories.length]);

  return (
    <div className="w-full py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-green-100 px-6 py-3 rounded-full mb-4">
          <Sparkles className="text-primary-600 mr-2" size={20} />
          <span className="text-primary-800 font-semibold text-lg">Shop by Category</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Explore Our Wide Range
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          From fresh produce to daily essentials, find everything you need in one place
        </p>
      </motion.div>

      {/* Navigation Arrows */}
      <div className="relative">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous categories"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === totalPages - 1}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next categories"
        >
          <ChevronRight size={24} className="text-gray-600" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            initial={{ x: 0 }}
            animate={{ x: -currentIndex * 100 }}
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 } }}
          >
            <AnimatePresence>
              {visibleCategories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  onClick={() => onCategorySelect(category)}
                  className="flex-shrink-0 w-full max-w-[280px]"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Category Image */}
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-green-100 opacity-20"></div>
                      <div className="relative h-full w-full flex items-center justify-center text-4xl">
                        {category.image}
                      </div>
                    </div>

                    {/* Category Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      
                      {/* Category Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400 fill-current" size={16} />
                          <span className="text-sm text-gray-600">4.5</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 100) + 50} products
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        Fresh and high-quality {category.name.toLowerCase()} sourced directly from trusted farms and suppliers.
                      </p>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onCategorySelect(category)}
                        className="w-full bg-gradient-to-r from-primary-500 to-green-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <ShoppingBag size={18} />
                        <span>Shop Now</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-primary-500 to-green-500 w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-8"
      >
        <Link
          to="/products"
          className="inline-flex items-center justify-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 border-2 border-primary-200 hover:border-primary-300"
        >
          <Package size={20} />
          <span>View All Categories</span>
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  );
};

export default CategoryCarousel;