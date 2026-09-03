'use client';

import React, { useState, useMemo } from 'react';
import { WorkWithArtist } from '@/types/artist';
import WorkCard from './WorkCard';
import { CardTheme } from './ArtistCard';

export interface CategoryGroup<T> {
  id: string;
  label: string;
  items: T[];
}

interface WorkGalleryProps {
  categories: CategoryGroup<WorkWithArtist>[];
  allLabel?: string;
  className?: string;
  theme?: CardTheme;
}

export default function WorkGallery({
  categories,
  allLabel = '전체 (ALL)',
  className = '',
  theme = 'lime',
}: WorkGalleryProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');

  // Flatten all works
  const allWorks = useMemo(() => {
    return categories.flatMap((cat) => cat.items);
  }, [categories]);

  // Current filtered works
  const displayedWorks = useMemo(() => {
    if (activeCategoryId === 'all') {
      return allWorks;
    }
    const currentCat = categories.find((c) => c.id === activeCategoryId);
    return currentCat ? currentCat.items : [];
  }, [activeCategoryId, categories, allWorks]);

  const tabActiveStyles = {
    lime: 'bg-lime-400 text-black shadow-lg shadow-lime-400/20 rounded-lg',
    cyan: 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] rounded-sm',
    peach: 'bg-gradient-to-r from-rose-500 to-violet-600 text-white shadow-rose-500/30 rounded-xl',
    blackwhite: 'bg-white text-black rounded-none border border-white',
  }[theme];

  const tabInactiveStyles = {
    lime: 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-lg',
    cyan: 'bg-[#04060A]/60 hover:bg-[#070B12] text-[#B8CBD3] hover:text-[#00E5FF] border border-[#00E5FF]/20 rounded-sm',
    peach: 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-xl backdrop-blur-sm',
    blackwhite: 'bg-transparent hover:bg-[#141414] text-[#8C8C8C] hover:text-white border border-[#2E2E2E] rounded-none',
  }[theme];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* ─── Category / Venue Tabs ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth hide-scrollbar select-none border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveCategoryId('all')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCategoryId === 'all' ? tabActiveStyles : tabInactiveStyles
          }`}
        >
          <span>{allLabel}</span>
          <span
            className={`px-1.5 py-0.2 font-mono text-[10px] rounded-full ${
              activeCategoryId === 'all' ? 'bg-black/20 text-black font-extrabold' : 'bg-white/10 text-white/60'
            }`}
          >
            {allWorks.length}
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategoryId(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeCategoryId === cat.id ? tabActiveStyles : tabInactiveStyles
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.2 font-mono text-[10px] rounded-full ${
                activeCategoryId === cat.id ? 'bg-black/20 text-black font-extrabold' : 'bg-white/10 text-white/60'
              }`}
            >
              {cat.items.length}
            </span>
          </button>
        ))}
      </div>

      {/* ─── Works Grid ─── */}
      {displayedWorks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {displayedWorks.map((item, idx) => (
            <WorkCard
              key={`${item.artist.slug}-${item.work.title.slice(0, 15)}-${idx}`}
              work={item.work}
              artist={item.artist}
              showArtistInfo={true}
              theme={theme}
            />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center text-white/40 font-mono text-sm border border-dashed border-white/10 rounded-xl">
          등록된 작품이 없습니다.
        </div>
      )}
    </div>
  );
}
