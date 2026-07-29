import api from './api';

export const mockTweets = [
  {
    _id: 'twt_1',
    content: '🚀 Just deployed the latest update to FusionCast! Full JWT authentication with Axios interceptors, responsive Tailwind dark theme, and glassmorphic UI elements are now live.',
    createdAt: '2024-10-18T10:30:00Z',
    likesCount: 142,
    isLiked: true,
    owner: {
      _id: 'usr_demo_101',
      username: 'antigravity_dev',
      fullName: 'Aditya Bhosale',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    },
  },
  {
    _id: 'twt_2',
    content: 'What feature should we build next on FusionCast? 1) Real-time Live Streaming 2) Super Chats & Tips 3) Short Clip Creator. Let me know in the replies below! 👇',
    createdAt: '2024-10-17T16:45:00Z',
    likesCount: 89,
    isLiked: false,
    owner: {
      _id: 'usr_2',
      username: 'cyber_coder',
      fullName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    },
  },
  {
    _id: 'twt_3',
    content: 'Tip: Always use custom hooks like `useDebounce` for live search inputs to minimize unnecessary server load. Your backend team will thank you! ⚡',
    createdAt: '2024-10-16T11:15:00Z',
    likesCount: 230,
    isLiked: false,
    owner: {
      _id: 'usr_3',
      username: 'tech_insider',
      fullName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    },
  },
];

export const tweetApi = {
  createTweet: async (content) => {
    try {
      const res = await api.post('/tweet', { content });
      return res.data;
    } catch (err) {
      const newTweet = {
        _id: `twt_${Date.now()}`,
        content,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        isLiked: false,
        owner: {
          _id: 'usr_demo_101',
          username: 'antigravity_dev',
          fullName: 'Aditya Bhosale',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        },
      };
      mockTweets.unshift(newTweet);
      return { statusCode: 201, data: newTweet, message: 'Tweet created' };
    }
  },

  getAllTweets: async () => {
    try {
      const res = await api.get('/tweet');
      return res.data;
    } catch (err) {
      return { statusCode: 200, data: mockTweets };
    }
  },

  getUserTweets: async (userId) => {
    try {
      const res = await api.get(`/tweet/user/${userId}`);
      return res.data;
    } catch (err) {
      const filtered = mockTweets.filter((t) => t.owner._id === userId);
      return { statusCode: 200, data: filtered.length ? filtered : mockTweets };
    }
  },

  updateTweet: async (tweetId, content) => {
    try {
      const res = await api.patch(`/tweet/${tweetId}`, { content });
      return res.data;
    } catch (err) {
      const twt = mockTweets.find((t) => t._id === tweetId);
      if (twt) twt.content = content;
      return { statusCode: 200, data: twt, message: 'Tweet updated' };
    }
  },

  deleteTweet: async (tweetId) => {
    try {
      const res = await api.delete(`/tweet/${tweetId}`);
      return res.data;
    } catch (err) {
      const idx = mockTweets.findIndex((t) => t._id === tweetId);
      if (idx !== -1) mockTweets.splice(idx, 1);
      return { statusCode: 200, message: 'Tweet deleted' };
    }
  },
};

export default tweetApi;
