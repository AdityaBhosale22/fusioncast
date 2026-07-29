import React from 'react';
import { Video, FolderOpen, Search, UserX, MessageSquare } from 'lucide-react';
import Button from './Button';

const iconMap = {
  video: Video,
  folder: FolderOpen,
  search: Search,
  user: UserX,
  comment: MessageSquare,
};

export const EmptyState = ({
  icon = 'video',
  title = 'No content found',
  description = 'There are no items to show at the moment.',
  actionLabel,
  onAction,
  className = '',
}) => {
  const IconComponent = iconMap[icon] || Video;

  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 bg-[#18181B]/50 border border-zinc-800/80 rounded-2xl ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-100 mb-1">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
