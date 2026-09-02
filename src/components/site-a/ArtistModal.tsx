'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Artist } from '@/types/artist';
import { getArtistInitials } from '@/lib/artists';
import WorkCard from './WorkCard';
import { X, User, MapPin, Calendar, Layers } from 'lucide-react';

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
}

export default function ArtistModal({ artist, onClose }: ArtistModalProps) {
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

  const hasImage = Boolean(artist.profile_image);
  const initials = getArtistInitials(artist);

  const cleanNameEn =
    artist.name_en && artist.name_en.trim() !== '' && artist.name_en !== '국영문'
      ? artist.name_en.trim()
      : null;

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
            <div className="flex items-center gap-2 font-mono text-xs text-lime-400 font-bold uppercase tracking-wider">
              <span>APAP8 ARTIST PROFILE</span>
              {artist.venue_ko && (
                <>
                  <span className="text-white/30">/</span>
                  <span className="text-white/70">{artist.venue_ko}</span>
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
                    src={artist.profile_image!}
                    alt={artist.name_ko}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-mono font-black text-lg text-lime-300">
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
                    {artist.name_ko}
                  </h2>
                  {cleanNameEn && (
                    <p className="font-mono text-sm sm:text-base text-white/60 mt-0.5">
                      {cleanNameEn}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-white/50">
                  {artist.nationality && (
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-lime-400" />
                      <span>{artist.nationality.split('\n')[0]}</span>
                    </div>
                  )}

                  {artist.birth_year && artist.birth_year.trim() !== '' && (
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      <Calendar className="w-3.5 h-3.5 text-lime-400" />
                      <span>b. {artist.birth_year}</span>
                    </div>
                  )}

                  {artist.venue_ko && (
                    <div className="flex items-center gap-1.5 bg-lime-400/10 text-lime-300 px-2.5 py-1 rounded border border-lime-400/20">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{artist.venue_ko}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Intro text (if present) */}
            {artist.intro && artist.intro.trim() !== '' && (
              <div className="pt-6 space-y-3">
                <h3 className="font-mono text-xs font-bold text-lime-400 tracking-wider uppercase">
                  INTRODUCTION
                </h3>
                <div className="text-sm sm:text-base text-white/80 leading-relaxed whitespace-pre-line font-light">
                  {artist.intro}
                </div>
              </div>
            )}

            {/* Bio text (white-space: pre-line preserved) */}
            {artist.bio && artist.bio.trim() !== '' && (
              <div className="pt-6 space-y-3">
                <h3 className="font-mono text-xs font-bold text-lime-400 tracking-wider uppercase">
                  BIOGRAPHY / 약력
                </h3>
                <div className="text-xs sm:text-sm text-white/70 leading-relaxed whitespace-pre-line bg-white/[0.02] p-5 rounded-xl border border-white/5 font-mono">
                  {artist.bio}
                </div>
              </div>
            )}

            {/* Participating Works */}
            {artist.works && artist.works.length > 0 && (
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-bold text-lime-400 tracking-wider uppercase">
                    PARTICIPATING WORKS ({artist.works.length})
                  </h3>
                </div>

                <div className="grid gap-6 sm:grid-cols-1">
                  {artist.works.map((work, idx) => (
                    <WorkCard
                      key={idx}
                      work={work}
                      artist={artist}
                      showArtistInfo={false}
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
