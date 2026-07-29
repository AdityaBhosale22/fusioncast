import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreVertical, Share2, Plus, Play } from 'lucide-react';
import { formatViews } from '../../utils/formatViews';
import { timeAgo } from '../../utils/timeAgo';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import toast from 'react-hot-toast';

export const VideoCard = ({ video, onAddToPlaylist }) => {
  const navigate = useNavigate();
  if (!video) return null;

  const {
    _id,
    title,
    thumbnail,
    duration,
    views = 0,
    createdAt,
    owner = {},
  } = video;

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const dropdownItems = [
    {
      label: 'Add to Playlist',
      icon: Plus,
      onClick: () => onAddToPlaylist && onAddToPlaylist(video),
    },
    {
      label: 'Share Video',
      icon: Share2,
      onClick: () => {
        navigator.clipboard?.writeText?.(window.location.origin + `/video/${_id}`);
        toast.success('Video link copied to clipboard!');
      },
    },
  ];

  return (
    <div className="group flex flex-col gap-3 bg-[#18181B]/40 hover:bg-[#18181B] border border-zinc-800/60 hover:border-zinc-700/80 rounded-2xl p-2.5 transition-all duration-300 shadow-sm hover:shadow-glow">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
        <Link to={`/video/${_id}`} className="block w-full h-full">
          <img
            src={thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50 scale-90 group-hover:scale-100 transition-transform">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </div>
        </Link>
        {duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold rounded-md">
            {formatDuration(duration)}
          </span>
        )}
      </div>

      {/* Info Container */}
      <div className="flex gap-3 px-1 pb-1">
        <Link to={`/profile/${owner.username || 'antigravity_dev'}`} className="shrink-0">
          <Avatar src={owner.avatar} alt={owner.fullName || owner.username} size="md" />
        </Link>

        <div className="flex-1 min-w-0">
          <Link to={`/video/${_id}`} className="block">
            <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2 leading-snug group-hover:text-indigo-400 transition-colors">
              {title}
            </h3>
          </Link>
          <Link
            to={`/profile/${owner.username || 'antigravity_dev'}`}
            className="text-xs text-zinc-400 hover:text-zinc-200 block mt-1 truncate"
          >
            {owner.fullName || owner.username}
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
            <span>{formatViews(views)} views</span>
            <span>•</span>
            <span>{timeAgo(createdAt)}</span>
          </div>
        </div>

        <Dropdown
          trigger={
            <button className="p-1 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          }
          items={dropdownItems}
        />
      </div>
    </div>
  );
};

export default VideoCard;
