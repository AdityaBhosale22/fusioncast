import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { userApi } from '../services/userApi';
import { videoApi, mockVideos } from '../services/videoApi';
import { playlistApi, mockPlaylists } from '../services/playlistApi';
import { tweetApi, mockTweets } from '../services/tweetApi';
import { likeApi } from '../services/likeApi';
import { useAuth } from '../hooks/useAuth';
import { useUserContext } from '../contexts/UserContext';

import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import VideoCard from '../components/video/VideoCard';
import PlaylistCard from '../components/playlist/PlaylistCard';
import TweetCard from '../components/tweet/TweetCard';
import EditProfileModal from '../components/user/EditProfileModal';
import AddToPlaylistModal from '../components/playlist/AddToPlaylistModal';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { formatViews } from '../utils/formatViews';
import { subscriptionApi } from '../services/subscriptionApi';

import {
  Film,
  ListVideo,
  ThumbsUp,
  MessageSquare,
  History,
  Edit,
  UserCheck,
  UserPlus,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user: currentUser } = useAuth();
  const { subscribedChannels, toggleSubscribedChannel } = useUserContext();

  const activeTab = searchParams.get('tab') || 'videos';

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab datasets
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [history, setHistory] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [selectedVideoForPlaylist, setSelectedVideoForPlaylist] = useState(null);

  const isOwnProfile = currentUser?.username === username || !username;
  const targetUsername = username || currentUser?.username || 'antigravity_dev';

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const res = await userApi.getUserChannelProfile(targetUsername);
        setProfile(res.data);

        // Fetch videos
        const vidRes = await videoApi.getAllVideos({ userId: res.data._id });
        setVideos(vidRes.data?.videos || mockVideos);

        // Fetch playlists
        const plRes = await playlistApi.getUserPlaylists(res.data._id);
        setPlaylists(plRes.data || mockPlaylists);

        // Fetch liked videos
        const likedRes = await likeApi.getLikedVideos();
        setLikedVideos(likedRes.data || mockVideos.slice(0, 3));

        // Fetch tweets
        const twtRes = await tweetApi.getUserTweets(res.data._id);
        setTweets(twtRes.data || mockTweets);

        // Fetch history
        const histRes = await userApi.getWatchHistory();
        setHistory(histRes.data || mockVideos.slice(0, 4));
      } catch (err) {
        setProfile({
          username: targetUsername,
          fullName: 'Aditya Bhosale',
          avatar: currentUser?.avatar,
          coverImage: currentUser?.coverImage,
          subscribersCount: 14200,
          bio: 'Fullstack developer & video creator on FusionCast.',
        });
        setVideos(mockVideos);
        setPlaylists(mockPlaylists);
        setLikedVideos(mockVideos.slice(0, 2));
        setTweets(mockTweets);
        setHistory(mockVideos.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [targetUsername, currentUser]);

  const isSubscribed = subscribedChannels.some(
    (item) => item.subscribedChannel?._id === profile?._id
  );

  const handleSubscribeToggle = async () => {
    if (!profile?._id) return;
    toggleSubscribedChannel(profile._id);
    try {
      await subscriptionApi.toggleSubscription(profile._id);
      toast.success(isSubscribed ? `Unsubscribed` : `Subscribed to ${profile.fullName}`);
    } catch (err) {
      toast.error('Failed to update subscription');
    }
  };

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  if (loading) return <Loader size="lg" text="Loading channel profile..." />;
  if (!profile) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Cover Banner */}
      <div className="relative h-48 sm:h-64 w-full rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-violet-900 to-indigo-950 border border-zinc-800">
        <img
          src={profile.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200'}
          alt="Channel Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent" />
      </div>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 px-4 relative z-10">
        <div className="flex items-end gap-4">
          <Avatar
            src={profile.avatar}
            alt={profile.fullName}
            size="2xl"
            className="ring-4 ring-[#09090B] shadow-2xl"
          />
          <div className="flex flex-col mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              {profile.fullName || profile.username}
            </h1>
            <span className="text-sm font-medium text-zinc-400">@{profile.username}</span>
            <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
              <span>{formatViews(profile.subscribersCount || 14200)} subscribers</span>
              <span>•</span>
              <span>{profile.channelsSubscribedToCount || 42} subscriptions</span>
            </div>
          </div>
        </div>

        <div>
          {isOwnProfile ? (
            <Button variant="glass" icon={Edit} onClick={() => setEditModalOpen(true)}>
              Edit Profile
            </Button>
          ) : (
            <Button
              variant={isSubscribed ? 'secondary' : 'primary'}
              icon={isSubscribed ? UserCheck : UserPlus}
              onClick={handleSubscribeToggle}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          )}
        </div>
      </div>

      {/* Bio text */}
      {profile.bio && (
        <p className="text-sm text-zinc-300 px-4 max-w-3xl leading-relaxed">{profile.bio}</p>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 px-2 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => handleTabChange('videos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'videos'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
          }`}
        >
          <Film className="w-4 h-4" />
          Videos ({videos.length})
        </button>

        <button
          onClick={() => handleTabChange('playlists')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'playlists'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
          }`}
        >
          <ListVideo className="w-4 h-4" />
          Playlists ({playlists.length})
        </button>

        <button
          onClick={() => handleTabChange('liked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'liked'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          Liked Videos
        </button>

        <button
          onClick={() => handleTabChange('tweets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'tweets'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Tweets
        </button>

        {isOwnProfile && (
          <button
            onClick={() => handleTabChange('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
          >
            <History className="w-4 h-4" />
            Watch History
          </button>
        )}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'videos' && (
        videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <VideoCard
                key={v._id}
                video={v}
                onAddToPlaylist={(vid) => {
                  setSelectedVideoForPlaylist(vid);
                  setPlaylistModalOpen(true);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState icon="video" title="No videos published yet" />
        )
      )}

      {activeTab === 'playlists' && (
        playlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((pl) => (
              <PlaylistCard
                key={pl._id}
                playlist={pl}
                onDelete={(id) => setPlaylists((prev) => prev.filter((p) => p._id !== id))}
              />
            ))}
          </div>
        ) : (
          <EmptyState icon="folder" title="No playlists found" />
        )
      )}

      {activeTab === 'liked' && (
        likedVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedVideos.map((v) => (
              <VideoCard key={v._id} video={v} />
            ))}
          </div>
        ) : (
          <EmptyState icon="video" title="No liked videos yet" />
        )
      )}

      {activeTab === 'tweets' && (
        tweets.length > 0 ? (
          <div className="flex flex-col gap-4 max-w-3xl">
            {tweets.map((t) => (
              <TweetCard
                key={t._id}
                tweet={t}
                onDelete={(id) => setTweets((prev) => prev.filter((item) => item._id !== id))}
              />
            ))}
          </div>
        ) : (
          <EmptyState icon="comment" title="No community tweets posted" />
        )
      )}

      {activeTab === 'history' && (
        history.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((v) => (
              <VideoCard key={v._id} video={v} />
            ))}
          </div>
        ) : (
          <EmptyState icon="video" title="Watch history is empty" />
        )
      )}

      {/* Modals */}
      <EditProfileModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} />
      <AddToPlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        video={selectedVideoForPlaylist}
      />
    </div>
  );
};

export default ProfilePage;
