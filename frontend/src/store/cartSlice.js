import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../services/cartService.js';

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(productId, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add item to cart'
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCartItem(productId, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update cart item'
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove item from cart'
      );
    }
  }
);

export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await cartService.applyCoupon(couponCode);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to apply coupon'
      );
    }
  }
);

export const removeCoupon = createAsyncThunk(
  'cart/removeCoupon',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.removeCoupon();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove coupon'
      );
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    coupon: null,
    discount: 0,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.coupon = null;
      state.discount = 0;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateCartLocal: (state, action) => {
      const { items, totalItems, totalPrice } = action.payload;
      state.items = items;
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const cart = action.payload.data;
        state.items = cart.items || [];
        state.totalItems = cart.totalItems || 0;
        state.totalPrice = cart.totalPrice || 0;
        state.coupon = cart.coupon || null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const cart = action.payload.data;
        state.items = cart.items;
        state.totalItems = cart.totalItems;
        state.totalPrice = cart.totalPrice;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const cart = action.payload.data;
        state.items = cart.items;
        state.totalItems = cart.totalItems;
        state.totalPrice = cart.totalPrice;
      })
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const cart = action.payload.data;
        state.items = cart.items;
        state.totalItems = cart.totalItems;
        state.totalPrice = cart.totalPrice;
      })
      // Apply Coupon
      .addCase(applyCoupon.fulfilled, (state, action) => {
        const cart = action.payload.data;
        state.coupon = cart.coupon;
        // Calculate discount based on coupon
        if (cart.coupon) {
          if (cart.coupon.discountType === 'percentage') {
            state.discount = (state.totalPrice * cart.coupon.discountValue) / 100;
            if (cart.coupon.maxDiscount && state.discount > cart.coupon.maxDiscount) {
              state.discount = cart.coupon.maxDiscount;
            }
          } else {
            state.discount = cart.coupon.discountValue;
          }
        }
      })
      // Remove Coupon
      .addCase(removeCoupon.fulfilled, (state) => {
        state.coupon = null;
        state.discount = 0;
      });
  },
});

export const { clearCart, clearError, updateCartLocal } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectCartDiscount = (state) => state.cart.discount;
export const selectFinalPrice = (state) => 
  state.cart.totalPrice - state.cart.discount;
export const selectCartCoupon = (state) => state.cart.coupon;
export const selectCartLoading = (state) => state.cart.isLoading;

export default cartSlice.reducer;