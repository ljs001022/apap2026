'use client';

import React, { useState } from 'react';
import { Work, Artist } from '@/types/artist';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

import {
  getLocalizedTitle,
  getLocalizedMaterial,
  getLocalizedDescription,
  getLocalizedArtistName,
  getLocalizedVenueName,
} from '@/lib/artistLocalization';

import { CardTheme } from './ArtistCard';

interface WorkCardProps {
  work: Work;
  artist?: Artist;
  className?: string;
  showArtistInfo?: boolean;
  theme?: CardTheme;
  locale?: string;
}

export default function WorkCard({
  work,
  artist,
  className = '',
  showArtistInfo = true,
  theme = 'lime',
  locale = 'ko',
}: WorkCardProps) {
  const isKo = locale === 'ko';
  const images = work.images || [];
  const hasImages = images.length > 0;
  const isMultiImage = images.length > 1;

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const localizedTitle = getLocalizedTitle(work.title, locale);
  const localizedMaterial = getLocalizedMaterial(work.material || '', locale);
  const localizedDescription = getLocalizedDescription(work.description || '', locale);
  const localizedVenue = artist?.venue_slug
    ? getLocalizedVenueName(artist.venue_slug, locale)
    : (isKo ? artist?.venue_ko : (artist?.venue_slug || artist?.venue_ko));
  const artistNames = artist ? getLocalizedArtistName(artist, locale) : null;

  const hasYear = Boolean(work.year && work.year.trim() !== '');
  const hasMaterial = Boolean(localizedMaterial && localizedMaterial.trim() !== '');
  const hasSize = Boolean(work.size && work.size.trim() !== '');
  const hasDescription = Boolean(localizedDescription && localizedDescription.trim() !== '');

  const themeStyles = {
    lime: {
      card: 'bg-[#0b0f17]/90 border-white/10 hover:border-lime-400/40 rounded-xl',
      artistText: 'text-lime-400 group-hover:text-lime-300',
      badge: 'bg-black/75 border-white/15 text-white/90',
      yearBadge: 'bg-white/10 border-white/15 text-white/80',
    },
    cyan: {
      card: 'bg-[#04060A]/90 border-[#00E5FF]/20 hover:border-[#00E5FF] rounded-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]',
      artistText: 'text-[#00E5FF]',
      badge: 'bg-[#04060A]/90 border-[#00E5FF]/30 text-[#00E5FF]',
      yearBadge: 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF]',
    },
    peach: {
      card: 'bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md border-white/15 hover:border-rose-400/50 rounded-2xl',
      artistText: 'text-rose-300',
      badge: 'bg-black/50 border-rose-400/30 text-rose-200',
      yearBadge: 'bg-rose-500/10 border-rose-400/30 text-rose-200',
    },
    blackwhite: {
      card: 'bg-[#141414] hover:bg-[#1C1C1C] border-white hover:border-white rounded-none',
      artistText: 'text-white font-extrabold',
      badge: 'bg-[#002FA7] border-transparent text-white',
      yearBadge: 'bg-[#002FA7] border-transparent text-white font-bold',
    },
  }[theme];

  return (
    <article
      className={`group flex flex-col border overflow-hidden transition-all duration-300 shadow-md ${themeStyles.card} ${className}`}
    >
      {/* ─── Image Gallery / Carousel ─── */}
      {hasImages && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black select-none border-b border-white/10">
          <img
            src={images[activeImgIndex]}
            alt={localizedTitle}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Carousel controls if multiple images */}
          {isMultiImage && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer border border-white/20 shadow-md z-10"
                aria-label="Previous work image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer border border-white/20 shadow-md z-10"
                aria-label="Next work image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Counter / Dots */}
              <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full font-mono text-[10px] text-white/90 border border-white/15">
                <span>
                  {activeImgIndex + 1} / {images.length}
                </span>
              </div>
            </>
          )}

          {/* Venue badge on top right */}
          {localizedVenue && (
            <span
              className={`absolute top-3 right-3 font-mono text-[9px] font-bold border px-2.5 py-1 uppercase tracking-wider ${
                theme === 'blackwhite' ? 'rounded-sm' : 'rounded-full'
              } ${themeStyles.badge}`}
            >
              {localizedVenue}
            </span>
          )}
        </div>
      )}

      {/* ─── Content ─── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-3.5">
          {/* Top meta tags */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {showArtistInfo && artistNames && (
              <div className="flex items-center gap-2">
                <span className={`font-bold text-sm transition-colors ${themeStyles.artistText}`}>
                  {artistNames.primary}
                </span>
                {artistNames.secondary && (
                  <span className="font-mono text-xs text-white/50">
                    ({artistNames.secondary})
                  </span>
                )}
              </div>
            )}

            {hasYear && (
              <span className={`font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded border ml-auto ${themeStyles.yearBadge}`}>
                {work.year}
              </span>
            )}
          </div>

          {/* Work Title */}
          <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug tracking-tight">
            {localizedTitle}
          </h4>

          {/* Material & Size */}
          {(hasMaterial || hasSize) && (
            <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-xs text-white/60">
              {hasMaterial && (
                <p className="leading-relaxed">
                  <span className="text-white/40 mr-1.5 font-bold">{isKo ? '재료:' : 'Material:'}</span>
                  {localizedMaterial}
                </p>
              )}
              {hasSize && (
                <p className="leading-relaxed">
                  <span className="text-white/40 mr-1.5 font-bold">{isKo ? '크기:' : 'Size:'}</span>
                  {work.size}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          {hasDescription && (
            <div className="pt-3 text-xs sm:text-sm text-white/70 whitespace-pre-line leading-relaxed font-light border-t border-white/5 max-h-48 overflow-y-auto pr-1">
              {localizedDescription}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
