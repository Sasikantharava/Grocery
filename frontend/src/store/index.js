import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import cartSlice from './cartSlice.js';
import productSlice from './productSlice.js';
import userSlice from './userSlice.js';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    products: productSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;