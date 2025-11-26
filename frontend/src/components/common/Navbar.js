import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X,
  LogOut,
  Package,
  Heart,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import SearchBar from './SearchBar.js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Offers', path: '/offers', badge: 'New' },
    { name: 'About', path: '/about' },
    { name: 'Help', path: '/help' },
  ];

  const userMenuItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Orders', path: '/orders', icon: Package },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100' 
            : 'bg-gradient-to-r from-primary-600/90 to-green-500/90 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <span className="bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent font-bold text-lg">FM</span>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  />
                </div>
                <span className={`font-bold text-xl ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  FreshMart
                </span>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 group ${
                    location.pathname === item.path
                      ? isScrolled 
                        ? 'bg-primary-50 text-primary-600 shadow-sm' 
                        : 'bg-white/20 text-white'
                      : isScrolled 
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-primary-600' 
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 ${
                      isScrolled ? 'bg-primary-600' : 'bg-white'
                    }`}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                  isScrolled 
                    ? 'text-gray-600 hover:bg-gray-100 hover:shadow-md' 
                    : 'text-white/90 hover:bg-white/10 hover:shadow-md'
                }`}
              >
                <Search size={20} />
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  whileHover={{ backgroundColor: isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              {/* Cart */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  to="/cart"
                  className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                    isScrolled 
                      ? 'text-gray-600 hover:bg-gray-100 hover:shadow-md' 
                      : 'text-white/90 hover:bg-white/10 hover:shadow-md'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* User Menu / Login */}
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center space-x-2 p-2.5 rounded-xl transition-all duration-200 ${
                      isScrolled 
                        ? 'text-gray-700 hover:bg-gray-100 hover:shadow-md' 
                        : 'text-white/90 hover:bg-white/10 hover:shadow-md'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                    />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-10"
                          onClick={() => setIsUserMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 overflow-hidden"
                        >
                          <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-green-50 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">
                              {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </p>
                          </div>
                          
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                                <item.icon size={16} className="text-gray-600" />
                              </div>
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          ))}
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                              <LogOut size={16} />
                            </div>
                            <span>Logout</span>
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                      isScrolled 
                        ? 'text-gray-700 hover:bg-gray-100' 
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="relative group overflow-hidden bg-white text-primary-600 px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Sign Up
                    </span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${
                  isScrolled 
                    ? 'text-gray-600 hover:bg-gray-100 hover:shadow-md' 
                    : 'text-white/90 hover:bg-white/10 hover:shadow-md'
                }`}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                  
                  {!isAuthenticated && (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-primary-600 to-green-500 text-white text-center shadow-md"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;