import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Download, 
  Clock, 
  Star,
  Shield,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

// 3D Animated Sphere Component
const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.5}>
        <MeshDistortMaterial
          color="#22c55e"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
};

const AnimatedHero = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'In 30 minutes',
      emoji: '🚚'
    },
    {
      icon: Star,
      title: 'Fresh Quality',
      description: '100% Guaranteed',
      emoji: '⭐'
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Great discounts',
      emoji: '💰'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Auto-rotate features
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-green-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div
        className="container mx-auto px-4 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div className="text-center lg:text-left" variants={itemVariants}>
            <motion.div 
              className="inline-flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
              variants={itemVariants}
            >
              <Sparkles size={16} className="mr-2" />
              Fresh Groceries, Delivered Fast
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              Your Daily
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-500">Fresh Essentials</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-2xl"
              variants={itemVariants}
            >
              Get your favorite fruits, vegetables, dairy, and more delivered to your 
              doorstep in under 30 minutes. Quality guaranteed or your money back.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              variants={itemVariants}
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart size={20} />
                  <span>Start Shopping</span>
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 bg-white text-primary-600 border-2 border-primary-200 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all duration-300"
              >
                <Download size={20} />
                <span>Download App</span>
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`text-center lg:text-left p-4 rounded-2xl transition-all duration-300 ${
                      currentFeature === index ? 'bg-primary-50 shadow-md' : ''
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-center lg:justify-start space-x-3 mb-2">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-2xl">{feature.emoji}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Animation */}
          <motion.div 
            className="hidden lg:flex items-center justify-center"
            variants={itemVariants}
          >
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-green-100 rounded-3xl opacity-30 blur-2xl"></div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <AnimatedSphere />
                  <Environment preset="sunset" />
                </Canvas>
              </div>
              
              {/* Floating grocery items */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🍎</span>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white p-3 rounded-2xl shadow-xl"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🥛</span>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-8 bg-white p-3 rounded-2xl shadow-xl"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🥦</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedHero;