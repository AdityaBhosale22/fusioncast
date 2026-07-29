import React from 'react';

export const Skeleton = ({ className = '', count = 1 }) => {
  const items = Array.from({ length: count });

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={`bg-zinc-800/60 animate-pulse rounded-xl ${className}`}
        />
      ))}
    </>
  );
};

export const VideoCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="w-full aspect-video rounded-xl bg-zinc-800/60 animate-pulse" />
          <div className="flex gap-3 mt-1">
            <div className="w-10 h-10 rounded-full bg-zinc-800/60 animate-pulse shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 bg-zinc-800/60 animate-pulse rounded-md w-4/5" />
              <div className="h-3 bg-zinc-800/60 animate-pulse rounded-md w-2/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
