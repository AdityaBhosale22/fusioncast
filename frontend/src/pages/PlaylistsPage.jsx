import React, { useState, useEffect } from 'react';
import { playlistApi, mockPlaylists } from '../services/playlistApi';
import PlaylistCard from '../components/playlist/PlaylistCard';
import CreatePlaylistModal from '../components/playlist/CreatePlaylistModal';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { ListVideo, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const PlaylistsPage = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const res = await playlistApi.getUserPlaylists(user?._id || 'usr_demo_101');
        setPlaylists(res.data || mockPlaylists);
      } catch (err) {
        setPlaylists(mockPlaylists);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [user]);

  const handleDeletePlaylist = async (id) => {
    try {
      await playlistApi.deletePlaylist(id);
      setPlaylists((prev) => prev.filter((p) => p._id !== id));
      toast.success('Playlist deleted');
    } catch (err) {
      toast.error('Failed to delete playlist');
    }
  };

  const handleCreated = (newPl) => {
    setPlaylists([newPl, ...playlists]);
  };

  if (loading) return <Loader size="lg" text="Loading playlists..." />;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <ListVideo className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Playlists</h1>
            <p className="text-sm text-zinc-400">Organize and watch your saved video collections</p>
          </div>
        </div>

        <Button variant="primary" icon={Plus} onClick={() => setCreateModalOpen(true)}>
          Create Playlist
        </Button>
      </div>

      {/* Grid */}
      {playlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((pl) => (
            <PlaylistCard
              key={pl._id}
              playlist={pl}
              onDelete={handleDeletePlaylist}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="folder"
          title="No playlists created yet"
          description="Create your first playlist to group related video tutorials and streams."
          actionLabel="Create Playlist"
          onAction={() => setCreateModalOpen(true)}
        />
      )}

      {/* Modal */}
      <CreatePlaylistModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
};

export default PlaylistsPage;
