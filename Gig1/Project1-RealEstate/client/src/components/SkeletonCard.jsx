import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[16/10] bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Body Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="h-3.5 bg-slate-200 rounded w-1/3" />
          <div className="h-5 bg-slate-200 rounded w-4/5" />
          <div className="h-3 bg-slate-200 rounded w-full" />
        </div>

        {/* Specs bar Skeleton */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="h-4 bg-slate-200 rounded w-14" />
          <div className="h-4 bg-slate-200 rounded w-14" />
          <div className="h-4 bg-slate-200 rounded w-14" />
        </div>

        {/* Button Skeleton */}
        <div className="h-9 bg-slate-200 rounded-xl w-full" />
      </div>
    </div>
  );
};

export default SkeletonCard;
