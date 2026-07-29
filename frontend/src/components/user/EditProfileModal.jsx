import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { useAuth } from '../../hooks/useAuth';
import authApi from '../../services/authApi';
import { Camera, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [coverPreview, setCoverPreview] = useState(user?.coverImage || '');

  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authApi.updateAccountDetails({
        fullName,
        username,
        bio,
      });

      updateUser({
        fullName,
        username,
        bio,
        avatar: avatarPreview,
        coverImage: coverPreview,
      });

      toast.success('Profile updated successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Channel Profile" maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Cover image editor */}
        <div className="relative h-32 w-full rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
          <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
          <label className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer transition-colors">
            <ImageIcon className="w-3.5 h-3.5" />
            Change Banner
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </label>
        </div>

        {/* Avatar image editor */}
        <div className="flex items-center gap-4 -mt-8 px-2 relative z-10">
          <div className="relative group">
            <Avatar src={avatarPreview} alt={fullName} size="xl" className="ring-4 ring-[#18181B]" />
            <label className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-white">
              <Camera className="w-6 h-6" />
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-200">Channel Avatar</span>
            <span className="text-xs text-zinc-500">JPG or PNG. Max 5MB.</span>
          </div>
        </div>

        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-300">Channel Bio</label>
          <textarea
            rows={3}
            placeholder="Tell your viewers about your channel..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl bg-[#18181B] border border-zinc-800 focus:border-indigo-500 text-zinc-100 placeholder-zinc-500 text-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
