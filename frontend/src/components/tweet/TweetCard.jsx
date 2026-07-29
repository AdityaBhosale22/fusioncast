import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Repeat2, Trash2 } from 'lucide-react';
import { timeAgo } from '../../utils/timeAgo';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../common/Avatar';
import toast from 'react-hot-toast';

export const TweetCard = ({ tweet, onDelete }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(tweet.isLiked || false);
  const [likesCount, setLikesCount] = useState(tweet.likesCount || 0);

  if (!tweet) return null;

  const { _id, content, createdAt, owner = {} } = tweet;
  const isOwner = user?._id === owner._id || user?.username === owner.username;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="p-4 bg-[#18181B] border border-zinc-800 hover:border-zinc-700/80 rounded-2xl flex gap-3 transition-all duration-200 group">
      <Link to={`/profile/${owner.username || 'antigravity_dev'}`} className="shrink-0">
        <Avatar src={owner.avatar} alt={owner.fullName} size="md" />
      </Link>

      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 truncate">
            <Link
              to={`/profile/${owner.username || 'antigravity_dev'}`}
              className="font-semibold text-sm text-zinc-100 hover:text-indigo-400 truncate"
            >
              {owner.fullName || owner.username}
            </Link>
            <span className="text-xs text-zinc-500 truncate">@{owner.username}</span>
            <span className="text-xs text-zinc-600">•</span>
            <span className="text-xs text-zinc-500 shrink-0">{timeAgo(createdAt)}</span>
          </div>

          {isOwner && (
            <button
              onClick={() => onDelete && onDelete(_id)}
              className="text-red-400 hover:text-red-300 p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg hover:bg-zinc-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <p className="text-sm text-zinc-200 whitespace-pre-line leading-relaxed mb-3">{content}</p>

        {/* Footer Actions */}
        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 hover:text-rose-400 transition-colors ${
              isLiked ? 'text-rose-500 font-semibold' : ''
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => toast.success('Retweeted to feed!')}
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Repeat2 className="w-4 h-4" />
            <span>Repost</span>
          </button>

          <button
            onClick={() => toast.success('Reply box opened')}
            className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
