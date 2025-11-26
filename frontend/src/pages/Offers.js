import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Tag, 
  Clock, 
  Star, 
  ShoppingBag,
  CheckCircle2,
  Gift,
  Percent,
  Sparkles
} from 'lucide-react';

const Offers = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Offers', icon: Tag },
    { id: 'discount', name: 'Discounts', icon: Percent },
    { id: 'cashback', name: 'Cashback', icon: Gift },
    { id: 'free', name: 'Free Delivery', icon: ShoppingBag },
    { id: 'first', name: 'First Order', icon: Star }
  ];

  const offers = [
    {
      id: 1,
      title: 'First Order Special',
      description: 'Get 50% off on your first order above ₹199',
      code: 'WELCOME50',
      discount: '50%',
      type: 'discount',
      validUntil: '2024-12-31',
      minOrder: 199,
      category: 'first',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Free Delivery',
      description: 'Free delivery on all orders above ₹500',
      code: 'FREEDEL500',
      discount: 'Free Delivery',
      type: 'free',
      validUntil: '2024-12-31',
      minOrder: 500,
      category: 'free',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Weekend Special',
      description: 'Flat ₹100 off on orders above ₹799',
      code: 'WEEKEND100',
      discount: '₹100 OFF',
      type: 'discount',
      validUntil: '2024-12-31',
      minOrder: 799,
      category: 'discount',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      title: 'Cashback Offer',
      description: 'Get 10% cashback in your wallet',
      code: 'CASHBACK10',
      discount: '10% Cashback',
      type: 'cashback',
      validUntil: '2024-12-31',
      minOrder: 299,
      category: 'cashback',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Fruits Festival',
      description: '20% off on all fresh fruits',
      code: 'FRUIT20',
      discount: '20% OFF',
      type: 'discount',
      validUntil: '2024-12-31',
      minOrder: 0,
      category: 'discount',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 6,
      title: 'Dairy Delight',
      description: 'Buy 2 dairy products get 1 free',
      code: 'DAIRYFREE',
      discount: 'Buy 2 Get 1',
      type: 'discount',
      validUntil: '2024-12-31',
      minOrder: 0,
      category: 'discount',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const filteredOffers = activeCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeCategory);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    // You can add a toast notification here
    alert(`Coupon code ${code} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-green-500 rounded-full mb-4">
            <Sparkles size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Special Offers & Deals
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing discounts and offers to save more on your grocery shopping
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <category.icon size={18} />
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
            >
              {/* Offer Header */}
              <div className={`bg-gradient-to-r ${offer.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Tag size={24} />
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {offer.discount}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-white/90">{offer.description}</p>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6">
                {/* Validity */}
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <Clock size={18} />
                  <span className="text-sm font-medium">
                    Valid until {new Date(offer.validUntil).toLocaleDateString()}
                  </span>
                </div>

                {/* Minimum Order */}
                {offer.minOrder > 0 && (
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <p className="text-sm text-gray-600 text-center font-medium">
                      Minimum order: <span className="font-bold text-gray-900">₹{offer.minOrder}</span>
                    </p>
                  </div>
                )}

                {/* Coupon Code */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Coupon Code:
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={offer.code}
                      readOnly
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 font-mono font-bold text-center"
                    />
                    <button
                      onClick={() => copyToClipboard(offer.code)}
                      className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Applicable on selected items</p>
                  <p>• Cannot be combined with other offers</p>
                  <p>• Terms and conditions apply</p>
                </div>
              </div>

              {/* Apply Button */}
              <div className="p-4 border-t border-gray-100">
                <button className="w-full bg-gradient-to-r from-primary-500 to-green-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <ShoppingBag size={20} />
                  <span>Shop Now</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Offers Message */}
        {filteredOffers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Tag size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No offers available
            </h3>
            <p className="text-gray-600">
              Check back later for new offers and deals
            </p>
          </motion.div>
        )}

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-green-500 rounded-3xl p-10 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <Star className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Never Miss a Deal!
            </h2>
            <p className="text-white/90 mb-8 max-w-md mx-auto text-lg">
              Subscribe to our newsletter and be the first to know about exclusive offers and discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Offers;