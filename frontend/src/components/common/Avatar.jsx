import React, { useState } from 'react';
import { DEFAULT_AVATAR } from '../../constants';

export const Avatar = ({
  src,
  alt = 'User Avatar',
  size = 'md',
  className = '',
  online = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-28 h-28 text-2xl',
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const avatarSrc = imgError || !src ? DEFAULT_AVATAR : src;

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        className={`${sizes[size]} rounded-full overflow-hidden bg-zinc-800 border border-zinc-700/60 shadow-md flex items-center justify-center font-bold text-zinc-300 select-none`}
      >
        <img
          src={avatarSrc}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#09090B] rounded-full shadow-sm" />
      )}
    </div>
  );
};

export default Avatar;
