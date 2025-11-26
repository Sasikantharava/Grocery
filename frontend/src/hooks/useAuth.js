import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  loginUser, 
  registerUser, 
  getCurrentUser, 
  updateProfile,
  logout 
} from '../store/authSlice.js';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = useCallback((email, password) => {
    return dispatch(loginUser({ email, password }));
  }, [dispatch]);

  const register = useCallback((userData) => {
    return dispatch(registerUser(userData));
  }, [dispatch]);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    // Only check auth if we have a token and no user data
    if (token && !auth.user && !auth.isLoading) {
      return dispatch(getCurrentUser());
    }
    return Promise.resolve();
  }, [dispatch, auth.user, auth.isLoading]);

  const updateUserProfile = useCallback((userData) => {
    return dispatch(updateProfile(userData));
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    // State
    user: auth.user,
    token: auth.token,
    isLoading: auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
    error: auth.error,
    
    // Actions
    login,
    register,
    checkAuth,
    updateProfile: updateUserProfile,
    logout: logoutUser,
  };
};

export default useAuth;