import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for user-related operations
export const updateUserAddress = createAsyncThunk(
  'user/updateAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      // This would call your user service
      // const response = await userService.updateAddress(addressData);
      // return response.data;
      
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ address: addressData });
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update address'
      );
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'user/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      // Mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ productId });
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add to wishlist'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    addresses: [],
    wishlist: [],
    wallet: {
      balance: 0,
      transactions: []
    },
    isLoading: false,
    error: null
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    updateWalletBalance: (state, action) => {
      state.wallet.balance = action.payload;
    },
    addTransaction: (state, action) => {
      state.wallet.transactions.unshift(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Update Address
      .addCase(updateUserAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const existingIndex = state.addresses.findIndex(
          addr => addr._id === action.payload.address._id
        );
        if (existingIndex >= 0) {
          state.addresses[existingIndex] = action.payload.address;
        } else {
          state.addresses.push(action.payload.address);
        }
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add to Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (!state.wishlist.includes(action.payload.productId)) {
          state.wishlist.push(action.payload.productId);
        }
      });
  }
});

export const { clearUserError, updateWalletBalance, addTransaction } = userSlice.actions;

// Selectors
export const selectUserAddresses = (state) => state.user.addresses;
export const selectUserWishlist = (state) => state.user.wishlist;
export const selectUserWallet = (state) => state.user.wallet;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;