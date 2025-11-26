import API from './api.js';

export const cartService = {
  // Get user cart
  getCart: async () => {
    const response = await API.get('/cart');
    return response;
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await API.post('/cart/items', { productId, quantity });
    return response;
  },

  // Update cart item quantity
  updateCartItem: async (productId, quantity) => {
    const response = await API.put(`/cart/items/${productId}`, { quantity });
    return response;
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const response = await API.delete(`/cart/items/${productId}`);
    return response;
  },

  // Clear cart
  clearCart: async () => {
    const response = await API.delete('/cart/clear');
    return response;
  },

  // Apply coupon
  applyCoupon: async (couponCode) => {
    const response = await API.post('/cart/coupon', { code: couponCode });
    return response;
  },

  // Remove coupon
  removeCoupon: async () => {
    const response = await API.delete('/cart/coupon');
    return response;
  },
};

export default cartService;