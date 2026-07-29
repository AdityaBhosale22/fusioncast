import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ size = 'md', fullScreen = false, text }) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div className={`${sizeMap[size]} rounded-full border-2 border-indigo-500/20 animate-ping absolute inset-0`} />
        <Loader2 className={`${sizeMap[size]} text-indigo-500 animate-spin relative z-10`} />
      </div>
      {text && <p className="text-sm text-zinc-400 font-medium animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/90 backdrop-blur-md">
        {spinner}
      </div>
    );
  }

  return <div className="p-8 flex items-center justify-center">{spinner}</div>;
};

export default Loader;
