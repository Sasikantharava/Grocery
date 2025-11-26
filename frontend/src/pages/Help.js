import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Phone, 
  Mail, 
  MessageCircle,
  Truck,
  Package,
  CreditCard,
  Shield,
  ChevronDown,
  HelpCircle,
  Headphones
} from 'lucide-react';

const Help = () => {
  const [activeCategory, setActiveCategory] = useState('delivery');
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'delivery',
      name: 'Delivery',
      icon: Truck,
      color: 'text-blue-600 bg-blue-100',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: Package,
      color: 'text-green-600 bg-green-100',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'payments',
      name: 'Payments',
      icon: CreditCard,
      color: 'text-purple-600 bg-purple-100',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'account',
      name: 'Account',
      icon: Shield,
      color: 'text-orange-600 bg-orange-100',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const faqs = {
    delivery: [
      {
        question: 'What are your delivery areas?',
        answer: 'We currently deliver in major cities across India including Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, and Pune. We are continuously expanding our delivery network.'
      },
      {
        question: 'How long does delivery take?',
        answer: 'We offer express delivery within 30-45 minutes in most areas. Delivery time may vary based on your location and order size.'
      },
      {
        question: 'Is there a minimum order value for delivery?',
        answer: 'No minimum order value for delivery. However, orders below ₹500 have a delivery fee of ₹40. Free delivery is available on orders above ₹500.'
      },
      {
        question: 'Can I schedule delivery for later?',
        answer: 'Yes, you can schedule delivery for up to 3 days in advance during checkout.'
      }
    ],
    orders: [
      {
        question: 'How can I track my order?',
        answer: 'You can track your order in real-time from your orders page. We provide live tracking with delivery partner details and estimated arrival time.'
      },
      {
        question: 'Can I modify my order after placing it?',
        answer: 'You can modify your order within 5 minutes of placing it. After that, please contact our customer support for assistance.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'You can cancel your order free of charge before it is confirmed. Once confirmed, a cancellation fee may apply.'
      },
      {
        question: 'How do I return an item?',
        answer: 'We accept returns within 24 hours of delivery for damaged or incorrect items. Contact our support team to initiate a return.'
      }
    ],
    payments: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept credit/debit cards, UPI, net banking, digital wallets, and cash on delivery.'
      },
      {
        question: 'Is it safe to pay online?',
        answer: 'Yes, we use secure SSL encryption and PCI-compliant payment gateways to ensure your payment information is safe.'
      },
      {
        question: 'Can I use multiple payment methods?',
        answer: 'Yes, you can split your payment between wallet balance and other payment methods.'
      },
      {
        question: 'How do I get a refund?',
        answer: 'Refunds are processed to your original payment method within 5-7 business days. For wallet payments, refunds are instant.'
      }
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your registered email.'
      },
      {
        question: 'Can I have multiple addresses?',
        answer: 'Yes, you can save multiple delivery addresses and set one as default for faster checkout.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'You can update your profile information from the "Profile" section in your account settings.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we take data privacy seriously and comply with all data protection regulations. Your information is never shared with third parties without your consent.'
      }
    ]
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      details: '+1 (555) 123-4567',
      action: 'Call Now',
      color: 'text-blue-600 bg-blue-100',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email for detailed queries',
      details: 'support@freshmart.com',
      action: 'Send Email',
      color: 'text-green-600 bg-green-100',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      details: 'Available 24/7',
      action: 'Start Chat',
      color: 'text-purple-600 bg-purple-100',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const filteredFaqs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Headphones size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
            >
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Help Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-3 w-full p-4 rounded-xl transition-all ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r ' + category.gradient + ' text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeCategory === category.id
                        ? 'bg-white/20'
                        : category.color
                    }`}>
                      <category.icon size={20} />
                    </div>
                    <span className="font-semibold">{category.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mt-6"
            >
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Contact Support</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${method.gradient} flex items-center justify-center text-white`}>
                        <method.icon size={18} />
                      </div>
                      <span className="font-semibold text-gray-900">{method.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    <p className="text-sm font-medium text-gray-900 mb-3">{method.details}</p>
                    <button className={`w-full bg-gradient-to-r ${method.gradient} text-white py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all`}>
                      {method.action}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
            >
              <div className="flex items-center mb-8">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${
                  categories.find(cat => cat.id === activeCategory)?.gradient
                } flex items-center justify-center text-white mr-4`}>
                  {React.createElement(categories.find(cat => cat.id === activeCategory)?.icon, { size: 28 })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    Common questions about {categories.find(cat => cat.id === activeCategory)?.name.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="flex items-center justify-between w-full p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center pr-4">
                          <HelpCircle className={`mr-3 ${
                            openFaq === index
                              ? 'text-primary-500'
                              : 'text-gray-400'
                          }`} size={20} />
                          <span className="font-semibold text-gray-900">
                            {faq.question}
                          </span>
                        </div>
                        <ChevronDown
                          size={20}
                          className={`text-gray-400 transition-transform ${
                            openFaq === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 border-t border-gray-200 bg-gray-50">
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* No Results */}
                {filteredFaqs.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <Search size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search terms or browse different categories
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Still Need Help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 p-6 bg-gradient-to-r from-primary-50 to-green-50 rounded-2xl border border-primary-200"
              >
                <h3 className="font-bold text-primary-900 mb-3 text-lg">
                  Still need help?
                </h3>
                <p className="text-primary-800 mb-6">
                  Our customer support team is here to assist you with any questions or concerns.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                    Contact Support
                  </button>
                  <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-medium border border-primary-200 hover:bg-primary-50 transition-all">
                    Schedule Callback
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;