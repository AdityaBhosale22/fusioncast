import api from './api';

export const mockComments = [
  {
    _id: 'cmt_1',
    content: 'This breakdown of React architecture and glassmorphism styling is top-notch! Really loved the smooth transitions.',
    createdAt: '2024-10-15T14:00:00Z',
    likesCount: 24,
    isLiked: false,
    owner: {
      _id: 'usr_2',
      username: 'cyber_coder',
      fullName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    },
    replies: [
      {
        _id: 'cmt_1_1',
        content: 'Thanks Elena! Glad you found the CSS blur and Tailwind tokens helpful.',
        createdAt: '2024-10-15T15:10:00Z',
        likesCount: 8,
        isLiked: true,
        owner: {
          _id: 'usr_demo_101',
          username: 'antigravity_dev',
          fullName: 'Aditya Bhosale',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        },
      },
    ],
  },
  {
    _id: 'cmt_2',
    content: 'Could you do a follow-up video on state management with Context vs Zustand?',
    createdAt: '2024-10-16T09:20:00Z',
    likesCount: 15,
    isLiked: false,
    owner: {
      _id: 'usr_3',
      username: 'tech_insider',
      fullName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    },
    replies: [],
  },
];

export const commentApi = {
  getVideoComments: async (videoId, params = {}) => {
    try {
      const res = await api.get(`/comments/${videoId}`, { params });
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: {
          comments: mockComments,
          totalComments: mockComments.length,
          page: 1,
          limit: 10,
        },
      };
    }
  },

  addComment: async (videoId, content) => {
    try {
      const res = await api.post(`/comments/${videoId}`, { content });
      return res.data;
    } catch (err) {
      const newComment = {
        _id: `cmt_${Date.now()}`,
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
        replies: [],
      };
      mockComments.unshift(newComment);
      return { statusCode: 201, data: newComment, message: 'Comment added' };
    }
  },

  updateComment: async (commentId, content) => {
    try {
      const res = await api.patch(`/comments/c/${commentId}`, { content });
      return res.data;
    } catch (err) {
      const cmt = mockComments.find((c) => c._id === commentId);
      if (cmt) cmt.content = content;
      return { statusCode: 200, data: cmt, message: 'Comment updated' };
    }
  },

  deleteComment: async (commentId) => {
    try {
      const res = await api.delete(`/comments/c/${commentId}`);
      return res.data;
    } catch (err) {
      const idx = mockComments.findIndex((c) => c._id === commentId);
      if (idx !== -1) mockComments.splice(idx, 1);
      return { statusCode: 200, message: 'Comment deleted' };
    }
  },
};

export default commentApi;
