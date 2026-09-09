'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Artist } from '@/types/artist';
import ArtistCard, { CardTheme } from './ArtistCard';
import ArtistModal from './ArtistModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CategoryGroup<T> {
  id: string;
  label: string;
  items: T[];
}

function PaginatedArtistCarousel({ artists, theme, locale, onArtistClick }: { artists: Artist[], theme: CardTheme, locale: string, onArtistClick: (artist: Artist) => void }) {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth >= 1024 ? 8 : 4);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = useMemo(() => {
    const p = [];
    for (let i = 0; i < artists.length; i += itemsPerPage) {
      p.push(artists.slice(i, i + itemsPerPage));
    }
    return p;
  }, [artists, itemsPerPage]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const pageIndex = Math.round(target.scrollLeft / target.clientWidth);
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex);
    }
  };

  const scrollToPage = (pageIdx: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: pageIdx * scrollRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar border-y border-[#2E2E2E]"
        onScroll={handleScroll}
      >
        {pages.map((page, pageIdx) => (
          <div 
            key={pageIdx} 
            className="w-full flex-shrink-0 snap-start grid grid-cols-2 lg:grid-cols-4 grid-rows-2 divide-x divide-y divide-[#2E2E2E] bg-[#0A0A0A]"
          >
            {page.map((artist) => (
              <ArtistCard
                key={`${artist.slug}-${artist.venue_slug || ''}`}
                artist={artist}
                theme={theme}
                locale={locale}
                onClick={onArtistClick}
              />
            ))}
            {/* Fill empty slots in the last page if needed to maintain grid structure */}
            {Array.from({ length: itemsPerPage - page.length }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-[#0A0A0A] border-[#2E2E2E]" />
            ))}
          </div>
        ))}
      </div>
      
      {/* Pagination indicators & Arrows */}
      {pages.length > 1 && (
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => scrollToPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="hidden md:flex w-10 h-10 border border-white/20 hover:border-white hover:bg-white hover:text-black items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none text-white"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex justify-center gap-3">
            {pages.map((_, idx) => (
              <button
                key={idx} 
                onClick={() => scrollToPage(idx)}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${idx === currentPage ? 'bg-white' : 'bg-white/20 hover:bg-white/50'}`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToPage(Math.min(pages.length - 1, currentPage + 1))}
            disabled={currentPage === pages.length - 1}
            className="hidden md:flex w-10 h-10 border border-white/20 hover:border-white hover:bg-white hover:text-black items-center justify-center transition-colors disabled:opacity-30 disabled:pointer-events-none text-white"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

interface ArtistGridProps {
  categories: CategoryGroup<Artist>[];
  allLabel?: string;
  className?: string;
  onArtistClick?: (artist: Artist) => void;
  showModalInternally?: boolean;
  theme?: CardTheme;
  locale?: string;
}

export default function ArtistGrid({
  categories,
  allLabel,
  className = '',
  onArtistClick,
  showModalInternally = true,
  theme = 'lime',
  locale = 'ko',
}: ArtistGridProps) {
  const isKo = locale === 'ko';
  const effectiveAllLabel = allLabel || (isKo ? '전체 부문 (ALL)' : 'ALL VENUES');
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
          <span>{effectiveAllLabel}</span>
          <span
            className={`px-1.5 py-0.2 font-mono text-[10px] rounded-full ${
              activeCategoryId === 'all' ? 'bg-black/20 text-black font-extrabold' : 'bg-white/10 text-white/60'
            }`}
          >
            {allArtists.length}
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

      {/* ─── Responsive Grid ─── */}
      {displayedArtists.length > 0 ? (
        theme === 'blackwhite' ? (
          <PaginatedArtistCarousel 
            artists={displayedArtists} 
            theme={theme} 
            locale={locale} 
            onArtistClick={handleCardClick} 
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {displayedArtists.map((artist) => (
              <ArtistCard
                key={`${artist.slug}-${artist.venue_slug || ''}`}
                artist={artist}
                theme={theme}
                locale={locale}
                onClick={handleCardClick}
              />
            ))}
          </div>
        )
      ) : (
        <div className="p-16 text-center text-white/40 font-mono text-sm border border-dashed border-white/10 rounded-xl">
          {isKo ? '등록된 작가가 없습니다.' : 'No artists found.'}
        </div>
      )}

      {/* ─── Internal Modal ─── */}
      {showModalInternally && (
        <ArtistModal
          artist={selectedArtist}
          onClose={() => setSelectedArtist(null)}
          locale={locale}
          theme={theme}
        />
      )}
    </div>
  );
}
