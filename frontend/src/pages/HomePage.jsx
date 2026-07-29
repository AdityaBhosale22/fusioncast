import React, { useState, useEffect } from 'react';
import { videoApi, mockVideos } from '../services/videoApi';
import { tweetApi, mockTweets } from '../services/tweetApi';
import { VIDEO_CATEGORIES } from '../constants';
import VideoCard from '../components/video/VideoCard';
import TweetCard from '../components/tweet/TweetCard';
import { VideoCardSkeleton } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import AddToPlaylistModal from '../components/playlist/AddToPlaylistModal';
import CreateTweetModal from '../components/tweet/CreateTweetModal';
import Button from '../components/common/Button';
import { Sparkles, MessageSquare, Film, Plus } from 'lucide-react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Videos');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [selectedVideoForPlaylist, setSelectedVideoForPlaylist] = useState(null);
  const [tweetModalOpen, setTweetModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'Videos') {
          const res = await videoApi.getAllVideos();
          setVideos(res.data?.videos || mockVideos);
        } else {
          const res = await tweetApi.getAllTweets();
          setTweets(res.data || mockTweets);
        }
      } catch (err) {
        setVideos(mockVideos);
        setTweets(mockTweets);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const filteredVideos = videos.filter((v) => {
    if (selectedCategory === 'All') return true;
    return (
      v.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      v.description.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  const handleOpenPlaylistModal = (video) => {
    setSelectedVideoForPlaylist(video);
    setPlaylistModalOpen(true);
  };

  const handleTweetCreated = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner / Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#18181B] border border-zinc-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('Videos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'Videos'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
          >
            <Film className="w-4 h-4" />
            Video Streams
          </button>

          <button
            onClick={() => setActiveTab('Tweets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'Tweets'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Community Tweets
          </button>
        </div>

        {activeTab === 'Tweets' && (
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setTweetModalOpen(true)}>
            Post Tweet
          </Button>
        )}
      </div>

      {/* Category Pills (for videos) */}
      {activeTab === 'Videos' && (
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
          {VIDEO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'bg-[#18181B] text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Feed */}
      {loading ? (
        activeTab === 'Videos' ? (
          <VideoCardSkeleton count={6} />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="h-32 bg-zinc-800/60 animate-pulse rounded-2xl" />
            <div className="h-32 bg-zinc-800/60 animate-pulse rounded-2xl" />
          </div>
        )
      ) : activeTab === 'Videos' ? (
        filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onAddToPlaylist={handleOpenPlaylistModal}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="video"
            title="No videos found in this category"
            description="Try selecting a different topic or check back later."
          />
        )
      ) : tweets.length > 0 ? (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}
              onDelete={(id) => setTweets((prev) => prev.filter((t) => t._id !== id))}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="comment"
          title="No tweets yet"
          description="Be the first creator to share a post with your audience!"
          actionLabel="Create Post"
          onAction={() => setTweetModalOpen(true)}
        />
      )}

      {/* Modals */}
      <AddToPlaylistModal
        isOpen={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        video={selectedVideoForPlaylist}
      />

      <CreateTweetModal
        isOpen={tweetModalOpen}
        onClose={() => setTweetModalOpen(false)}
        onCreated={handleTweetCreated}
      />
    </div>
  );
};

export default HomePage;
