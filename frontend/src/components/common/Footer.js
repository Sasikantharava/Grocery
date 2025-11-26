import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Handle subscription logic here
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', path: '/products' },
        { name: 'Fruits & Vegetables', path: '/products?category=fruits' },
        { name: 'Dairy & Eggs', path: '/products?category=dairy' },
        { name: 'Bakery', path: '/products?category=bakery' },
        { name: 'Beverages', path: '/products?category=beverages' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'Contact Us', path: '/help' },
        { name: 'FAQ', path: '/help#faq' },
        { name: 'Shipping Info', path: '/help#shipping' },
        { name: 'Returns', path: '/help#returns' },
        { name: 'Privacy Policy', path: '/privacy' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Blog', path: '/blog' },
        { name: 'Press Kit', path: '/press' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  const features = [
    { icon: Shield, text: 'Quality Assured' },
    { icon: Truck, text: 'Fast Delivery' },
    { icon: Award, text: 'Best Prices' },
    { icon: Clock, text: '24/7 Support' }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'PayPal', icon: '🅿️' },
    { name: 'Google Pay', icon: '📱' },
    { name: 'Apple Pay', icon: '🍎' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-lg">FM</span>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  />
                </div>
                <span className="font-bold text-2xl">FreshMart</span>
              </Link>
              <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                Your trusted partner for fresh groceries delivered fast. 
                Quality products, competitive prices, and exceptional service.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <a href="tel:+15551234567" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <Phone size={18} />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </a>
                <a href="mailto:support@freshmart.com" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <span>support@freshmart.com</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <span>123 Grocery St, Food City</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-6 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-all duration-200 flex items-center group"
                    >
                      <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-6 text-white">Stay Updated</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Subscribe to get special offers, free giveaways, and exclusive deals.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-primary-500 to-green-500 rounded-lg flex items-center justify-center text-white hover:shadow-lg transition-all duration-200"
                  >
                    <Send size={16} />
                  </button>
                </div>
                {isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-green-400 text-sm"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Subscribed successfully!
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                  <feature.icon size={20} className="text-primary-400" />
                </div>
                <span className="text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} FreshMart. All rights reserved.
            </motion.p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-lg hover:bg-gray-700 transition-colors"
                    title={method.name}
                  >
                    {method.icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* App Download Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-green-500 relative z-10"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="font-bold text-white text-xl mb-2 flex items-center">
                <Sparkles className="mr-2" size={24} />
                Get the FreshMart App
              </h3>
              <p className="text-green-100 max-w-md">
                Faster deliveries and exclusive app-only deals. Download now and get 20% off your first order!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>📱</span>
                <span>App Store</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>🤖</span>
                <span>Play Store</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;