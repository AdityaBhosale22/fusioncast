import api from './api';
import { mockVideos } from './videoApi';

export let mockPlaylists = [
  {
    _id: 'pl_1',
    name: 'Fullstack Dev Tutorials',
    description: 'Collection of video engineering masterclasses, React architecture, and database performance tuning.',
    videos: [mockVideos[0], mockVideos[4]],
    owner: 'usr_demo_101',
    createdAt: '2024-10-01T10:00:00Z',
    updatedAt: '2024-10-18T12:00:00Z',
  },
  {
    _id: 'pl_2',
    name: 'UI/UX & Glassmorphism Showcase',
    description: 'Curated list of videos focused on frontend styling, tailwind, dark modes, and micro-interactions.',
    videos: [mockVideos[1], mockVideos[4]],
    owner: 'usr_demo_101',
    createdAt: '2024-10-05T14:20:00Z',
    updatedAt: '2024-10-19T09:30:00Z',
  },
  {
    _id: 'pl_3',
    name: 'DevOps & Microservices',
    description: 'Docker, Kubernetes, and Node.js backend infrastructure guides.',
    videos: [mockVideos[2], mockVideos[5]],
    owner: 'usr_demo_101',
    createdAt: '2024-10-08T16:00:00Z',
    updatedAt: '2024-10-17T11:00:00Z',
  },
];

export const playlistApi = {
  createPlaylist: async (data) => {
    try {
      const res = await api.post('/playlists', data);
      return res.data;
    } catch (err) {
      const newPl = {
        _id: `pl_${Date.now()}`,
        name: data.name || 'New Playlist',
        description: data.description || '',
        videos: [],
        owner: 'usr_demo_101',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockPlaylists.push(newPl);
      return { statusCode: 201, data: newPl, message: 'Playlist created successfully' };
    }
  },

  getUserPlaylists: async (userId) => {
    try {
      const res = await api.get(`/playlists/user/${userId}`);
      return res.data;
    } catch (err) {
      return { statusCode: 200, data: mockPlaylists };
    }
  },

  getPlaylistById: async (playlistId) => {
    try {
      const res = await api.get(`/playlists/${playlistId}`);
      return res.data;
    } catch (err) {
      const pl = mockPlaylists.find((p) => p._id === playlistId) || mockPlaylists[0];
      return { statusCode: 200, data: pl };
    }
  },

  addVideoToPlaylist: async (playlistId, videoId) => {
    try {
      const res = await api.patch(`/playlists/add/${videoId}/${playlistId}`);
      return res.data;
    } catch (err) {
      const pl = mockPlaylists.find((p) => p._id === playlistId);
      const vid = mockVideos.find((v) => v._id === videoId);
      if (pl && vid && !pl.videos.some((v) => v._id === videoId)) {
        pl.videos.push(vid);
      }
      return { statusCode: 200, data: pl, message: 'Video added to playlist' };
    }
  },

  removeVideoFromPlaylist: async (playlistId, videoId) => {
    try {
      const res = await api.patch(`/playlists/remove/${videoId}/${playlistId}`);
      return res.data;
    } catch (err) {
      const pl = mockPlaylists.find((p) => p._id === playlistId);
      if (pl) {
        pl.videos = pl.videos.filter((v) => v._id !== videoId);
      }
      return { statusCode: 200, data: pl, message: 'Video removed from playlist' };
    }
  },

  deletePlaylist: async (playlistId) => {
    try {
      const res = await api.delete(`/playlists/${playlistId}`);
      return res.data;
    } catch (err) {
      mockPlaylists = mockPlaylists.filter((p) => p._id !== playlistId);
      return { statusCode: 200, message: 'Playlist deleted' };
    }
  },

  updatePlaylist: async (playlistId, data) => {
    try {
      const res = await api.patch(`/playlists/${playlistId}`, data);
      return res.data;
    } catch (err) {
      const pl = mockPlaylists.find((p) => p._id === playlistId);
      if (pl) {
        if (data.name) pl.name = data.name;
        if (data.description) pl.description = data.description;
      }
      return { statusCode: 200, data: pl, message: 'Playlist updated' };
    }
  },
};

export default playlistApi;
