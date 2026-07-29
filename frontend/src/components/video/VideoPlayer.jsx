import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ThumbsUp,
  Share2,
  ListPlus,
  UserPlus,
  UserCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { formatViews } from '../../utils/formatViews';
import { formatDate } from '../../utils/formatDate';
import { useUserContext } from '../../contexts/UserContext';
import { likeApi } from '../../services/likeApi';
import { subscriptionApi } from '../../services/subscriptionApi';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export const VideoPlayer = ({ video, onOpenPlaylistModal }) => {
  const { likedVideoIds, toggleLikedVideo, toggleSubscribedChannel, subscribedChannels } =
    useUserContext();

  const [showFullDesc, setShowFullDesc] = useState(false);

  if (!video) return null;

  const {
    _id,
    title,
    description,
    videoFile,
    views = 0,
    createdAt,
    likesCount = 0,
    owner = {},
  } = video;

  const isLiked = likedVideoIds.has(_id);
  const isSubscribed = subscribedChannels.some(
    (item) => item.subscribedChannel?._id === owner._id
  );

  const [currentLikes, setCurrentLikes] = useState(likesCount);

  const handleLikeToggle = async () => {
    toggleLikedVideo(_id);
    setCurrentLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    try {
      await likeApi.toggleVideoLike(_id);
    } catch (err) {
      toast.error('Failed to sync like');
    }
  };

  const handleSubscribeToggle = async () => {
    toggleSubscribedChannel(owner._id);
    try {
      await subscriptionApi.toggleSubscription(owner._id);
      toast.success(isSubscribed ? `Unsubscribed from ${owner.fullName}` : `Subscribed to ${owner.fullName}`);
    } catch (err) {
      toast.error('Subscription update failed');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    toast.success('Video URL copied to clipboard!');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* HTML5 Player Frame */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-zinc-800">
        <video
          src={videoFile || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
          controls
          autoPlay
          className="w-full h-full object-contain"
          poster={video.thumbnail}
        />
      </div>

      {/* Video Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 leading-snug">{title}</h1>

      {/* Owner Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-zinc-800/80">
        {/* Channel info */}
        <div className="flex items-center gap-3">
          <Link to={`/profile/${owner.username || 'antigravity_dev'}`}>
            <Avatar src={owner.avatar} alt={owner.fullName} size="lg" />
          </Link>
          <div className="flex flex-col">
            <Link
              to={`/profile/${owner.username || 'antigravity_dev'}`}
              className="text-base font-semibold text-zinc-100 hover:text-indigo-400 transition-colors"
            >
              {owner.fullName || owner.username}
            </Link>
            <span className="text-xs text-zinc-400">
              {formatViews(owner.subscribersCount || 14200)} subscribers
            </span>
          </div>
          <Button
            variant={isSubscribed ? 'secondary' : 'primary'}
            size="sm"
            icon={isSubscribed ? UserCheck : UserPlus}
            onClick={handleSubscribeToggle}
            className="ml-3"
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={isLiked ? 'primary' : 'glass'}
            size="sm"
            icon={ThumbsUp}
            onClick={handleLikeToggle}
          >
            <span>{formatViews(currentLikes)}</span>
          </Button>

          <Button variant="glass" size="sm" icon={Share2} onClick={handleShare}>
            Share
          </Button>

          <Button
            variant="glass"
            size="sm"
            icon={ListPlus}
            onClick={() => onOpenPlaylistModal && onOpenPlaylistModal(video)}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Video Description Box */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-2xl p-4 text-sm text-zinc-300 transition-all">
        <div className="flex items-center gap-3 text-xs font-semibold text-zinc-400 mb-2">
          <span>{formatViews(views)} views</span>
          <span>•</span>
          <span>{formatDate(createdAt)}</span>
        </div>
        <p className={`whitespace-pre-line leading-relaxed ${!showFullDesc ? 'line-clamp-3' : ''}`}>
          {description || 'No description provided for this video stream.'}
        </p>
        <button
          onClick={() => setShowFullDesc(!showFullDesc)}
          className="mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 focus:outline-none"
        >
          {showFullDesc ? (
            <>
              Show less <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Show more <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
