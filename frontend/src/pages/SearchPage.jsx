import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { videoApi, mockVideos } from '../services/videoApi';
import { useDebounce } from '../hooks/useDebounce';
import VideoCard from '../components/video/VideoCard';
import UserCard from '../components/user/UserCard';
import { VideoCardSkeleton } from '../components/common/Skeleton';
import EmptyState from '../components/common/EmptyState';
import { Search, Film, Users } from 'lucide-react';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 350);

  const [activeTab, setActiveTab] = useState('videos');
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const executeSearch = async () => {
      if (!debouncedQuery.trim()) {
        setVideos(mockVideos);
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const res = await videoApi.getAllVideos({ query: debouncedQuery });
        const list = res.data?.videos || mockVideos;
        setVideos(list);

        // Derive mock user results matching search query
        const mockUserList = [
          {
            _id: 'usr_demo_101',
            username: 'antigravity_dev',
            fullName: 'Aditya Bhosale',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
            subscribersCount: 14200,
            bio: 'Fullstack React & Node developer.',
          },
          {
            _id: 'usr_2',
            username: 'cyber_coder',
            fullName: 'Elena Rostova',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
            subscribersCount: 8900,
            bio: 'Frontend UI architect.',
          },
        ].filter(
          (u) =>
            u.username.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            u.fullName.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

        setUsers(mockUserList);
      } catch (err) {
        setVideos(mockVideos);
      } finally {
        setLoading(false);
      }
    };

    executeSearch();
  }, [debouncedQuery]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      {/* Search Header Input */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Search videos, topics, creators..."
          value={query}
          onChange={handleQueryChange}
          className="w-full bg-[#18181B] border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-lg transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('videos')}
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
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'users'
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Channels ({users.length})
        </button>
      </div>

      {/* Search Results Content */}
      {loading ? (
        <VideoCardSkeleton count={6} />
      ) : activeTab === 'videos' ? (
        videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <VideoCard key={v._id} video={v} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="search"
            title="No matching videos"
            description={`No results found for "${query}". Try searching with different terms.`}
          />
        )
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((u) => (
            <UserCard key={u._id} user={u} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="user"
          title="No channels found"
          description={`No channel profiles matched "${query}".`}
        />
      )}
    </div>
  );
};

export default SearchPage;
