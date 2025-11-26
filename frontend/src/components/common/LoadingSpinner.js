import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'medium', 
  className = '',
  color = 'primary',
  text = '',
  overlay = false
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-14 h-14',
    xlarge: 'w-20 h-20',
  };

  const colorClasses = {
    primary: 'border-t-primary-500',
    secondary: 'border-t-gray-600',
    success: 'border-t-green-500',
    warning: 'border-t-yellow-500',
    danger: 'border-t-red-500',
    info: 'border-t-blue-500',
    gradient: 'border-t-transparent bg-gradient-to-r from-primary-500 to-green-500',
  };

  const spinnerVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const SpinnerComponent = () => (
    <div className="relative">
      {/* Outer glow effect */}
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate="animate"
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full ${
          color === 'gradient' 
            ? 'bg-gradient-to-r from-primary-200 to-green-200' 
            : color === 'primary'
              ? 'bg-primary-100'
              : 'bg-gray-100'
        } opacity-30 blur-xl`}
      />
      
      {/* Main spinner */}
      <motion.div
        variants={spinnerVariants}
        initial="initial"
        animate="animate"
        className={`${sizeClasses[size]} relative rounded-full border-4 border-gray-100 ${colorClasses[color]}`}
      >
        {/* Inner decorative element */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20" />
        
        {/* Center dot for visual interest */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          size === 'small' ? 'w-1 h-1' : 
          size === 'medium' ? 'w-1.5 h-1.5' : 
          size === 'large' ? 'w-2 h-2' : 'w-3 h-3'
        } ${
          color === 'gradient' 
            ? 'bg-gradient-to-r from-primary-500 to-green-500' 
            : color === 'primary'
              ? 'bg-primary-500'
              : 'bg-gray-600'
        } rounded-full`} />
      </motion.div>

      {/* Orbiting dots for extra visual interest */}
      {size !== 'small' && (
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]}`}
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`${
              size === 'medium' ? 'w-1.5 h-1.5' : 
              size === 'large' ? 'w-2 h-2' : 'w-2.5 h-2.5'
            } ${
              color === 'gradient' 
                ? 'bg-gradient-to-r from-primary-400 to-green-400' 
                : color === 'primary'
                  ? 'bg-primary-400'
                  : 'bg-gray-400'
            } rounded-full`} />
          </div>
        </motion.div>
      )}
    </div>
  );

  const Content = () => (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`flex flex-col items-center justify-center ${className}`}
    >
      <SpinnerComponent />
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mt-4 ${
            size === 'small' ? 'text-sm' : 
            size === 'medium' ? 'text-base' : 
            size === 'large' ? 'text-lg' : 'text-xl'
          } font-medium text-gray-600`}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  if (overlay) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      >
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <Content />
        </div>
      </motion.div>
    );
  }

  return <Content />;
};

export default LoadingSpinner;