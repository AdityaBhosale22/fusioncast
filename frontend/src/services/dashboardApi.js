import api from './api';
import { mockVideos } from './videoApi';

export const dashboardApi = {
  getChannelStats: async () => {
    try {
      const res = await api.get('/dashboard/stats');
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: {
          totalViews: 584900,
          totalSubscribers: 14200,
          totalVideos: mockVideos.length,
          totalLikes: 42100,
        },
      };
    }
  },

  getChannelVideos: async () => {
    try {
      const res = await api.get('/dashboard/videos');
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: mockVideos,
      };
    }
  },
};

export default dashboardApi;
