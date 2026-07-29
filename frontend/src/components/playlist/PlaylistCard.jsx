import React from 'react';
import { Link } from 'react-router-dom';
import { ListVideo, Trash2, Edit, Play } from 'lucide-react';
import Dropdown from '../common/Dropdown';

export const PlaylistCard = ({ playlist, onDelete, onEdit }) => {
  if (!playlist) return null;

  const { _id, name, description, videos = [] } = playlist;
  const firstVideo = videos[0];
  const coverUrl =
    firstVideo?.thumbnail ||
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800';

  const dropdownItems = [
    {
      label: 'Edit Playlist',
      icon: Edit,
      onClick: () => onEdit && onEdit(playlist),
    },
    {
      label: 'Delete Playlist',
      icon: Trash2,
      danger: true,
      onClick: () => onDelete && onDelete(_id),
    },
  ];

  return (
    <div className="group flex flex-col bg-[#18181B] border border-zinc-800 hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-glow">
      {/* Cover */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        <img
          src={coverUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Overlay showing video count */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-1 border-l border-white/10">
          <ListVideo className="w-6 h-6 text-indigo-400" />
          <span className="text-sm font-bold">{videos.length}</span>
          <span className="text-[10px] uppercase font-semibold text-zinc-400">Videos</span>
        </div>

        {/* Play all button on hover */}
        <Link
          to={`/playlist/${_id}`}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </Link>
      </div>

      {/* Info */}
      <div className="p-4 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <Link to={`/playlist/${_id}`} className="block">
            <h3 className="text-base font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors truncate">
              {name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
            {description || 'No description provided.'}
          </p>
        </div>

        <Dropdown
          trigger={
            <button className="p-1 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors">
              <ListVideo className="w-4 h-4" />
            </button>
          }
          items={dropdownItems}
        />
      </div>
    </div>
  );
};

export default PlaylistCard;
