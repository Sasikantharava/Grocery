import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  User,
  Phone,
  Calendar,
  Navigation
} from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner.js';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Mock order data
  const mockOrder = {
    _id: id,
    orderId: 'ORD123456',
    orderStatus: 'out-for-delivery',
    createdAt: new Date('2024-01-16T10:30:00'),
    estimatedDelivery: new Date('2024-01-16T11:15:00'),
    items: [
      { product: { name: 'Fresh Apples' }, quantity: 2 },
      { product: { name: 'Bananas' }, quantity: 1 },
      { product: { name: 'Milk' }, quantity: 1 }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001',
      phone: '+91 9876543210'
    },
    deliveryPartner: {
      name: 'Raj Sharma',
      phone: '+91 9876543211',
      vehicleType: 'bike',
      vehicleNumber: 'MH01AB1234'
    },
    tracking: {
      currentLocation: {
        lat: 19.0760,
        lng: 72.8777,
        address: 'Near Bandra Station, Mumbai'
      }
    }
  };

  const timelineSteps = [
    { status: 'pending', label: 'Order Placed', time: '10:30 AM', icon: Package },
    { status: 'confirmed', label: 'Order Confirmed', time: '10:32 AM', icon: CheckCircle2 },
    { status: 'preparing', label: 'Preparing Order', time: '10:45 AM', icon: Package },
    { status: 'out-for-delivery', label: 'Out for Delivery', time: '11:00 AM', icon: Truck },
    { status: 'delivered', label: 'Delivered', time: null, icon: CheckCircle2 }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder(mockOrder);
      setIsLoading(false);
    }, 1500);

    // Simulate live location updates
    const interval = setInterval(() => {
      if (order?.tracking?.currentLocation) {
        setCurrentLocation(prev => ({
          ...prev,
          lat: prev.lat + 0.001,
          lng: prev.lng + 0.001
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  const getCurrentStepIndex = () => {
    return timelineSteps.findIndex(step => step.status === order?.orderStatus);
  };

  const getTimeRemaining = () => {
    if (!order?.estimatedDelivery) return null;
    
    const now = new Date();
    const delivery = new Date(order.estimatedDelivery);
    const diff = delivery - now;
    
    if (diff <= 0) return 'Arriving any moment';
    
    const minutes = Math.floor(diff / 60000);
    return `Arriving in ${minutes} minutes`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'from-green-500 to-green-600';
      case 'out-for-delivery':
        return 'from-blue-500 to-blue-600';
      case 'preparing':
      case 'confirmed':
        return 'from-orange-500 to-orange-600';
      case 'cancelled':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h1>
            <p className="text-gray-600">
              The order you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600 text-lg">
            Order #{order.orderId} • Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Order Status
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getStatusColor(order.orderStatus)} animate-pulse`}></div>
                    <p className="text-gray-600 text-lg">
                      {getTimeRemaining()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(order.orderStatus)} text-white font-bold text-lg`}>
                    {order.orderStatus.replace(/-/g, ' ').toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Estimated: {new Date(order.estimatedDelivery).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {timelineSteps.map((step, index) => (
                  <div key={step.status} className="flex items-start space-x-4 mb-8 last:mb-0">
                    {/* Timeline Dot */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        index <= currentStepIndex
                          ? `bg-gradient-to-r ${getStatusColor(order.orderStatus)} border-transparent text-white shadow-lg`
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        {index < currentStepIndex ? (
                          <CheckCircle2 size={24} />
                        ) : (
                          <step.icon size={24} />
                        )}
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div className={`w-1 h-16 ${
                          index < currentStepIndex 
                            ? `bg-gradient-to-b ${getStatusColor(order.orderStatus)}` 
                            : 'bg-gray-300'
                        }`} />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`font-bold text-lg ${
                            index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.label}
                          </h3>
                          {step.time && (
                            <p className="text-gray-500 text-sm mt-1">
                              {step.time}
                            </p>
                          )}
                        </div>
                        {index === currentStepIndex && (
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getStatusColor(order.orderStatus)} animate-pulse`}></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Delivery Partner Info */}
            {order.deliveryPartner && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Delivery Partner
                </h2>
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900">
                      {order.deliveryPartner.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-600 mt-1">
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {order.deliveryPartner.vehicleType.toUpperCase()}
                      </div>
                      <span>{order.deliveryPartner.vehicleNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 mt-2">
                      <Phone size={18} />
                      <span>{order.deliveryPartner.phone}</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                    Call
                  </button>
                </div>
              </motion.div>
            )}

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-green-100 rounded-xl flex items-center justify-center">
                        <Package className="text-primary-600" size={24} />
                      </div>
                      <span className="font-medium text-gray-900 text-lg">
                        {item.product.name}
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
                      Qty: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <MapPin size={24} className="text-primary-600" />
                <span>Delivery Address</span>
              </h2>
              <div className="space-y-3">
                <p className="font-bold text-gray-900 text-lg">
                  {order.shippingAddress.name}
                </p>
                <div className="flex items-start space-x-2 text-gray-600">
                  <MapPin size={18} className="mt-1 text-primary-500" />
                  <p>
                    {order.shippingAddress.street}
                  </p>
                </div>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}
                </p>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone size={18} className="text-primary-500" />
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>
            </motion.div>

            {/* Live Tracking Map (Placeholder) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Navigation size={24} className="text-primary-600" />
                <span>Live Tracking</span>
              </h2>
              <div className="bg-gradient-to-br from-primary-50 to-green-50 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/30 rounded-full -ml-12 -mb-12"></div>
                <div className="text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="text-white" size={32} />
                  </div>
                  <p className="text-gray-900 font-medium">
                    {order.tracking.currentLocation.address}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Last updated: Just now
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl border border-blue-200 p-8"
            >
              <h3 className="font-bold text-blue-900 mb-4 text-lg">
                Need Help?
              </h3>
              <div className="space-y-3 text-blue-800 mb-6">
                <p className="flex items-center space-x-2">
                  <span>•</span>
                  <span>Delivery running late?</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>•</span>
                  <span>Wrong item delivered?</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>•</span>
                  <span>Issue with order?</span>
                </p>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                Contact Support
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;