'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Artist } from '@/types/artist';
import { getArtistInitials } from '@/lib/artists';
import WorkCard from './WorkCard';
import { X, User, MapPin, Calendar, Layers } from 'lucide-react';

import {
  getLocalizedArtistName,
  getLocalizedVenueName,
  getLocalizedNationality,
  getLocalizedBio,
  getLocalizedDescription,
} from '@/lib/artistLocalization';
import { CardTheme } from './ArtistCard';

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
  locale?: string;
  theme?: CardTheme;
}

export default function ArtistModal({
  artist,
  onClose,
  locale = 'ko',
  theme = 'lime',
}: ArtistModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (artist) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [artist, onClose]);

  if (!artist) return null;

  const isKo = locale === 'ko';
  const displayImage = artist.profile_image || artist.works?.[0]?.images?.[0] || null;
  const hasImage = Boolean(displayImage);
  const initials = getArtistInitials(artist);

  const { primary: displayName, secondary: subName } = getLocalizedArtistName(artist, locale);
  const localizedVenue = artist.venue_slug
    ? getLocalizedVenueName(artist.venue_slug, locale)
    : (isKo ? artist.venue_ko : (artist.venue_slug || artist.venue_ko));
  const localizedNationality = getLocalizedNationality(artist.nationality || '', locale);
  const localizedBio = getLocalizedBio(artist.bio || '', locale);

  const themeTagColor = {
    lime: 'text-lime-400',
    cyan: 'text-[#00E5FF]',
    peach: 'text-rose-400',
    blackwhite: 'text-white',
  }[theme];

  const themeBadgeStyle = {
    lime: 'bg-lime-400/10 text-lime-300 border-lime-400/20',
    cyan: 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20',
    peach: 'bg-rose-500/10 text-rose-300 border-rose-400/20',
    blackwhite: 'bg-[#002FA7] text-white border-transparent',
  }[theme];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c1017] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* ─── Modal Header ─── */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0c1017]/95 backdrop-blur-md border-b border-white/10">
            <div className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider ${themeTagColor}`}>
              <span>{isKo ? '참여 작가 프로필' : 'APAP8 ARTIST PROFILE'}</span>
              {localizedVenue && (
                <>
                  <span className="text-white/30">/</span>
                  <span className="text-white/70">{localizedVenue}</span>
                </>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ─── Modal Scrollable Body ─── */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-white/10">
            {/* Artist Overview Info */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              {/* Profile Photo / Monogram */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-md">
                {hasImage ? (
                  <img
                    src={displayImage!}
                    alt={displayName}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-mono font-black text-lg text-white/80">
                      {initials}
                    </div>
                    <span className="font-mono text-[9px] text-white/40 tracking-wider mt-2 uppercase">
                      NO IMAGE
                    </span>
                  </div>
                )}
              </div>

              {/* Names & Metadata */}
              <div className="space-y-3 flex-1">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {displayName}
                  </h2>
                  {subName && (
                    <p className="font-mono text-sm sm:text-base text-white/60 mt-0.5">
                      {subName}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-white/50">
                  {localizedNationality && (
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      <MapPin className={`w-3.5 h-3.5 ${themeTagColor}`} />
                      <span>{localizedNationality}</span>
                    </div>
                  )}

                  {artist.birth_year && artist.birth_year.trim() !== '' && (
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      <Calendar className={`w-3.5 h-3.5 ${themeTagColor}`} />
                      <span>{isKo ? `${artist.birth_year}년생` : `b. ${artist.birth_year}`}</span>
                    </div>
                  )}

                  {localizedVenue && (
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${themeBadgeStyle}`}>
                      <Layers className="w-3.5 h-3.5" />
                      <span>{localizedVenue}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Intro text (if present) */}
            {artist.intro && artist.intro.trim() !== '' && (
              <div className="pt-6 space-y-3">
                <h3 className={`font-mono text-xs font-bold tracking-wider uppercase ${themeTagColor}`}>
                  {isKo ? '소개' : 'INTRODUCTION'}
                </h3>
                <div className="text-sm sm:text-base text-white/80 leading-relaxed whitespace-pre-line font-light">
                  {getLocalizedDescription(artist.intro, locale)}
                </div>
              </div>
            )}

            {/* Bio text (localized solo + group exhibitions) */}
            {localizedBio && localizedBio.trim() !== '' && (
              <div className="pt-6 space-y-3">
                <h3 className={`font-mono text-xs font-bold tracking-wider uppercase ${themeTagColor}`}>
                  {isKo ? '주요 약력 및 전시' : 'SELECTED BIOGRAPHY'}
                </h3>
                <div className="text-xs sm:text-sm text-white/70 leading-relaxed whitespace-pre-line bg-white/[0.02] p-5 rounded-xl border border-white/5 font-mono">
                  {localizedBio}
                </div>
              </div>
            )}

            {/* Participating Works */}
            {artist.works && artist.works.length > 0 && (
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`font-mono text-xs font-bold tracking-wider uppercase ${themeTagColor}`}>
                    {isKo
                      ? `출품 작품 (${artist.works.length})`
                      : `PARTICIPATING WORKS (${artist.works.length})`}
                  </h3>
                </div>

                <div className="grid gap-6 sm:grid-cols-1">
                  {artist.works.map((work, idx) => (
                    <WorkCard
                      key={idx}
                      work={work}
                      artist={artist}
                      showArtistInfo={false}
                      locale={locale}
                      theme={theme}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
