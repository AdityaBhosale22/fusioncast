import React, { createContext, useState, useEffect, useContext } from 'react';
import { subscriptionApi } from '../services/subscriptionApi';
import { likeApi } from '../services/likeApi';
import { useAuth } from '../hooks/useAuth';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [likedVideoIds, setLikedVideoIds] = useState(new Set(['vid_2']));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (user?._id) {
      // Fetch subscriptions
      subscriptionApi
        .getSubscribedChannels(user._id)
        .then((res) => {
          if (res?.data) {
            setSubscribedChannels(res.data);
          }
        })
        .catch(() => {});

      // Fetch liked videos
      likeApi
        .getLikedVideos()
        .then((res) => {
          if (res?.data && Array.isArray(res.data)) {
            const ids = new Set(res.data.map((v) => v._id));
            setLikedVideoIds(ids);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const toggleSubscribedChannel = (channelId) => {
    setSubscribedChannels((prev) => {
      const exists = prev.some((item) => item.subscribedChannel?._id === channelId);
      if (exists) {
        return prev.filter((item) => item.subscribedChannel?._id !== channelId);
      } else {
        return [
          ...prev,
          {
            _id: `sub_${Date.now()}`,
            subscribedChannel: { _id: channelId, isSubscribed: true },
          },
        ];
      }
    });
  };

  const toggleLikedVideo = (videoId) => {
    setLikedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
      }
      return next;
    });
  };

  return (
    <UserContext.Provider
      value={{
        subscribedChannels,
        likedVideoIds,
        toggleSubscribedChannel,
        toggleLikedVideo,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
