import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart,
  applyCoupon,
  removeCoupon,
  clearCart 
} from '../store/cartSlice.js';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const getCart = useCallback(() => {
    return dispatch(fetchCart());
  }, [dispatch]);

  const addItemToCart = useCallback((productId, quantity = 1) => {
    return dispatch(addToCart({ productId, quantity }));
  }, [dispatch]);

  const updateItemQuantity = useCallback((productId, quantity) => {
    return dispatch(updateCartItem({ productId, quantity }));
  }, [dispatch]);

  const removeItemFromCart = useCallback((productId) => {
    return dispatch(removeFromCart(productId));
  }, [dispatch]);

  const applyCartCoupon = useCallback((couponCode) => {
    return dispatch(applyCoupon(couponCode));
  }, [dispatch]);

  const removeCartCoupon = useCallback(() => {
    return dispatch(removeCoupon());
  }, [dispatch]);

  const clearUserCart = useCallback(() => {
    return dispatch(clearCart());
  }, [dispatch]);

  // Calculate cart summary
  const getCartSummary = useCallback(() => {
    const itemsTotal = cart.totalPrice;
    const discount = cart.discount;
    const deliveryFee = itemsTotal > 500 ? 0 : 40;
    const tax = Math.round(itemsTotal * 0.05);
    const finalTotal = itemsTotal - discount + deliveryFee + tax;

    return {
      itemsTotal,
      discount,
      deliveryFee,
      tax,
      finalTotal,
    };
  }, [cart.totalPrice, cart.discount]);

  return {
    // State
    items: cart.items,
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    coupon: cart.coupon,
    discount: cart.discount,
    isLoading: cart.isLoading,
    error: cart.error,
    
    // Actions
    getCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    applyCartCoupon,
    removeCartCoupon,
    clearUserCart,
    
    // Computed
    getCartSummary,
    isEmpty: cart.items.length === 0,
  };
};

export default useCart;