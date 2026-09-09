'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Artist, Work } from '@/types/artist';
import { getArtistInitials } from '@/lib/artists';
import { X, MapPin, Calendar, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getLocalizedArtistName,
  getLocalizedVenueName,
  getLocalizedNationality,
  getLocalizedBio,
  getLocalizedDescription,
  getLocalizedTitle,
  getLocalizedMaterial,
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
  theme = 'blackwhite',
}: ArtistModalProps) {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Close on ESC key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomedImage) setZoomedImage(null);
        else onClose();
      }
    };
    if (artist || zoomedImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [artist, zoomedImage, onClose]);

  // Reset indices when artist changes
  useEffect(() => {
    setCurrentWorkIndex(0);
    setCurrentImageIndex(0);
    setZoomedImage(null);
  }, [artist]);

  if (!artist) return null;

  const isKo = locale === 'ko';
  const displayImage = artist.profile_image || artist.works?.[0]?.images?.[0] || null;
  const hasProfileImage = Boolean(displayImage);
  const initials = getArtistInitials(artist);

  const { primary: displayName, secondary: subName } = getLocalizedArtistName(artist, locale);
  const localizedVenue = artist.venue_slug
    ? getLocalizedVenueName(artist.venue_slug, locale)
    : (isKo ? artist.venue_ko : (artist.venue_slug || artist.venue_ko));
  const localizedNationality = getLocalizedNationality(artist.nationality || '', locale);
  const localizedBio = getLocalizedBio(artist.bio || '', locale);

  const works = artist.works || [];
  const hasWorks = works.length > 0;
  const currentWork: Work | undefined = works[currentWorkIndex];
  const workImages = currentWork?.images || [];
  const currentWorkImage = workImages[currentImageIndex] || workImages[0] || null;

  const handlePrevWork = () => {
    setCurrentWorkIndex((prev) => (prev === 0 ? works.length - 1 : prev - 1));
    setCurrentImageIndex(0);
  };

  const handleNextWork = () => {
    setCurrentWorkIndex((prev) => (prev === works.length - 1 ? 0 : prev + 1));
    setCurrentImageIndex(0);
  };

  return (
    <>
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[70] flex justify-center p-4 pt-24 sm:p-8 sm:pt-28 md:p-12 md:pt-32 pb-8 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-5xl max-h-full bg-[#0A0A0A] border border-white/20 shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/15">
            <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white">
              <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black">
                {isKo ? '참여 작가' : 'ARTIST'}
              </span>
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
              aria-label={isKo ? '닫기' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-white/15">
            {/* 1. Artist Profile Block */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 border border-white/20 bg-zinc-900 overflow-hidden">
                {hasProfileImage ? (
                  <img
                    src={displayImage!}
                    alt={displayName}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-2">
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center font-mono font-black text-sm text-white/80">
                      {initials}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 flex-1">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {displayName}
                  </h2>
                  {subName && (
                    <p className="font-mono text-sm sm:text-base text-white/50 mt-0.5">
                      {subName}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-mono text-white/60">
                  {localizedNationality && (
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 border border-white/10">
                      <MapPin className="w-3 h-3 text-white/70" />
                      <span>{localizedNationality}</span>
                    </div>
                  )}

                  {artist.birth_year && artist.birth_year.trim() !== '' && (
                    <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 border border-white/10">
                      <Calendar className="w-3 h-3 text-white/70" />
                      <span>{isKo ? `${artist.birth_year}년생` : `b. ${artist.birth_year}`}</span>
                    </div>
                  )}

                  {localizedVenue && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 border border-white/20 bg-white/10 text-white font-bold">
                      <Layers className="w-3 h-3" />
                      <span>{localizedVenue}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Intro / Bio */}
            {(artist.intro || localizedBio) && (
              <div className="pt-6 space-y-4">
                {artist.intro && (
                  <div className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                    {getLocalizedDescription(artist.intro, locale)}
                  </div>
                )}
                {localizedBio && (
                  <div className="space-y-2">
                    <h3 className="font-mono text-xs font-bold tracking-wider uppercase text-white/60">
                      {isKo ? '주요 약력 및 전시' : 'BIOGRAPHY'}
                    </h3>
                    <div className="text-xs text-white/70 leading-relaxed whitespace-pre-line bg-white/[0.03] p-4 border border-white/10 font-mono">
                      {localizedBio}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Integrated Works Section with Carousel */}
            {hasWorks && currentWork && (
              <div className="pt-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-mono text-xs font-bold tracking-wider uppercase text-white">
                      {isKo ? '출품 작품' : 'PARTICIPATING WORKS'}
                    </h3>
                    <span className="font-mono text-xs text-white/50">
                      {currentWorkIndex + 1} / {works.length}
                    </span>
                  </div>

                  {works.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevWork}
                        className="w-8 h-8 border border-white/30 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-colors cursor-pointer text-white"
                        aria-label={isKo ? '이전 작품' : 'Previous work'}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextWork}
                        className="w-8 h-8 border border-white/30 hover:border-white hover:bg-white hover:text-black flex items-center justify-center transition-colors cursor-pointer text-white"
                        aria-label={isKo ? '다음 작품' : 'Next work'}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid lg:grid-cols-12 gap-6 bg-white/[0.02] border border-white/15 p-5 sm:p-6">
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    {currentWorkImage ? (
                      <div 
                        className="relative aspect-[4/3] w-full overflow-hidden bg-black border border-white/10 flex items-center justify-center cursor-zoom-in group"
                        onClick={() => setZoomedImage(currentWorkImage)}
                      >
                        <img
                          src={currentWorkImage}
                          alt={getLocalizedTitle(currentWork.title, locale)}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] w-full bg-zinc-950 border border-white/10 flex items-center justify-center text-xs font-mono text-white/40">
                        NO WORK IMAGE
                      </div>
                    )}

                    {workImages.length > 1 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                        {workImages.map((img, imgIdx) => (
                          <button
                            key={imgIdx}
                            onClick={() => setCurrentImageIndex(imgIdx)}
                            className={`relative w-14 h-14 flex-shrink-0 border transition-all cursor-pointer ${
                              imgIdx === currentImageIndex ? 'border-white' : 'border-white/20 opacity-50 hover:opacity-80'
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                        {getLocalizedTitle(currentWork.title, locale)}
                      </h4>

                      <div className="space-y-1.5 text-xs font-mono text-white/60 border-l-2 border-white/30 pl-3">
                        {currentWork.year && <div>{isKo ? `제작년도: ${currentWork.year}` : `Year: ${currentWork.year}`}</div>}
                        {currentWork.material && <div>{isKo ? `재료: ${getLocalizedMaterial(currentWork.material, locale)}` : `Medium: ${getLocalizedMaterial(currentWork.material, locale)}`}</div>}
                        {currentWork.size && <div>{isKo ? `크기: ${currentWork.size}` : `Dimensions: ${currentWork.size}`}</div>}
                      </div>

                      {currentWork.description && (
                        <div className="text-xs sm:text-sm text-white/80 leading-relaxed whitespace-pre-line pt-2">
                          {getLocalizedDescription(currentWork.description, locale)}
                        </div>
                      )}
                    </div>

                    {works.length > 1 && (
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/50">
                        <span>
                          {isKo ? `총 ${works.length}개 출품작 중 ${currentWorkIndex + 1}번째` : `Work ${currentWorkIndex + 1} of ${works.length}`}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={handlePrevWork}
                            className="hover:text-white underline cursor-pointer"
                          >
                            {isKo ? '← 이전' : '← Prev'}
                          </button>
                          <span>·</span>
                          <button
                            onClick={handleNextWork}
                            className="hover:text-white underline cursor-pointer"
                          >
                            {isKo ? '다음 →' : 'Next →'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>

    {/* Fullscreen Zoom Overlay */}
    <AnimatePresence>
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
          >
            <img
              src={zoomedImage}
              alt="Zoomed artwork"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
              className="absolute -top-4 -right-4 sm:top-0 sm:-right-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
              aria-label="Close zoom"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}