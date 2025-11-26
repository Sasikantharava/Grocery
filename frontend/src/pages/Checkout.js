import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  CreditCard,
  Wallet,
  Truck,
  MapPin,
  Shield,
  CheckCircle2,
  Home,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { useCart } from '../hooks/useCart.js';
import { useAuth } from '../hooks/useAuth.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { items, totalPrice, discount, getCartSummary, clearUserCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [useWallet, setUseWallet] = useState(false);

  // Form states
  const [addressForm, setAddressForm] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    landmark: ''
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    // Load user's default address if available
    if (user?.addresses?.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [isAuthenticated, items, user, navigate]);

  const cartSummary = getCartSummary();

  const addresses = user?.addresses || [];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay using your card',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: '📱',
      description: 'Pay using UPI apps',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: Wallet,
      description: `Pay using wallet balance (₹${user?.wallet?.balance || 0})`,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: '💵',
      description: 'Pay when you receive your order',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const steps = [
    { number: 1, title: 'Address', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Shield }
  ];

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: selectedAddress || addressForm,
        paymentMethod,
        useWallet,
        couponCode: null // Add coupon logic if needed
      };

      // Here you would call your order service
      console.log('Order data:', orderData);
      
      // Simulate successful order
      toast.success('Order placed successfully!');
      await clearUserCart();
      navigate('/orders');
      
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addNewAddress = () => {
    const newAddress = {
      _id: Date.now().toString(),
      ...addressForm,
      isDefault: addresses.length === 0
    };
    // In a real app, you would save this to the user's addresses
    setSelectedAddress(newAddress);
    setActiveStep(2);
  };

  if (!isAuthenticated || items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Complete your order in a few simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-6"
            >
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      activeStep >= step.number
                        ? 'bg-gradient-to-r from-primary-500 to-green-500 border-primary-500 text-white shadow-lg'
                        : 'border-gray-300 text-gray-500 bg-white'
                    }`}>
                      {activeStep > step.number ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <step.icon size={24} />
                      )}
                    </div>
                    <span className={`ml-3 font-semibold ${
                      activeStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-1 mx-4 rounded-full ${
                        activeStep > step.number ? 'bg-gradient-to-r from-primary-500 to-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Step 1: Address Selection */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Select Delivery Address
                    </h2>
                    <p className="text-gray-600">Choose where you want your order delivered</p>
                  </div>
                </div>

                {/* Saved Addresses */}
                {addresses.length > 0 && (
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-gray-900 text-lg">Saved Addresses</h3>
                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        onClick={() => setSelectedAddress(address)}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedAddress?._id === address._id
                            ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-green-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 ${
                              selectedAddress?._id === address._id
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedAddress?._id === address._id && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-lg">
                                {address.name}
                                {address.isDefault && (
                                  <span className="ml-2 text-xs bg-gradient-to-r from-primary-500 to-green-500 text-white px-2 py-1 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center mt-1 text-gray-600">
                                <Home size={16} className="mr-2" />
                                <p>
                                  {address.street}, {address.city}, {address.state} - {address.pinCode}
                                </p>
                              </div>
                              <div className="flex items-center mt-1 text-gray-600">
                                <Phone size={16} className="mr-2" />
                                <p>{address.phone}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add New Address Form */}
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">
                    {addresses.length > 0 ? 'Add New Address' : 'Enter Delivery Address'}
                  </h3>
                  
                  <form onSubmit={handleAddressSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            value={addressForm.name}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="tel"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Street Address
                        </label>
                        <div className="relative">
                          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            value={addressForm.street}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, street: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          value={addressForm.pinCode}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, pinCode: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          value={addressForm.landmark}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, landmark: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-8">
                      <button
                        type="button"
                        onClick={addNewAddress}
                        className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        Use This Address
                      </button>
                      {selectedAddress && (
                        <button
                          type="button"
                          onClick={() => setActiveStep(2)}
                          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                        >
                          Use Selected Address
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment Method */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Select Payment Method
                    </h2>
                    <p className="text-gray-600">Choose your preferred payment option</p>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-green-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}>
                            {typeof method.icon === 'string' ? (
                              <span className="text-2xl">{method.icon}</span>
                            ) : (
                              <method.icon size={24} />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-lg">
                              {method.name}
                            </div>
                            <div className="text-gray-600">
                              {method.description}
                            </div>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-gray-300'
                        }`}>
                          {paymentMethod === method.id && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Wallet Usage */}
                {user?.wallet?.balance > 0 && paymentMethod !== 'wallet' && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={useWallet}
                        onChange={(e) => setUseWallet(e.target.checked)}
                        className="rounded text-primary-500 focus:ring-primary-500 w-5 h-5"
                      />
                      <span className="text-gray-700 font-medium">
                        Use wallet balance (₹{user.wallet.balance})
                      </span>
                    </label>
                  </div>
                )}

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-5">
                    <h3 className="font-semibold text-gray-900 text-lg">Card Details</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Continue to Review
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Order Review */}
            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-green-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Review Your Order
                    </h2>
                    <p className="text-gray-600">Confirm your order details before payment</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg">Order Items</h3>
                  {items.map((item) => (
                    <div key={item.product._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                        <p className="text-gray-600 text-sm">
                          {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">Delivery Address</h3>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start">
                      <MapPin className="text-primary-500 mr-3 mt-1" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {selectedAddress?.name}
                        </div>
                        <p className="text-gray-600">
                          {selectedAddress?.street}, {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pinCode}
                        </p>
                        <p className="text-gray-600">{selectedAddress?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">Payment Method</h3>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${
                        paymentMethods.find(m => m.id === paymentMethod)?.color
                      } flex items-center justify-center text-white mr-3`}>
                        {typeof paymentMethods.find(m => m.id === paymentMethod)?.icon === 'string' ? (
                          <span className="text-xl">{paymentMethods.find(m => m.id === paymentMethod)?.icon}</span>
                        ) : (
                          React.createElement(paymentMethods.find(m => m.id === paymentMethod)?.icon, { size: 20 })
                        )}
                      </div>
                      <div className="font-semibold text-gray-900">
                        {paymentMethods.find(m => m.id === paymentMethod)?.name}
                      </div>
                    </div>
                    {useWallet && (
                      <p className="text-gray-600 text-sm mt-2 ml-13">
                        Using wallet balance: ₹{user?.wallet?.balance}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <LoadingSpinner size="small" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Pay ₹${cartSummary.finalTotal}`
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 sticky top-4 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary-500 to-green-500 p-6 text-white">
                <h3 className="text-xl font-bold">Order Summary</h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({items.length})</span>
                  <span className="font-semibold">₹{cartSummary.itemsTotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className={cartSummary.deliveryFee === 0 ? 'text-green-600' : 'font-semibold'}>
                    {cartSummary.deliveryFee === 0 ? 'FREE' : `₹${cartSummary.deliveryFee}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax & Charges</span>
                  <span className="font-semibold">₹{cartSummary.tax}</span>
                </div>

                {useWallet && user?.wallet?.balance > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Wallet Used</span>
                    <span>-₹{Math.min(user.wallet.balance, cartSummary.finalTotal)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{cartSummary.finalTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center space-x-3 text-green-600">
                  <Truck size={20} />
                  <div>
                    <div className="font-medium">Free Delivery</div>
                    <div className="text-sm">On orders above ₹500</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;