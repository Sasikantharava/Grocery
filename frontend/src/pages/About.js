import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Shield, 
  Award, 
  Users,
  Heart,
  Globe,
  Star,
  Clock,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: Users },
    { number: '500+', label: 'Products', icon: ShoppingBag },
    { number: '10+', label: 'Cities', icon: Globe },
    { number: '30min', label: 'Avg. Delivery', icon: Clock }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else.',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every product is carefully selected and quality checked.',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Your groceries delivered fresh in under 30 minutes.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We are committed to eco-friendly practices and packaging.',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const team = [
    {
      name: 'Aarav Sharma',
      role: 'Founder & CEO',
      image: '/api/placeholder/200/200',
      description: 'Passionate about revolutionizing grocery shopping experience.'
    },
    {
      name: 'Priya Patel',
      role: 'Head of Operations',
      image: '/api/placeholder/200/200',
      description: 'Ensuring smooth operations and customer satisfaction.'
    },
    {
      name: 'Rohan Kumar',
      role: 'Technology Lead',
      image: '/api/placeholder/200/200',
      description: 'Building scalable and reliable technology solutions.'
    },
    {
      name: 'Neha Gupta',
      role: 'Product Manager',
      image: '/api/placeholder/200/200',
      description: 'Curating best products for our customers.'
    }
  ];

  const milestones = [
    { year: '2023', title: 'FreshMart Founded', description: 'Started with a vision to revolutionize grocery shopping' },
    { year: '2023', title: 'First 1000 Customers', description: 'Reached our first milestone within 3 months' },
    { year: '2024', title: 'Expanded to 10 Cities', description: 'Grew our presence across multiple cities' },
    { year: '2024', title: 'Launched Mobile App', description: 'Introduced our mobile app for better user experience' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-green-500 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} className="mr-2" />
              About FreshMart
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Delivering Freshness,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-100 to-white">One Order at a Time</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to make grocery shopping convenient, reliable, and delightful. 
              Fresh groceries delivered to your doorstep in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-primary-600" size={28} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                From a Simple Idea to a Trusted Platform
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  FreshMart was born from a simple idea: grocery shopping should be convenient, 
                  reliable, and stress-free. Founded in 2023, we set out to revolutionize the 
                  way people buy groceries.
                </p>
                <p>
                  What started as a small team passionate about quality and service has grown 
                  into a trusted platform serving thousands of customers across multiple cities. 
                  We work directly with farmers and trusted suppliers to bring you the freshest 
                  products at the best prices.
                </p>
                <p>
                  Today, we're proud to be your reliable partner for daily grocery needs, 
                  committed to making your life easier one delivery at a time.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/api/placeholder/300/300"
                  alt="Fresh produce"
                  className="rounded-2xl shadow-lg w-full"
                />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/api/placeholder/300/400"
                  alt="Delivery team"
                  className="rounded-2xl shadow-lg w-full"
                />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/api/placeholder/300/400"
                  alt="Happy customer"
                  className="rounded-2xl shadow-lg w-full"
                />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="/api/placeholder/300/400"
                  alt="Quality check"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Principles That Guide Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values are at the heart of everything we do at FreshMart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Journey
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Milestones
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The important moments that shaped FreshMart
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-primary-600">{milestone.year}</span>
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="text-primary-600" size={20} />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Our Team
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet the People Behind FreshMart
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals driving our mission forward
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-green-500/20 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-green-500 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Award size={64} className="mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-xl opacity-90 leading-relaxed mb-8 max-w-3xl mx-auto">
                To make fresh, high-quality groceries accessible to everyone through 
                technology-driven solutions that save time, reduce stress, and enhance 
                the overall shopping experience.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
              >
                <Truck size={32} className="mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="opacity-90">In under 30 minutes</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
              >
                <Shield size={32} className="mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                <p className="opacity-90">Freshness assured</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl"
              >
                <Users size={32} className="mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                <p className="opacity-90">Your satisfaction matters</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join the FreshMart Family
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the convenience of fast, reliable grocery delivery. 
              Join thousands of satisfied customers who trust us for their daily needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingBag size={20} />
                <span>Start Shopping</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/app"
                className="group inline-flex items-center justify-center space-x-2 bg-white text-primary-600 border-2 border-primary-200 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 20a10 10 0 01-10-10 10 10 0 0110 0 4.93 2.83 3.83 3.83 3.83 3.83 3.83 3.83 3.83-4.93 10-10 0 01-10-10z" />
                  <path d="M14.24 8.44l-1.41-1.41L10 9.58 2.83 2.83 1.41-1.41L14.24 8.44z" />
                  <path d="M10 2v6h2V2h-2z" />
                </svg>
                <span>Download App</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;