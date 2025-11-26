import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X, Sparkles } from 'lucide-react';

const Toast = ({ toasts, removeToast }) => {
  // Auto-remove toasts after 5 seconds
  useEffect(() => {
    toasts.forEach(toast => {
      if (!toast.manualClose) {
        const timer = setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration || 5000);
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, removeToast]);

  const getIcon = (type) => {
    const iconClass = "w-6 h-6";
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'error':
        return <XCircle className={`${iconClass} text-red-500`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
      case 'info':
        return <Info className={`${iconClass} text-blue-500`} />;
      default:
        return <CheckCircle className={`${iconClass} text-green-500`} />;
    }
  };

  const getBackgroundStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
          border: 'border-green-200',
          progress: 'bg-green-500'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-pink-50',
          border: 'border-red-200',
          progress: 'bg-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-50 to-orange-50',
          border: 'border-yellow-200',
          progress: 'bg-yellow-500'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
          border: 'border-blue-200',
          progress: 'bg-blue-500'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
          border: 'border-green-200',
          progress: 'bg-green-500'
        };
    }
  };

  const getTitleStyles = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-900';
      case 'error':
        return 'text-red-900';
      case 'warning':
        return 'text-yellow-900';
      case 'info':
        return 'text-blue-900';
      default:
        return 'text-green-900';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast, index) => {
          const styles = getBackgroundStyles(toast.type);
          const titleStyle = getTitleStyles(toast.type);
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 400, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.1
                }
              }}
              exit={{ 
                opacity: 0, 
                x: 400, 
                scale: 0.8,
                transition: {
                  duration: 0.2
                }
              }}
              className={`relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-sm ${styles.bg} ${styles.border}`}
            >
              {/* Progress Bar */}
              {!toast.manualClose && (
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ 
                    width: "0%",
                    transition: {
                      duration: (toast.duration || 5000) / 1000,
                      ease: "linear"
                    }
                  }}
                  className={`absolute top-0 left-0 h-1 ${styles.progress}`}
                />
              )}

              <div className="p-4">
                <div className="flex items-start space-x-3">
                  {/* Icon with background */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    toast.type === 'success' ? 'bg-green-100' :
                    toast.type === 'error' ? 'bg-red-100' :
                    toast.type === 'warning' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {getIcon(toast.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${titleStyle}`}>
                      {toast.title}
                    </p>
                    {toast.message && (
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {toast.message}
                      </p>
                    )}
                    
                    {/* Action Button */}
                    {toast.action && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={toast.action.onClick}
                        className={`mt-2 text-sm font-medium ${
                          toast.type === 'success' ? 'text-green-600 hover:text-green-700' :
                          toast.type === 'error' ? 'text-red-600 hover:text-red-700' :
                          toast.type === 'warning' ? 'text-yellow-600 hover:text-yellow-700' :
                          'text-blue-600 hover:text-blue-700'
                        } transition-colors`}
                      >
                        {toast.action.label}
                      </motion.button>
                    )}
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative Element */}
              {toast.type === 'success' && (
                <div className="absolute top-2 right-2 opacity-20">
                  <Sparkles className="w-8 h-8 text-green-500" />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;