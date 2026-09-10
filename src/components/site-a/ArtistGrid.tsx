'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Artist } from '@/types/artist';
import ArtistCard, { CardTheme } from './ArtistCard';
import ArtistModal from './ArtistModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import exhibitionCategoriesData from '../../../public/exhibition-categories.json';

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

  useEffect(() => {
    setCurrentPage(0);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [artists]);

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
    <div className="space-y-2 sm:space-y-3">
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
              <div key={`empty-${i}`} className="bg-[#0A0A0A] border-[#2E2E2E] h-full min-h-[100px]" />
            ))}
          </div>
        ))}
      </div>
      
      {/* Pagination indicators & Arrows */}
      <div className={`flex items-center justify-center gap-6 min-h-[40px] pt-1 sm:pt-2 transition-opacity duration-200 ${pages.length > 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  useEffect(() => {
    if (categories.length > 0 && (!activeCategoryId || !categories.some((c) => c.id === activeCategoryId))) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  // Current filtered artists
  const displayedArtists = useMemo(() => {
    const currentCat = categories.find((c) => c.id === activeCategoryId) || categories[0];
    return currentCat ? currentCat.items : [];
  }, [activeCategoryId, categories]);

  // Current Venue Description & Official Name from exhibition-categories.json
  const currentVenueInfo = useMemo(() => {
    return exhibitionCategoriesData.categories.find(
      (c) => c.id === activeCategoryId || c.manifestVenueSlug === activeCategoryId
    );
  }, [activeCategoryId]);

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
    <div className={`space-y-2 sm:space-y-3 ${className}`}>
      {/* ─── Category / Venue Tabs ─── */}
      <div className="sticky top-0 z-20 bg-[#0A0A0A] flex items-center gap-2 overflow-x-auto pb-2.5 pt-1 scroll-smooth hide-scrollbar select-none border-b border-white/10">

        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategoryId(cat.id)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-caption sm:text-body font-bold transition-all whitespace-nowrap cursor-pointer ${
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

      {/* ─── Official Venue Banner (Inverted White Box) ─── */}
      {currentVenueInfo && (
        <div className="bg-white text-black p-4 sm:p-5 border border-white my-3 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2 border-b border-black/15 pb-2">
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="font-mono text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 tracking-wider">
                OFFICIAL VENUE
              </span>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">
                {isKo ? currentVenueInfo.officialName.ko : currentVenueInfo.officialName.en}
              </h3>
            </div>
            <span className="font-mono text-xs font-bold text-black/60">
              {isKo ? currentVenueInfo.subtitle?.ko : currentVenueInfo.subtitle?.en}
            </span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-black/90 font-medium">
            {isKo ? currentVenueInfo.description.ko : currentVenueInfo.description.en}
          </p>
          {currentVenueInfo.missingArtists && currentVenueInfo.missingArtists.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-black/10 text-[11px] font-mono text-black/75 flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-black bg-black/10 px-1.5 py-0.5">추가 참여 작가 (자료 준비 중)</span>
              <span>
                {currentVenueInfo.missingArtists.map((a: { name_ko: string; name_en: string }) => (isKo ? a.name_ko : a.name_en)).join(', ')}
              </span>
            </div>
          )}
        </div>
      )}

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
        <div className="p-16 text-center text-white/40 font-mono text-body border border-dashed border-white/10 rounded-xl">
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
