'use client';

import React from 'react';
import { Artist } from '@/types/artist';
import { getArtistInitials } from '@/lib/artists';
import { Layers, ArrowUpRight } from 'lucide-react';

import {
  getLocalizedArtistName,
  getLocalizedVenueName,
  getLocalizedNationality,
} from '@/lib/artistLocalization';

export type CardTheme = 'lime' | 'cyan' | 'peach' | 'blackwhite';

interface ArtistCardProps {
  artist: Artist;
  onClick?: (artist: Artist) => void;
  className?: string;
  theme?: CardTheme;
  locale?: string;
}

export default function ArtistCard({
  artist,
  onClick,
  className = '',
  theme = 'lime',
  locale = 'ko',
}: ArtistCardProps) {
  const isKo = locale === 'ko';
  // Use artist profile image or fallback to their first artwork image
  const displayImage = artist.profile_image || artist.works?.[0]?.images?.[0] || null;
  const hasImage = Boolean(displayImage);
  const initials = getArtistInitials(artist);

  const { primary: displayName, secondary: subName } = getLocalizedArtistName(artist, locale);

  const localizedVenue = artist.venue_slug
    ? getLocalizedVenueName(artist.venue_slug, locale)
    : (isKo ? artist.venue_ko : (artist.venue_slug || artist.venue_ko));

  const localizedNationality = getLocalizedNationality(artist.nationality || '', locale);

  const worksCount = artist.works?.length || 0;
  const worksLabel = isKo
    ? `${worksCount}개 작품`
    : `${worksCount} ${worksCount === 1 ? 'Work' : 'Works'}`;

  // Theme-specific styling classes
  const themeStyles = {
    lime: {
      card: 'bg-[#0d121a]/80 hover:bg-[#121822] border-white/10 hover:border-lime-400/80 rounded-xl hover:shadow-lime-400/5',
      name: 'group-hover:text-lime-400',
      arrow: 'text-white/40 group-hover:text-lime-400',
      icon: 'text-lime-400',
      monogramBorder: 'group-hover:border-lime-400/60',
      monogramText: 'group-hover:text-lime-300',
      badge: 'bg-black/75 border-white/15 text-white/90',
    },
    cyan: {
      card: 'bg-[#04060A]/80 hover:bg-[#070B12] border-[#00E5FF]/20 hover:border-[#00E5FF] rounded-sm hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]',
      name: 'group-hover:text-[#00E5FF]',
      arrow: 'text-white/40 group-hover:text-[#00E5FF]',
      icon: 'text-[#00E5FF]',
      monogramBorder: 'group-hover:border-[#00E5FF]/60',
      monogramText: 'group-hover:text-[#00E5FF]',
      badge: 'bg-[#04060A]/90 border-[#00E5FF]/30 text-[#00E5FF]',
    },
    peach: {
      card: 'bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md border-white/15 hover:border-rose-400/60 rounded-2xl hover:shadow-[0_8px_30px_rgba(244,63,94,0.12)]',
      name: 'group-hover:text-rose-300',
      arrow: 'text-white/40 group-hover:text-rose-300',
      icon: 'text-rose-400',
      monogramBorder: 'group-hover:border-rose-400/60',
      monogramText: 'group-hover:text-rose-300',
      badge: 'bg-black/50 border-rose-400/30 text-rose-200',
    },
    blackwhite: {
      card: 'bg-[#141414] hover:bg-[#1C1C1C] border-white hover:border-white rounded-none',
      name: 'text-white group-hover:text-white',
      arrow: 'text-[#8C8C8C] group-hover:text-white',
      icon: 'text-[#002FA7]',
      monogramBorder: 'group-hover:border-white',
      monogramText: 'group-hover:text-white',
      badge: 'bg-[#002FA7] border-transparent text-white',
    },
  }[theme];

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
      className={`group relative flex flex-col border overflow-hidden cursor-pointer transition-all duration-300 shadow-md ${themeStyles.card} ${className}`}
    >
      {/* Visual / Image area */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center border-b border-white/10">
        {hasImage ? (
          <img
            src={displayImage!}
            alt={displayName}
            loading="lazy"
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-white/[0.04] to-transparent">
            <div
              className={`w-16 h-16 rounded-full border border-white/20 ${themeStyles.monogramBorder} flex items-center justify-center font-mono font-black text-xl text-white/70 ${themeStyles.monogramText} transition-colors bg-black/40 shadow-inner`}
            >
              {initials}
            </div>
            <span className="font-mono text-[10px] tracking-widest text-white/30 group-hover:text-white/50 uppercase mt-3">
              APAP8 ARTIST
            </span>
          </div>
        )}

        {/* Venue Badge */}
        {localizedVenue && (
          <span
            className={`absolute top-3 left-3 font-mono text-[9px] font-bold border px-2.5 py-1 uppercase tracking-wider ${
              theme === 'blackwhite' ? 'rounded-sm' : 'rounded-full'
            } ${themeStyles.badge}`}
          >
            {localizedVenue}
          </span>
        )}

        {/* Works count badge */}
        {worksCount > 0 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 font-mono text-[10px] font-medium text-white/80 bg-black/70 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded">
            <Layers className={`w-3 h-3 ${themeStyles.icon}`} />
            <span>{worksLabel}</span>
          </span>
        )}
      </div>

      {/* Info Area */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`text-base sm:text-lg font-bold text-white transition-colors leading-snug ${themeStyles.name}`}>
              {displayName}
            </h3>
            <ArrowUpRight className={`w-4 h-4 transition-transform flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${themeStyles.arrow}`} />
          </div>

          {subName && (
            <p className="font-mono text-xs text-white/50 group-hover:text-white/70 transition-colors truncate">
              {subName}
            </p>
          )}
        </div>

        {/* Metadata bottom row */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
          <span className="truncate max-w-[70%]">
            {localizedNationality || (isKo ? '참여 작가' : 'Artist')}
          </span>
          {artist.birth_year && artist.birth_year.trim() && (
            <span>{isKo ? `${artist.birth_year}년생` : `b.${artist.birth_year}`}</span>
          )}
        </div>
      </div>
    </div>
  );
}
