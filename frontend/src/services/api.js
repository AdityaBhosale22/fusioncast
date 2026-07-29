import axios from 'axios';
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from '../constants';

// In-memory access token storage
let inMemoryToken = null;

export const setAccessToken = (token) => {
  inMemoryToken = token;
};

export const getAccessToken = () => {
  return inMemoryToken;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token
api.interceptors.request.use(
  (config) => {
    if (inMemoryToken) {
      config.headers.Authorization = `Bearer ${inMemoryToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle token refresh & fallback mock handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/users/refresh-token`,
            { refreshToken },
            { withCredentials: true }
          );

          const newAccessToken = response.data?.data?.accessToken;
          const newRefreshToken = response.data?.data?.refreshToken;

          if (newAccessToken) {
            setAccessToken(newAccessToken);
            if (newRefreshToken) {
              localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
            }
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // Token refresh failed, clean up
          localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
          setAccessToken(null);
          window.dispatchEvent(new Event('auth:logout'));
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
