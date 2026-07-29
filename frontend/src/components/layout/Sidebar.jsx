import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Tv,
  ListVideo,
  ThumbsUp,
  History,
  Settings,
  Upload,
  UserCheck,
  Compass,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useUserContext } from '../../contexts/UserContext';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../common/Avatar';

export const Sidebar = () => {
  const { sidebarOpen, subscribedChannels } = useUserContext();
  const { user } = useAuth();

  const mainNavItems = [
    { label: 'Home Feed', path: '/home', icon: Home },
    { label: 'Subscriptions', path: '/subscriptions', icon: Tv },
    { label: 'Playlists', path: '/playlists', icon: ListVideo },
    { label: 'Upload Studio', path: '/upload', icon: Upload },
  ];

  const secondaryNavItems = [
    { label: 'Liked Videos', path: `/profile/${user?.username || 'antigravity_dev'}?tab=liked`, icon: ThumbsUp },
    { label: 'Watch History', path: `/profile/${user?.username || 'antigravity_dev'}?tab=history`, icon: History },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 bg-[#09090B] border-r border-zinc-800/80 flex flex-col shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto custom-scrollbar p-3 z-30 transition-all duration-300">
      {/* Main Nav */}
      <div className="flex flex-col gap-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="my-4 border-t border-zinc-800/80" />

      {/* Library / Personal */}
      <div className="flex flex-col gap-1">
        <p className="px-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
          Library
        </p>
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="my-4 border-t border-zinc-800/80" />

      {/* Subscriptions section */}
      <div className="flex flex-col gap-1">
        <p className="px-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
          Subscriptions
        </p>
        {subscribedChannels.length > 0 ? (
          subscribedChannels.map((sub) => {
            const ch = sub.subscribedChannel || {};
            return (
              <NavLink
                key={ch._id || sub._id}
                to={`/profile/${ch.username || 'user'}`}
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
              >
                <Avatar src={ch.avatar} alt={ch.fullName} size="xs" />
                <span className="truncate">{ch.fullName || ch.username}</span>
              </NavLink>
            );
          })
        ) : (
          <p className="px-3.5 text-xs text-zinc-600 italic">No channels subscribed yet.</p>
        )}
      </div>

      {/* Footer Banner in Sidebar */}
      <div className="mt-auto pt-6">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/20">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4" /> FusionCast Pro
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
            Stream 4K videos, tweet with zero limits, and publish playlists.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
