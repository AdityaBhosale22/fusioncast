import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, UserPlus } from 'lucide-react';
import { formatViews } from '../../utils/formatViews';
import { useUserContext } from '../../contexts/UserContext';
import { subscriptionApi } from '../../services/subscriptionApi';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import toast from 'react-hot-toast';

export const UserCard = ({ user }) => {
  const { subscribedChannels, toggleSubscribedChannel } = useUserContext();

  if (!user) return null;

  const { _id, username, fullName, avatar, subscribersCount = 0, bio } = user;
  const isSubscribed = subscribedChannels.some(
    (item) => item.subscribedChannel?._id === _id
  );

  const handleSubscribeToggle = async () => {
    toggleSubscribedChannel(_id);
    try {
      await subscriptionApi.toggleSubscription(_id);
      toast.success(isSubscribed ? `Unsubscribed` : `Subscribed to ${fullName || username}`);
    } catch (err) {
      toast.error('Failed to update subscription');
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-[#18181B] border border-zinc-800 hover:border-zinc-700 rounded-2xl transition-all">
      <div className="flex items-center gap-4 min-w-0">
        <Link to={`/profile/${username}`}>
          <Avatar src={avatar} alt={fullName} size="lg" />
        </Link>
        <div className="flex flex-col min-w-0">
          <Link
            to={`/profile/${username}`}
            className="text-base font-semibold text-zinc-100 hover:text-indigo-400 truncate transition-colors"
          >
            {fullName || username}
          </Link>
          <span className="text-xs text-zinc-400">@{username}</span>
          <span className="text-xs text-zinc-500 mt-0.5">
            {formatViews(subscribersCount)} subscribers
          </span>
          {bio && <p className="text-xs text-zinc-400 line-clamp-1 mt-1">{bio}</p>}
        </div>
      </div>

      <Button
        variant={isSubscribed ? 'secondary' : 'primary'}
        size="sm"
        icon={isSubscribed ? UserCheck : UserPlus}
        onClick={handleSubscribeToggle}
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </Button>
    </div>
  );
};

export default UserCard;
