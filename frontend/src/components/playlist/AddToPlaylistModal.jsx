import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { playlistApi, mockPlaylists } from '../../services/playlistApi';
import { useAuth } from '../../hooks/useAuth';
import { Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const AddToPlaylistModal = ({ isOpen, onClose, video }) => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedSet, setAddedSet] = useState(new Set());

  useEffect(() => {
    if (isOpen && user?._id) {
      setLoading(true);
      playlistApi
        .getUserPlaylists(user._id)
        .then((res) => {
          const list = res.data || mockPlaylists;
          setPlaylists(list);

          if (video) {
            const added = new Set();
            list.forEach((p) => {
              if (p.videos?.some((v) => v._id === video._id)) {
                added.add(p._id);
              }
            });
            setAddedSet(added);
          }
        })
        .catch(() => setPlaylists(mockPlaylists))
        .finally(() => setLoading(false));
    }
  }, [isOpen, user, video]);

  const handleToggleVideo = async (playlistId) => {
    if (!video) return;
    const isAdded = addedSet.has(playlistId);

    try {
      if (isAdded) {
        await playlistApi.removeVideoFromPlaylist(playlistId, video._id);
        setAddedSet((prev) => {
          const next = new Set(prev);
          next.delete(playlistId);
          return next;
        });
        toast.success('Removed from playlist');
      } else {
        await playlistApi.addVideoToPlaylist(playlistId, video._id);
        setAddedSet((prev) => new Set(prev).add(playlistId));
        toast.success('Added to playlist');
      }
    } catch (err) {
      toast.error('Action failed');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save to Playlist">
      {loading ? (
        <Loader size="md" />
      ) : playlists.length > 0 ? (
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
          {playlists.map((pl) => {
            const isAdded = addedSet.has(pl._id);
            return (
              <button
                key={pl._id}
                onClick={() => handleToggleVideo(pl._id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${
                  isAdded
                    ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300'
                    : 'bg-[#18181B] border-zinc-800 text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <div className="flex flex-col text-left">
                  <span>{pl.name}</span>
                  <span className="text-xs text-zinc-500">{pl.videos?.length || 0} videos</span>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                    isAdded
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'border-zinc-700 text-zinc-500'
                  }`}
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-zinc-400 text-center py-4">No playlists found.</p>
      )}
      <div className="mt-6 flex justify-end">
        <Button variant="secondary" onClick={onClose}>
          Done
        </Button>
      </div>
    </Modal>
  );
};

export default AddToPlaylistModal;
