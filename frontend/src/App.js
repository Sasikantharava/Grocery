import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/common/Navbar.js';
import Footer from './components/common/Footer.js';
import PageTransition from './components/animations/PageTransition.js';
import LoadingSpinner from './components/common/LoadingSpinner.js';

// Pages
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Products from './pages/Products.js';
import ProductDetail from './pages/ProductDetail.js';
import Cart from './pages/Cart.js';
import Checkout from './pages/Checkout.js';
import Profile from './pages/Profile.js';
import Orders from './pages/Orders.js';
import OrderTracking from './pages/OrderTracking.js';
import Offers from './pages/Offers.js';
import Help from './pages/Help.js';
import About from './pages/About.js';

// Hooks
import { useAuth } from './hooks/useAuth.js';

function App() {
  const { isLoading, checkAuth, isAuthenticated } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };

    // Only check auth once on app load
    if (!authChecked) {
      initializeAuth();
    }
  }, [checkAuth, authChecked]);

  // Show loading spinner only during initial auth check
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <Home />
              </PageTransition>
            } />
            
            <Route path="/login" element={
              <PageTransition>
                <Login />
              </PageTransition>
            } />
            
            <Route path="/signup" element={
              <PageTransition>
                <Signup />
              </PageTransition>
            } />
            
            <Route path="/products" element={
              <PageTransition>
                <Products />
              </PageTransition>
            } />
            
            <Route path="/products/:id" element={
              <PageTransition>
                <ProductDetail />
              </PageTransition>
            } />
            
            <Route path="/cart" element={
              <PageTransition>
                <Cart />
              </PageTransition>
            } />
            
            <Route path="/checkout" element={
              <PageTransition>
                <Checkout />
              </PageTransition>
            } />
            
            <Route path="/profile" element={
              <PageTransition>
                <Profile />
              </PageTransition>
            } />
            
            <Route path="/orders" element={
              <PageTransition>
                <Orders />
              </PageTransition>
            } />
            
            <Route path="/orders/:id/tracking" element={
              <PageTransition>
                <OrderTracking />
              </PageTransition>
            } />
            
            <Route path="/offers" element={
              <PageTransition>
                <Offers />
              </PageTransition>
            } />
            
            <Route path="/help" element={
              <PageTransition>
                <Help />
              </PageTransition>
            } />
            
            <Route path="/about" element={
              <PageTransition>
                <About />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;