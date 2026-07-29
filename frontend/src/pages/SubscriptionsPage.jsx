import React, { useState, useEffect } from 'react';
import { subscriptionApi, mockSubscribedChannels } from '../services/subscriptionApi';
import { videoApi, mockVideos } from '../services/videoApi';
import UserCard from '../components/user/UserCard';
import VideoCard from '../components/video/VideoCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { Tv, Sparkles } from 'lucide-react';

export const SubscriptionsPage = () => {
  const { user } = useAuth();
  const [channels, setChannels] = useState([]);
  const [subscriptionVideos, setSubscriptionVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const res = await subscriptionApi.getSubscribedChannels(user?._id || 'usr_demo_101');
        const list = res.data || mockSubscribedChannels;
        setChannels(list);

        const vRes = await videoApi.getAllVideos();
        setSubscriptionVideos(vRes.data?.videos || mockVideos);
      } catch (err) {
        setChannels(mockSubscribedChannels);
        setSubscriptionVideos(mockVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user]);

  if (loading) return <Loader size="lg" text="Loading channel subscriptions..." />;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
          <Tv className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            Subscribed Channels
          </h1>
          <p className="text-sm text-zinc-400">Keep up with updates from your favorite creators</p>
        </div>
      </div>

      {/* Channel Cards Grid */}
      {channels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((item) => {
            const ch = item.subscribedChannel || item;
            return <UserCard key={ch._id || item._id} user={ch} />;
          })}
        </div>
      ) : (
        <EmptyState
          icon="user"
          title="No channels subscribed"
          description="Explore creators on the home feed and subscribe to get their latest video updates here."
        />
      )}

      {/* Latest Feed from Subscriptions */}
      {subscriptionVideos.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            Latest Streams from Subscriptions <Sparkles className="w-4 h-4 text-violet-400" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptionVideos.slice(0, 6).map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage;
