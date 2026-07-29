import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { playlistApi } from '../../services/playlistApi';
import toast from 'react-hot-toast';

export const CreatePlaylistModal = ({ isOpen, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await playlistApi.createPlaylist({
        name: name.trim(),
        description: description.trim(),
      });
      toast.success('Playlist created successfully!');
      setName('');
      setDescription('');
      onCreated && onCreated(res.data);
      onClose();
    } catch (err) {
      toast.error('Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Playlist">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Playlist Name"
          placeholder="e.g. My Favorite React Tutorials"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-300">Description</label>
          <textarea
            rows={3}
            placeholder="Add an optional description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl bg-[#18181B] border border-zinc-800 focus:border-indigo-500 text-zinc-100 placeholder-zinc-500 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={loading} isDisabled={!name.trim()}>
            Create Playlist
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePlaylistModal;
