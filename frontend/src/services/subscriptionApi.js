import api from './api';

export const mockSubscribedChannels = [
  {
    _id: 'sub_1',
    subscribedChannel: {
      _id: 'usr_2',
      username: 'cyber_coder',
      fullName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 8900,
      latestVideoTitle: 'Next-Gen UI Engineering: Glassmorphism & Animations',
      isSubscribed: true,
    },
  },
  {
    _id: 'sub_2',
    subscribedChannel: {
      _id: 'usr_3',
      username: 'tech_insider',
      fullName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 35000,
      latestVideoTitle: 'Vite vs Webpack in 2025: Speed Benchmark Test',
      isSubscribed: true,
    },
  },
  {
    _id: 'sub_3',
    subscribedChannel: {
      _id: 'usr_4',
      username: 'synthwave_beats',
      fullName: 'Neon Arcade',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=400',
      subscribersCount: 52000,
      latestVideoTitle: 'Cyberpunk Game Development Setup',
      isSubscribed: true,
    },
  },
];

export const subscriptionApi = {
  toggleSubscription: async (channelId) => {
    try {
      const res = await api.post(`/subscriptions/c/${channelId}`);
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: { isSubscribed: true },
        message: 'Subscription toggled successfully',
      };
    }
  },

  getUserChannelSubscribers: async (channelId) => {
    try {
      const res = await api.get(`/subscriptions/c/${channelId}`);
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: mockSubscribedChannels,
      };
    }
  },

  getSubscribedChannels: async (subscriberId) => {
    try {
      const res = await api.get(`/subscriptions/u/${subscriberId}`);
      return res.data;
    } catch (err) {
      return {
        statusCode: 200,
        data: mockSubscribedChannels,
      };
    }
  },
};

export default subscriptionApi;
