import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  Search,
  Upload,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Film,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUserContext } from '../../contexts/UserContext';
import Avatar from '../common/Avatar';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useUserContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const userDropdownItems = [
    {
      label: user?.fullName || 'My Channel',
      icon: User,
      onClick: () => navigate(`/profile/${user?.username || 'antigravity_dev'}`),
    },
    {
      label: 'Upload Video',
      icon: Upload,
      onClick: () => navigate('/upload'),
    },
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => navigate('/settings'),
    },
    { divider: true },
    {
      label: 'Logout',
      icon: LogOut,
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 flex items-center justify-between gap-4">
      {/* Left section: Hamburger & Brand logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Film className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
              Fusion<span className="text-indigo-400">Cast</span>
              <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            </span>
          </div>
        </Link>
      </div>

      {/* Middle section: Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl hidden sm:flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search videos, creators, tweets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#18181B] border border-zinc-800 rounded-full py-2 pl-4 pr-10 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Right section: Actions & User Avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/search')}
          className="p-2 sm:hidden text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800"
        >
          <Search className="w-5 h-5" />
        </button>

        {isAuthenticated ? (
          <>
            <Link to="/upload">
              <Button variant="glass" size="sm" icon={Upload} className="hidden md:inline-flex">
                Create
              </Button>
            </Link>

            <button
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
            </button>

            <Dropdown
              trigger={
                <button className="flex items-center gap-2 focus:outline-none">
                  <Avatar
                    src={user?.avatar}
                    alt={user?.fullName || 'User Avatar'}
                    size="sm"
                    online
                  />
                </button>
              }
              items={userDropdownItems}
            />
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
