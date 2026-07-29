import api from './api';
import { mockUser } from './authApi';
import { mockVideos } from './videoApi';

export const userApi = {
  getUserChannelProfile: async (username) => {
    try {
      const res = await api.get(`/users/c/${username}`);
      return res.data;
    } catch (err) {
      if (username === 'cyber_coder') {
        return {
          statusCode: 200,
          data: {
            _id: 'usr_2',
            username: 'cyber_coder',
            fullName: 'Elena Rostova',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
            coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
            subscribersCount: 8900,
            channelsSubscribedToCount: 19,
            isSubscribed: true,
            bio: 'Frontend architect specializing in CSS glassmorphic aesthetics, WebGL shaders & React design systems.',
          },
        };
      }
      return {
        statusCode: 200,
        data: {
          ...mockUser,
          username: username || mockUser.username,
        },
      };
    }
  },

  getWatchHistory: async () => {
    try {
      const res = await api.get('/users/history');
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: mockVideos.slice(0, 4),
      };
    }
  },
};

export default userApi;
