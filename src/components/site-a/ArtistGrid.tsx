'use client';

import React, { useState, useMemo } from 'react';
import { Artist } from '@/types/artist';
import ArtistCard from './ArtistCard';
import ArtistModal from './ArtistModal';

export interface CategoryGroup<T> {
  id: string;
  label: string;
  items: T[];
}

interface ArtistGridProps {
  categories: CategoryGroup<Artist>[];
  allLabel?: string;
  className?: string;
  onArtistClick?: (artist: Artist) => void;
  showModalInternally?: boolean;
}

export default function ArtistGrid({
  categories,
  allLabel = '전체 (ALL)',
  className = '',
  onArtistClick,
  showModalInternally = true,
}: ArtistGridProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Flatten all artists for 'all' tab
  const allArtists = useMemo(() => {
    const seen = new Set<string>();
    const list: Artist[] = [];
    categories.forEach((cat) => {
      cat.items.forEach((artist) => {
        if (!seen.has(artist.slug)) {
          seen.add(artist.slug);
          list.push(artist);
        }
      });
    });
    return list;
  }, [categories]);

  // Current filtered artists
  const displayedArtists = useMemo(() => {
    if (activeCategoryId === 'all') {
      return allArtists;
    }
    const currentCat = categories.find((c) => c.id === activeCategoryId);
    return currentCat ? currentCat.items : [];
  }, [activeCategoryId, categories, allArtists]);

  const handleCardClick = (artist: Artist) => {
    if (onArtistClick) {
      onArtistClick(artist);
    }
    if (showModalInternally) {
      setSelectedArtist(artist);
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* ─── Category / Venue Tabs ─── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scroll-smooth hide-scrollbar select-none border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveCategoryId('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeCategoryId === 'all'
              ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20'
              : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
          }`}
        >
          <span>{allLabel}</span>
          <span className={`px-1.5 py-0.2 font-mono text-[10px] rounded-full ${
            activeCategoryId === 'all' ? 'bg-black/20 text-black font-extrabold' : 'bg-white/10 text-white/60'
          }`}>
            {allArtists.length}
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategoryId(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeCategoryId === cat.id
                ? 'bg-lime-400 text-black shadow-lg shadow-lime-400/20'
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`px-1.5 py-0.2 font-mono text-[10px] rounded-full ${
              activeCategoryId === cat.id ? 'bg-black/20 text-black font-extrabold' : 'bg-white/10 text-white/60'
            }`}>
              {cat.items.length}
            </span>
          </button>
        ))}
      </div>

      {/* ─── Responsive Grid ─── */}
      {displayedArtists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayedArtists.map((artist) => (
            <ArtistCard
              key={`${artist.slug}-${artist.venue_slug || ''}`}
              artist={artist}
              onClick={handleCardClick}
            />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center text-white/40 font-mono text-sm border border-dashed border-white/10 rounded-xl">
          등록된 작가가 없습니다.
        </div>
      )}

      {/* ─── Internal Modal ─── */}
      {showModalInternally && (
        <ArtistModal
          artist={selectedArtist}
          onClose={() => setSelectedArtist(null)}
        />
      )}
    </div>
  );
}
