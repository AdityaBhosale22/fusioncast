import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { playlistApi, mockPlaylists } from '../services/playlistApi';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { formatViews } from '../utils/formatViews';
import { timeAgo } from '../utils/timeAgo';
import { Play, Trash2, ListVideo, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const PlaylistDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      setLoading(true);
      try {
        const res = await playlistApi.getPlaylistById(id);
        setPlaylist(res.data);
      } catch (err) {
        const found = mockPlaylists.find((p) => p._id === id) || mockPlaylists[0];
        setPlaylist(found);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPlaylistDetails();
  }, [id]);

  const handleRemoveVideo = async (videoId) => {
    try {
      await playlistApi.removeVideoFromPlaylist(id, videoId);
      setPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
      }));
      toast.success('Video removed from playlist');
    } catch (err) {
      toast.error('Failed to remove video');
    }
  };

  if (loading) return <Loader size="lg" text="Loading playlist details..." />;
  if (!playlist) return null;

  const firstVideo = playlist.videos?.[0];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar Banner Card for Playlist */}
      <div className="w-full lg:w-80 shrink-0 bg-[#18181B] border border-zinc-800 rounded-3xl p-6 flex flex-col gap-4 h-fit sticky top-20">
        <button
          onClick={() => navigate('/playlists')}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors w-fit mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Playlists
        </button>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-xl border border-zinc-800">
          <img
            src={
              firstVideo?.thumbnail ||
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
            }
            alt={playlist.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-zinc-100">{playlist.name}</h1>
          <span className="text-xs text-zinc-400 font-medium">
            {playlist.videos?.length || 0} videos
          </span>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            {playlist.description || 'No description provided.'}
          </p>
        </div>

        {firstVideo && (
          <Link to={`/video/${firstVideo._id}`}>
            <Button variant="primary" size="lg" icon={Play} className="w-full mt-2">
              Play All
            </Button>
          </Link>
        )}
      </div>

      {/* Right Section: Video Items List */}
      <div className="flex-1 flex flex-col gap-4">
        {playlist.videos && playlist.videos.length > 0 ? (
          playlist.videos.map((vid, index) => (
            <div
              key={vid._id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-[#18181B] border border-zinc-800 hover:border-zinc-700 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-sm font-bold text-zinc-500 w-6 text-center">
                  {index + 1}
                </span>

                <Link
                  to={`/video/${vid._id}`}
                  className="relative aspect-video w-36 shrink-0 rounded-xl overflow-hidden bg-zinc-900"
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="flex flex-col min-w-0">
                  <Link to={`/video/${vid._id}`} className="block">
                    <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {vid.title}
                    </h3>
                  </Link>
                  <span className="text-xs text-zinc-400 mt-0.5">
                    {vid.owner?.fullName || vid.owner?.username}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-1">
                    <span>{formatViews(vid.views)} views</span>
                    <span>•</span>
                    <span>{timeAgo(vid.createdAt)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemoveVideo(vid._id)}
                className="p-2 text-zinc-400 hover:text-red-400 rounded-xl hover:bg-zinc-800 transition-colors opacity-0 group-hover:opacity-100"
                title="Remove video"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <EmptyState
            icon="video"
            title="Playlist is empty"
            description="Browse videos and click 'Save to Playlist' to add items to this collection."
            actionLabel="Explore Videos"
            onAction={() => navigate('/home')}
          />
        )}
      </div>
    </div>
  );
};

export default PlaylistDetailsPage;
