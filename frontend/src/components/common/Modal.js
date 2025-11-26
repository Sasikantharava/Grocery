import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  variant = 'default',
  className = ''
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const variantClasses = {
    default: 'bg-white',
    success: 'bg-gradient-to-br from-green-50 to-emerald-50',
    warning: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    error: 'bg-gradient-to-br from-red-50 to-pink-50',
    info: 'bg-gradient-to-br from-blue-50 to-indigo-50',
  };

  const headerIconClasses = {
    default: null,
    success: 'text-green-500 bg-green-100',
    warning: 'text-yellow-500 bg-yellow-100',
    error: 'text-red-500 bg-red-100',
    info: 'text-blue-500 bg-blue-100',
  };

  const getHeaderIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle size={24} />;
      case 'warning':
        return <AlertTriangle size={24} />;
      case 'error':
        return <AlertCircle size={24} />;
      case 'info':
        return <Info size={24} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeOnOverlayClick ? onClose : undefined}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`${variantClasses[variant]} rounded-3xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden border border-gray-100 ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    {variant !== 'default' && (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${headerIconClasses[variant]}`}>
                        {getHeaderIcon()}
                      </div>
                    )}
                    <h2 className="text-xl font-bold text-gray-900">
                      {title}
                    </h2>
                  </div>
                  {showCloseButton && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              )}
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                {children}
              </div>

              {/* Footer (optional) */}
              {variant !== 'default' && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                        variant === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' :
                        variant === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
                        variant === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' :
                        'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      Got it
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;