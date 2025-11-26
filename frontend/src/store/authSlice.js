import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService.js';

// ========================================================
// Async Thunks
// ========================================================

// Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response.data;
    } catch (error) {
      console.log('=== FULL ERROR OBJECT ===');
      console.log('Error:', error);
      console.log('Error response:', error.response);
      console.log('Error data:', error.response?.data);
      console.log('Error status:', error.response?.status);
      console.log('Error headers:', error.response?.headers);
      
      // Get detailed error message
      const serverError = error.response?.data;
      
      if (serverError?.errors) {
        const detailedErrors = serverError.errors.map(err => 
          `Field: ${err.path}, Error: ${err.msg}`
        ).join(' | ');
        return rejectWithValue(`Validation failed: ${detailedErrors}`);
      }
      
      return rejectWithValue(serverError?.message || 'Registration failed');
    }
  }
);

// Get Current User (once)
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    const { hasFetchedUser } = getState().auth;

    // 🔥 Prevent multiple calls if already fetched
    if (hasFetchedUser) return null;

    try {
      const response = await authService.getMe();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user');
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed');
    }
  }
);


// ========================================================
// Slice
// ========================================================
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    isAuthenticated: false,
    error: null,

    // 🔥 prevent multiple getCurrentUser calls
    hasFetchedUser: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      state.hasFetchedUser = false; // reset on logout
    },

    clearError: (state) => {
      state.error = null;
    },

    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      // ----------------------------------------------------
      // Login
      // ----------------------------------------------------
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.token = action.payload.data.token;
        localStorage.setItem('token', state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ----------------------------------------------------
      // Register
      // ----------------------------------------------------
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.token = action.payload.data.token;
        localStorage.setItem('token', state.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ----------------------------------------------------
      // Get Current User (once)
      // ----------------------------------------------------
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasFetchedUser = true;

        if (action.payload === null) return; // Already fetched

        state.isAuthenticated = true;
        state.user = action.payload.data;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.hasFetchedUser = true; // avoid repeated failed calls
        localStorage.removeItem('token');
      })

      // ----------------------------------------------------
      // Update Profile
      // ----------------------------------------------------
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setToken } = authSlice.actions;
export default authSlice.reducer;
