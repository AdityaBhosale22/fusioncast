import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const base =
    'inline-flex items-center font-medium rounded-full border transition-all duration-200 select-none';

  const variants = {
    primary: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    accent: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    danger: 'bg-red-500/10 text-red-400 border-red-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    neutral: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
