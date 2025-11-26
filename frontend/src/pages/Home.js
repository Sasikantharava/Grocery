import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  Shield, 
  Truck,
  Award,
  Users,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Leaf,
  Package
} from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid.js';
import CategoryCarousel from '../components/products/CategoryCarousel.js';
import { productService } from '../services/productService.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch featured products
        const productsResponse = await productService.getFeaturedProducts();
        
        // Ensure we have an array
        const productsData = Array.isArray(productsResponse.data) 
          ? productsResponse.data 
          : (productsResponse.data?.products || []);
        
        setFeaturedProducts(productsData);
        
        // Mock categories for now
        const mockCategories = [
          { _id: '1', name: 'Fruits', slug: 'fruits', image: '🍎' },
          { _id: '2', name: 'Vegetables', slug: 'vegetables', image: '🥦' },
          { _id: '3', name: 'Dairy & Eggs', slug: 'dairy', image: '🥛' },
          { _id: '4', name: 'Bakery', slug: 'bakery', image: '🍞' },
          { _id: '5', name: 'Beverages', slug: 'beverages', image: '🥤' },
          { _id: '6', name: 'Snacks', slug: 'snacks', image: '🍿' },
        ];
        
        setCategories(mockCategories);
        
      } catch (error) {
        console.error('Error fetching home data:', error);
        setError('Failed to load featured products');
        setFeaturedProducts([]); // Ensure it's always an array
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const features = [
    {
      icon: Clock,
      title: 'Lightning Fast Delivery',
      description: 'Get your groceries delivered in under 30 minutes',
      color: 'text-blue-600 bg-blue-100',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Farm-fresh products with 100% quality assurance',
      color: 'text-green-600 bg-green-100',
      gradient: 'from-green-400 to-green-600'
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive prices with daily discounts and offers',
      color: 'text-yellow-600 bg-yellow-100',
      gradient: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₹500',
      color: 'text-purple-600 bg-purple-100',
      gradient: 'from-purple-400 to-purple-600'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers', icon: Users },
    { number: '500+', label: 'Products', icon: ShoppingBag },
    { number: '30min', label: 'Avg. Delivery', icon: Clock },
    { number: '24/7', label: 'Support', icon: Shield }
  ];

  // Ensure featuredProducts is always an array before slicing
  const displayProducts = Array.isArray(featuredProducts) ? featuredProducts.slice(0, 8) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-green-50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-green-500/10"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
                <Leaf className="text-green-600 mr-2" size={18} />
                <span className="text-sm font-medium text-gray-700">100% Fresh Products</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Fresh Groceries <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-500">Delivered Fast</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Shop from our wide selection of fresh fruits, vegetables, dairy, and more. Get everything you need delivered right to your doorstep in under 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-green-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingBag size={20} className="mr-2" />
                  <span>Shop Now</span>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-full flex items-center justify-center mr-4">
                      <Package className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Special Offer</h3>
                      <p className="text-gray-600">Get 20% off on your first order</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3" size={20} />
                      <span className="text-gray-700">Fresh produce from local farms</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3" size={20} />
                      <span className="text-gray-700">No-contact delivery</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3" size={20} />
                      <span className="text-gray-700">30-minute delivery guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary-200 to-green-200 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-50 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                <Sparkles className="text-white" size={24} />
              </div>
              <span className="text-primary-600 font-semibold text-lg">Why Choose FreshMart?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The Fresh Way to Shop
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're committed to providing the best grocery shopping experience with quality, speed, and convenience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-3xl bg-white shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                    <span className="mr-2">Learn more</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <span className="text-primary-600 font-semibold text-lg">Categories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of fresh products
            </p>
          </motion.div>

          <CategoryCarousel 
            categories={categories}
            onCategorySelect={(category) => {
              // Navigate to products page with category filter
              window.location.href = `/products?category=${category.slug}`;
            }}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                <Star className="text-white" size={24} />
              </div>
              <span className="text-primary-600 font-semibold text-lg">Featured</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Fresh Picks For You
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked products just for you
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-2xl max-w-2xl mx-auto">
              <div className="text-red-500 text-lg font-medium mb-2">
                {error}
              </div>
              <p className="text-gray-600">
                Failed to load featured products. Please try again later.
              </p>
            </div>
          ) : (
            <ProductGrid 
              products={displayProducts}
              isLoading={false}
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link
              to="/products"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ShoppingBag size={24} className="mr-2" />
              <span>View All Products</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mb-32"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              We're proud of our achievements and the trust our customers place in us
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 h-full">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-90">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="text-white" size={24} />
              </div>
              <span className="text-primary-600 font-semibold text-lg">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your groceries in 3 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Browse & Select',
                description: 'Choose from 500+ fresh products',
                icon: '🛒',
                color: 'from-blue-400 to-blue-600'
              },
              {
                step: '2',
                title: 'Checkout',
                description: 'Secure payment and fast checkout',
                icon: '💳',
                color: 'from-purple-400 to-purple-600'
              },
              {
                step: '3',
                title: 'Quick Delivery',
                description: 'Get delivery in 30 minutes',
                icon: '🚚',
                color: 'from-green-400 to-green-600'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent -z-10"></div>
                )}
                <div className="bg-white rounded-3xl shadow-xl p-8 h-full hover:shadow-2xl transition-shadow duration-300">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg`}>
                    {item.icon}
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mb-32"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy customers who trust us for their daily grocery needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingBag size={24} className="mr-2" />
                <span>Start Shopping Now</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
              >
                <span>Learn More</span>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;