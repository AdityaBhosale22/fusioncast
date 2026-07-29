import api, { setAccessToken } from './api';
import { LOCAL_STORAGE_KEYS, DEFAULT_AVATAR, DEFAULT_COVER } from '../constants';

export const mockUser = {
  _id: 'usr_demo_101',
  username: 'antigravity_dev',
  email: 'creator@fusioncast.io',
  fullName: 'Aditya Bhosale',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  coverImage: DEFAULT_COVER,
  subscribersCount: 14200,
  channelsSubscribedToCount: 42,
  isSubscribed: false,
  bio: 'Fullstack developer building FusionCast. Tech enthusiast, gamer & open source advocate.',
};

export const authApi = {
  login: async (credentials) => {
    try {
      const res = await api.post('/users/login', credentials);
      const { user, accessToken, refreshToken } = res.data.data;
      setAccessToken(accessToken);
      if (refreshToken) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      return res.data;
    } catch (err) {
      // Fallback for mock mode if backend is not reachable
      if (!err.response || err.code === 'ERR_NETWORK') {
        const mockResponse = {
          statusCode: 200,
          data: {
            user: { ...mockUser, email: credentials.email || credentials.username },
            accessToken: 'mock_jwt_access_token_fusioncast_99',
            refreshToken: 'mock_jwt_refresh_token_fusioncast_99',
          },
          message: 'Logged in successfully (Demo Mode)',
        };
        setAccessToken(mockResponse.data.accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, mockResponse.data.refreshToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(mockResponse.data.user));
        return mockResponse;
      }
      throw err;
    }
  },

  register: async (formData) => {
    try {
      const res = await api.post('/users/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        return {
          statusCode: 200,
          data: { ...mockUser },
          message: 'User registered successfully (Demo Mode)',
        };
      }
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.post('/users/logout');
    } catch (err) {
      // Ignore network error on logout
    } finally {
      setAccessToken(null);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
    }
  },

  getCurrentUser: async () => {
    try {
      const res = await api.get('/users/current-user');
      return res.data;
    } catch (err) {
      const savedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
      if (savedUser) {
        return { statusCode: 200, data: JSON.parse(savedUser) };
      }
      return { statusCode: 200, data: mockUser };
    }
  },

  changeCurrentPassword: async (passwordData) => {
    const res = await api.post('/users/change-password', passwordData);
    return res.data;
  },

  updateAccountDetails: async (data) => {
    try {
      const res = await api.patch('/users/update-account', data);
      return res.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK') {
        const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA) || '{}');
        const updated = { ...saved, ...data };
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(updated));
        return { statusCode: 200, data: updated, message: 'Account updated' };
      }
      throw err;
    }
  },

  updateUserAvatar: async (formData) => {
    const res = await api.patch('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  updateUserCoverImage: async (formData) => {
    const res = await api.patch('/users/cover-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

export default authApi;
