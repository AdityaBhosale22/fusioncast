import React, { createContext, useState, useEffect, useCallback } from 'react';
import authApi, { mockUser } from '../services/authApi';
import { setAccessToken } from '../services/api';
import { LOCAL_STORAGE_KEYS } from '../constants';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from stored refresh token / user data
  useEffect(() => {
    const initAuth = async () => {
      const storedRefreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);

      if (storedUserData) {
        try {
          setUser(JSON.parse(storedUserData));
        } catch (e) {
          console.error('Failed to parse user data', e);
        }
      }

      if (storedRefreshToken) {
        try {
          const res = await authApi.getCurrentUser();
          if (res?.data) {
            setUser(res.data);
            localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(res.data));
          }
        } catch (err) {
          // If token fetch fails, set fallback demo user if present
          if (storedUserData) {
            setUser(JSON.parse(storedUserData));
          }
        }
      } else {
        // Provide mock user as active default for demo preview
        setUser(mockUser);
      }
      setLoading(false);
    };

    initAuth();

    const handleLogoutEvent = () => {
      setUser(null);
    };

    window.addEventListener('auth:logout', handleLogoutEvent);
    return () => window.removeEventListener('auth:logout', handleLogoutEvent);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authApi.login(credentials);
      const loggedUser = res?.data?.user || mockUser;
      setUser(loggedUser);
      toast.success(res.message || 'Logged in successfully!');
      return res;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check credentials.';
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await authApi.register(formData);
      toast.success('Registration successful! Please login.');
      return res;
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed. Try again.';
      toast.error(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const newObj = { ...prev, ...updatedData };
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(newObj));
      return newObj;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
