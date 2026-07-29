import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { useAuth } from '../../hooks/useAuth';
import tweetApi from '../../services/tweetApi';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

export const CreateTweetModal = ({ isOpen, onClose, onCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await tweetApi.createTweet(content.trim());
      toast.success('Post published to FusionCast feed!');
      setContent('');
      onCreated && onCreated(res.data);
      onClose();
    } catch (err) {
      toast.error('Failed to post tweet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Community Post">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Avatar src={user?.avatar} alt={user?.fullName} size="md" />
          <textarea
            rows={4}
            placeholder="What's happening in your dev world?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#18181B] border border-zinc-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none transition-all"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
          <span className="text-xs text-zinc-500">{280 - content.length} characters left</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={loading}
              isDisabled={!content.trim()}
              icon={Send}
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTweetModal;
