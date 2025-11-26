import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CheckCircle } from 'lucide-react';

const AddToCartAnimation = ({ 
  isVisible, 
  productImage, 
  productName,
  onAnimationComplete 
}) => {
  const [animationStage, setAnimationStage] = useState('initial');

  useEffect(() => {
    if (isVisible) {
      setAnimationStage('flying');
      
      const timer = setTimeout(() => {
        setAnimationStage('landing');
        
        const finalTimer = setTimeout(() => {
          setAnimationStage('initial');
          onAnimationComplete?.();
        }, 600);
        
        return () => clearTimeout(finalTimer);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onAnimationComplete]);

  const flyingAnimation = {
    initial: {
      scale: 0.8,
      opacity: 0,
      x: 0,
      y: 0,
    },
    flying: {
      scale: [0.8, 1.2, 1],
      opacity: [0, 1, 1],
      x: [0, -100, -200],
      y: [0, -50, -100],
      transition: {
        duration: 0.8,
        times: [0, 0.5, 1],
      },
    },
    landing: {
      scale: [1, 0.5],
      opacity: [1, 0],
      x: -200,
      y: -100,
      transition: {
        duration: 0.6,
      },
    },
  };

  const notificationAnimation = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Flying Product Image */}
      <AnimatePresence>
        {isVisible && animationStage !== 'initial' && (
          <motion.div
            variants={flyingAnimation}
            initial="initial"
            animate={animationStage}
            exit="initial"
            className="fixed z-50 pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
            }}
          >
            <div className="w-12 h-12 bg-white rounded-xl shadow-2xl border border-gray-200 flex items-center justify-center">
              <img
                src={productImage || '/api/placeholder/48/48'}
                alt={productName}
                className="w-8 h-8 object-cover rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {isVisible && animationStage === 'landing' && (
          <motion.div
            variants={notificationAnimation}
            initial="initial"
            animate="visible"
            exit="exit"
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center space-x-2"
          >
            <CheckCircle size={20} />
            <span className="font-medium">Added to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddToCartAnimation;