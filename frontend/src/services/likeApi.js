import api from './api';
import { mockVideos } from './videoApi';

export const likeApi = {
  toggleVideoLike: async (videoId) => {
    try {
      const res = await api.post(`/likes/toggle/v/${videoId}`);
      return res.data;
    } catch (err) {
      const video = mockVideos.find((v) => v._id === videoId);
      let isLiked = false;
      if (video) {
        video.isLiked = !video.isLiked;
        video.likesCount += video.isLiked ? 1 : -1;
        isLiked = video.isLiked;
      }
      return {
        statusCode: 200,
        data: { isLiked },
        message: 'Video like status updated',
      };
    }
  },

  toggleCommentLike: async (commentId) => {
    try {
      const res = await api.post(`/likes/toggle/c/${commentId}`);
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: { isLiked: true },
        message: 'Comment like toggled',
      };
    }
  },

  toggleTweetLike: async (tweetId) => {
    try {
      const res = await api.post(`/likes/toggle/t/${tweetId}`);
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: { isLiked: true },
        message: 'Tweet like toggled',
      };
    }
  },

  getLikedVideos: async () => {
    try {
      const res = await api.get('/likes/videos');
      return res.data;
    } catch (err) {
      const liked = mockVideos.filter((v) => v.isLiked || v._id === 'vid_2');
      return {
        statusCode: 200,
        data: liked,
      };
    }
  },
};

export default likeApi;
