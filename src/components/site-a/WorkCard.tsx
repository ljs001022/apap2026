'use client';

import React, { useState } from 'react';
import { Work, Artist } from '@/types/artist';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface WorkCardProps {
  work: Work;
  artist?: Artist;
  className?: string;
  showArtistInfo?: boolean;
}

export default function WorkCard({
  work,
  artist,
  className = '',
  showArtistInfo = true,
}: WorkCardProps) {
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

  const hasYear = Boolean(work.year && work.year.trim() !== '');
  const hasMaterial = Boolean(work.material && work.material.trim() !== '');
  const hasSize = Boolean(work.size && work.size.trim() !== '');
  const hasDescription = Boolean(work.description && work.description.trim() !== '');

  return (
    <article
      className={`group flex flex-col bg-[#0b0f17]/90 border border-white/10 hover:border-lime-400/40 rounded-xl overflow-hidden transition-all duration-300 shadow-md ${className}`}
    >
      {/* ─── Image Gallery / Carousel ─── */}
      {hasImages && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black select-none border-b border-white/10">
          <img
            src={images[activeImgIndex]}
            alt={work.title.split('\n')[0]}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Carousel controls if multiple images */}
          {isMultiImage && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white/90 hover:text-white border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Counter / Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                <span className="font-mono text-[10px] font-bold text-white tracking-widest">
                  {activeImgIndex + 1} / {images.length}
                </span>
              </div>
            </>
          )}

          {/* Venue badge on top right */}
          {artist?.venue_ko && (
            <span className="absolute top-3 right-3 font-mono text-[9px] font-bold text-white/90 bg-black/75 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {artist.venue_ko}
            </span>
          )}
        </div>
      )}

      {/* ─── Content ─── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-3.5">
          {/* Top meta tags */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {showArtistInfo && artist && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-lime-400 group-hover:text-lime-300 transition-colors">
                  {artist.name_ko}
                </span>
                {artist.name_en && artist.name_en !== '국영문' && (
                  <span className="font-mono text-xs text-white/50">
                    ({artist.name_en})
                  </span>
                )}
              </div>
            )}

            {hasYear && (
              <span className="font-mono text-[11px] font-semibold text-white/80 bg-white/10 px-2.5 py-0.5 rounded border border-white/15 ml-auto">
                {work.year}
              </span>
            )}
          </div>

          {/* Work Title (pre-line for KO + EN multi-lines) */}
          <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug whitespace-pre-line tracking-tight">
            {work.title}
          </h4>

          {/* Material & Size */}
          {(hasMaterial || hasSize) && (
            <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-xs text-white/60">
              {hasMaterial && (
                <p className="whitespace-pre-line leading-relaxed">
                  <span className="text-white/40 mr-1.5 font-bold">재료 / Material:</span>
                  {work.material}
                </p>
              )}
              {hasSize && (
                <p className="whitespace-pre-line leading-relaxed">
                  <span className="text-white/40 mr-1.5 font-bold">크기 / Size:</span>
                  {work.size}
                </p>
              )}
            </div>
          )}

          {/* Description (pre-line preserved) */}
          {hasDescription && (
            <div className="pt-3 text-xs sm:text-sm text-white/70 whitespace-pre-line leading-relaxed font-light border-t border-white/5 max-h-48 overflow-y-auto pr-1">
              {work.description}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
