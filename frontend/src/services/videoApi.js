import api from './api';

export const mockVideos = [
  {
    _id: 'vid_1',
    title: 'Building a High-Performance Fullstack App with React & Node',
    description: 'Learn how to build scalable video social platforms from scratch using modern web engineering principles, Framer Motion, and Tailwind CSS.',
    videoFile: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    duration: 596,
    views: 124500,
    isPublished: true,
    createdAt: '2024-10-10T12:00:00Z',
    likesCount: 8940,
    isLiked: false,
    owner: {
      _id: 'usr_demo_101',
      username: 'antigravity_dev',
      fullName: 'Aditya Bhosale',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 14200,
      isSubscribed: false,
    },
  },
  {
    _id: 'vid_2',
    title: 'Next-Gen UI Engineering: Glassmorphism & Animations',
    description: 'Explore futuristic web UI design patterns. We discuss dark mode palettes, micro-interactions, spring physics, and CSS blur effects.',
    videoFile: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    duration: 654,
    views: 45800,
    isPublished: true,
    createdAt: '2024-10-12T15:30:00Z',
    likesCount: 3200,
    isLiked: true,
    owner: {
      _id: 'usr_2',
      username: 'cyber_coder',
      fullName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 8900,
      isSubscribed: true,
    },
  },
  {
    _id: 'vid_3',
    title: 'Vite vs Webpack in 2025: Speed Benchmark Test',
    description: 'Deep dive comparison into bundler execution speeds, hot module replacement latency, and production chunk sizes.',
    videoFile: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    duration: 382,
    views: 89000,
    isPublished: true,
    createdAt: '2024-10-14T09:15:00Z',
    likesCount: 7100,
    isLiked: false,
    owner: {
      _id: 'usr_3',
      username: 'tech_insider',
      fullName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 35000,
      isSubscribed: false,
    },
  },
  {
    _id: 'vid_4',
    title: 'Cyberpunk Game Development Setup & Synthwave Soundtrack',
    description: 'Walkthrough of modern game environment rendering using custom shaders and ambient synth soundscapes.',
    videoFile: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    duration: 912,
    views: 215000,
    isPublished: true,
    createdAt: '2024-10-15T18:45:00Z',
    likesCount: 18400,
    isLiked: false,
    owner: {
      _id: 'usr_4',
      username: 'synthwave_beats',
      fullName: 'Neon Arcade',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 52000,
      isSubscribed: true,
    },
  },
  {
    _id: 'vid_5',
    title: 'Mastering Tailwind CSS v4 & Modern Layout Grids',
    description: 'Learn grid systems, container queries, container-based responsive breakpoints, and dark mode tokens.',
    videoFile: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    duration: 445,
    views: 67300,
    isPublished: true,
    createdAt: '2024-10-16T11:20:00Z',
    likesCount: 4500,
    isLiked: false,
    owner: {
      _id: 'usr_demo_101',
      username: 'antigravity_dev',
      fullName: 'Aditya Bhosale',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 14200,
      isSubscribed: false,
    },
  },
  {
    _id: 'vid_6',
    title: 'Node.js Microservices Architecture with Docker & K8s',
    description: 'Comprehensive guide to service discovery, API gateways, load balancing, and zero-downtime deployments.',
    videoFile: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    duration: 1205,
    views: 132000,
    isPublished: true,
    createdAt: '2024-10-17T14:10:00Z',
    likesCount: 9800,
    isLiked: false,
    owner: {
      _id: 'usr_3',
      username: 'tech_insider',
      fullName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 35000,
      isSubscribed: false,
    },
  },
];

export const videoApi = {
  getAllVideos: async (params = {}) => {
    try {
      const res = await api.get('/videos', { params });
      return res.data;
    } catch (err) {
      let filtered = [...mockVideos];
      if (params.query) {
        const q = params.query.toLowerCase();
        filtered = filtered.filter(
          (v) =>
            v.title.toLowerCase().includes(q) ||
            v.description.toLowerCase().includes(q) ||
            v.owner.username.toLowerCase().includes(q)
        );
      }
      if (params.userId) {
        filtered = filtered.filter((v) => v.owner._id === params.userId);
      }
      return {
        statusCode: 200,
        data: {
          videos: filtered,
          totalVideos: filtered.length,
          page: params.page || 1,
          limit: params.limit || 10,
          totalPages: 1,
        },
      };
    }
  },

  getVideoById: async (videoId) => {
    try {
      const res = await api.get(`/videos/${videoId}`);
      return res.data;
    } catch (err) {
      const found = mockVideos.find((v) => v._id === videoId) || mockVideos[0];
      return {
        statusCode: 200,
        data: found,
      };
    }
  },

  publishVideo: async (formData) => {
    try {
      const res = await api.post('/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      const newVid = {
        _id: `vid_${Date.now()}`,
        title: formData.get?.('title') || 'My New FusionCast Stream',
        description: formData.get?.('description') || 'Uploaded via FusionCast studio.',
        videoFile: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        duration: 320,
        views: 0,
        isPublished: true,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        isLiked: false,
        owner: {
          _id: 'usr_demo_101',
          username: 'antigravity_dev',
          fullName: 'Aditya Bhosale',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          subscribersCount: 14200,
          isSubscribed: false,
        },
      };
      mockVideos.unshift(newVid);
      return {
        statusCode: 201,
        data: newVid,
        message: 'Video published successfully',
      };
    }
  },

  updateVideo: async (videoId, data) => {
    try {
      const res = await api.patch(`/videos/${videoId}`, data);
      return res.data;
    } catch (err) {
      const video = mockVideos.find((v) => v._id === videoId);
      if (video) {
        if (data.title) video.title = data.title;
        if (data.description) video.description = data.description;
      }
      return { statusCode: 200, data: video || mockVideos[0], message: 'Video updated' };
    }
  },

  deleteVideo: async (videoId) => {
    try {
      const res = await api.delete(`/videos/${videoId}`);
      return res.data;
    } catch (err) {
      const index = mockVideos.findIndex((v) => v._id === videoId);
      if (index !== -1) mockVideos.splice(index, 1);
      return { statusCode: 200, message: 'Video deleted successfully' };
    }
  },

  togglePublishStatus: async (videoId) => {
    try {
      const res = await api.patch(`/videos/toggle/publish/${videoId}`);
      return res.data;
    } catch (err) {
      const video = mockVideos.find((v) => v._id === videoId);
      if (video) video.isPublished = !video.isPublished;
      return { statusCode: 200, data: video, message: 'Publish status toggled' };
    }
  },
};

export default videoApi;
