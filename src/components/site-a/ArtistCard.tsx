'use client';

import React from 'react';
import { Artist } from '@/types/artist';
import { getArtistInitials } from '@/lib/artists';
import { Layers, ArrowUpRight } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onClick?: (artist: Artist) => void;
  className?: string;
}

export default function ArtistCard({ artist, onClick, className = '' }: ArtistCardProps) {
  const hasImage = Boolean(artist.profile_image);
  const initials = getArtistInitials(artist);

  // Clean English name (ignore placeholder values like '국영문')
  const cleanNameEn =
    artist.name_en && artist.name_en.trim() !== '' && artist.name_en !== '국영문'
      ? artist.name_en.trim()
      : null;

  // Clean nationality text (take first line if multi-line)
  const cleanNationality = artist.nationality
    ? artist.nationality.split('\n')[0].trim()
    : '';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(artist)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(artist);
        }
      }}
      className={`group relative flex flex-col bg-[#0d121a]/80 hover:bg-[#121822] border border-white/10 hover:border-lime-400/80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-lime-400/5 ${className}`}
    >
      {/* Visual / Image area */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center border-b border-white/10">
        {hasImage ? (
          <img
            src={artist.profile_image!}
            alt={artist.name_ko}
            loading="lazy"
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-white/[0.04] to-transparent">
            <div className="w-16 h-16 rounded-full border border-white/20 group-hover:border-lime-400/60 flex items-center justify-center font-mono font-black text-xl text-white/70 group-hover:text-lime-300 transition-colors bg-black/40 shadow-inner">
              {initials}
            </div>
            <span className="font-mono text-[10px] tracking-widest text-white/30 group-hover:text-white/50 uppercase mt-3">
              APAP8 ARTIST
            </span>
          </div>
        )}

        {/* Venue Badge */}
        {artist.venue_ko && (
          <span className="absolute top-3 left-3 font-mono text-[9px] font-bold text-white/90 bg-black/75 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {artist.venue_ko}
          </span>
        )}

        {/* Works count badge */}
        {artist.works && artist.works.length > 0 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 font-mono text-[10px] font-medium text-white/80 bg-black/70 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded">
            <Layers className="w-3 h-3 text-lime-400" />
            <span>{artist.works.length} {artist.works.length === 1 ? 'Work' : 'Works'}</span>
          </span>
        )}
      </div>

      {/* Info Area */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-lime-400 transition-colors leading-snug">
              {artist.name_ko}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 mt-0.5" />
          </div>

          {cleanNameEn && (
            <p className="font-mono text-xs text-white/50 group-hover:text-white/70 transition-colors truncate">
              {cleanNameEn}
            </p>
          )}
        </div>

        {/* Metadata bottom row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
          <span className="truncate max-w-[70%]">
            {cleanNationality || 'Artist'}
          </span>
          {artist.birth_year && artist.birth_year.trim() && (
            <span>b.{artist.birth_year}</span>
          )}
        </div>
      </div>
    </div>
  );
}
