import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090B] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500/30 focus:ring-indigo-500',
    accent:
      'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25 border border-violet-500/30 focus:ring-violet-500',
    secondary:
      'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/80 focus:ring-zinc-600',
    outline:
      'bg-transparent hover:bg-zinc-800/80 text-zinc-200 border border-zinc-700 hover:border-zinc-500 focus:ring-indigo-500',
    ghost:
      'bg-transparent hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-100 focus:ring-zinc-600',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 border border-red-500/30 focus:ring-red-500',
    glass:
      'backdrop-blur-md bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-100 border border-zinc-700/50 shadow-glass focus:ring-indigo-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
