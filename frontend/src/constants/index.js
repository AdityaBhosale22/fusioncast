export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const LOCAL_STORAGE_KEYS = {
  REFRESH_TOKEN: 'fusioncast_refresh_token',
  USER_DATA: 'fusioncast_user_data',
};

export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
export const DEFAULT_COVER = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200';

export const VIDEO_CATEGORIES = [
  'All',
  'Gaming',
  'Technology',
  'Music',
  'Education',
  'Entertainment',
  'Coding',
  'Design',
];
