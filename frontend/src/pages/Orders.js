import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Search,
  Filter,
  ArrowRight,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock orders data - in real app, fetch from API
  const mockOrders = [
    {
      _id: '1',
      orderId: 'ORD123456',
      createdAt: new Date('2024-01-15'),
      items: [
        { product: { name: 'Fresh Apples', images: [{ url: '/api/placeholder/100/100' }] }, quantity: 2, price: 120 },
        { product: { name: 'Bananas', images: [{ url: '/api/placeholder/100/100' }] }, quantity: 1, price: 40 }
      ],
      orderStatus: 'delivered',
      priceSummary: { grandTotal: 200 },
      tracking: { deliveredAt: new Date('2024-01-15') }
    },
    {
      _id: '2',
      orderId: 'ORD123457',
      createdAt: new Date('2024-01-16'),
      items: [
        { product: { name: 'Milk', images: [{ url: '/api/placeholder/100/100' }] }, quantity: 1, price: 60 }
      ],
      orderStatus: 'out-for-delivery',
      priceSummary: { grandTotal: 60 }
    },
    {
      _id: '3',
      orderId: 'ORD123458',
      createdAt: new Date('2024-01-17'),
      items: [
        { product: { name: 'Bread', images: [{ url: '/api/placeholder/100/100' }] }, quantity: 2, price: 80 }
      ],
      orderStatus: 'preparing',
      priceSummary: { grandTotal: 80 }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="text-green-500" size={20} />;
      case 'out-for-delivery':
        return <Truck className="text-blue-500" size={20} />;
      case 'preparing':
      case 'confirmed':
        return <Package className="text-orange-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'out-for-delivery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing':
      case 'confirmed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusGradient = (status) => {
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

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.orderStatus === filter;
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => 
                           item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesFilter && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Please log in to view your orders
            </h1>
          </div>
        </div>
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
          <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Track and manage your orders
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-3">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="out-for-delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="large" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t placed any orders yet'
              }
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(order.orderStatus)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus.replace(/-/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-2" />
                        <p>
                          Order #{order.orderId} • {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{order.priceSummary.grandTotal}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-4">
                        <img
                          src={item.product.images[0]?.url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {item.product.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{item.price} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all flex items-center">
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all flex items-center">
                      Track Order
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                    {order.orderStatus === 'delivered' && (
                      <button className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all">
                        Rate & Review
                      </button>
                    )}
                    {['pending', 'confirmed'].includes(order.orderStatus) && (
                      <button className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-200 transition-all">
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;