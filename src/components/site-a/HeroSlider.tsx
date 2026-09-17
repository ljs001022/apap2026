'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface HeroSliderProps {
  locale: 'ko' | 'en';
}

interface PavilionWork {
  id: string;
  titleKo: string;
  titleEn: string;
  artistKo: string;
  artistEn: string;
  genreKo: string;
  genreEn: string;
  image: string;
  slug: string;
}

const PAVILION_WORKS: PavilionWork[] = [
  {
    id: 'daigo-ushi',
    titleKo: '〈D#31 AI 새장: 안양의 메아리〉',
    titleEn: '〈D#31 AI Birdcage : Echoes of Anyang〉',
    artistKo: '다이고 우시',
    artistEn: 'Daigo Ushi',
    genreKo: '단채널 비디오(4K) · 8분',
    genreEn: 'Single-channel video (4K) · 8 min.',
    image: '/assets/artists/e-pavilion-media/daigo-ushi/work-1-1.webp',
    slug: 'daigo-ushi',
  },
  {
    id: 'jaehun-park',
    titleKo: '〈낙원의 위상학〉',
    titleEn: '〈Topology of Paradise〉',
    artistKo: '박재훈',
    artistEn: 'Jaehun Park',
    genreKo: '3D 시뮬레이션 비디오(4K)',
    genreEn: '3D simulation video (4K)',
    image: '/assets/artists/e-pavilion-media/jaehun-park/work-1-1.webp',
    slug: 'jaehun-park',
  },
  {
    id: 'studio-oleomingus',
    titleKo: '〈낙원의 문 앞에서조차 내가 망설이는 것이 과연 이상한 일일까〉',
    titleEn: '〈Is it any wonder that I hesitate even at the gates of paradise?〉',
    artistKo: '스튜디오 올레오밍구스',
    artistEn: 'Studio Oleomingus',
    genreKo: '단채널 비디오(4K)',
    genreEn: 'Single-channel video (4K)',
    image: '/assets/artists/e-pavilion-media/studio-oleomingus/work-1-1.webp',
    slug: 'studio-oleomingus',
  },
  {
    id: 'che-jianquan',
    titleKo: '〈소요유〉',
    titleEn: '〈The carefree wandering〉',
    artistKo: '처 지엔취안',
    artistEn: 'Che Jianquan',
    genreKo: '스틸 프레임 AI 생성형 비디오(4K)',
    genreEn: 'Still Frame AI-generated video (4K)',
    image: '/assets/artists/e-pavilion-media/che-jianquan/work-1-1.webp',
    slug: 'che-jianquan',
  },
];

export default function HeroSlider({ locale }: HeroSliderProps) {
  const isKo = locale === 'ko';
  // Total 2 slides: 0 = Main Poster, 1 = Anyang Pavilion 2x2 Grid
  const [currentSlide, setCurrentSlide] = useState<0 | 1>(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  }, []);

  // Autoplay (6 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  const scrollToExhibition = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('exhibition');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-full h-full max-sm:aspect-square max-sm:max-h-[768px] overflow-hidden flex items-center justify-center bg-black select-none group focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={isKo ? '메인 포스터 및 아이파빌리온 대표작 슬라이더' : 'Main Poster & i Pavilion Slider'}
    >
      {/* Slide Layer */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {currentSlide === 0 ? (
            /* ── Slide 1: Main Poster (Clean, No Zoom) ── */
            <motion.div
              key="slide-poster"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <picture className="w-full h-full flex items-center justify-center">
                <source
                  media="(max-width: 640px)"
                  type="image/webp"
                  srcSet="/images/main-768x768.webp"
                />
                <source
                  media="(max-width: 640px)"
                  srcSet="/images/main-768x768.jpg"
                />
                <source
                  type="image/webp"
                  srcSet="/images/main-1920x800.webp"
                />
                <img
                  src="/images/main-1920x800.jpg"
                  alt={isKo ? '제8회 안양공공예술프로젝트(APAP8) 공식 포스터' : 'The 8th Anyang Public Art Project (APAP8) Official Poster'}
                  className="w-full h-full object-contain pointer-events-none"
                  loading="eager"
                />
              </picture>
            </motion.div>
          ) : (
            /* ── Slide 2: Anyang Pavilion (2x2 Grid, Grayscale -> Color on Hover) ── */
            <motion.div
              key="slide-pavilion-2x2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full h-full p-2 pb-13 sm:p-3.5 sm:pb-16 flex flex-col justify-center items-center bg-black"
            >
              <div className="w-full h-full max-w-[1400px] grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3">
                {PAVILION_WORKS.map((work, idx) => (
                  <div
                    key={work.id}
                    role="button"
                    tabIndex={0}
                    onClick={scrollToExhibition}
                    className="relative group/quadrant overflow-hidden bg-[#0C0C0C] border border-white/20 hover:border-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    {/* Background Still Image: Grayscale by default, Full Color on cursor hover */}
                    <img
                      src={work.image}
                      alt={isKo ? `${work.artistKo} - ${work.titleKo}` : `${work.artistEn} - ${work.titleEn}`}
                      className="w-full h-full object-cover grayscale contrast-105 group-hover/quadrant:grayscale-0 group-hover/quadrant:scale-105 transition-all duration-500 ease-out"
                      loading="eager"
                    />

                    {/* Dark gradient for crisp text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 group-hover/quadrant:from-black/70" />

                    {/* Top-left number badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 pointer-events-none">
                      <span className="font-mono text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 bg-black/80 border border-white/30 text-white group-hover/quadrant:bg-white group-hover/quadrant:text-black group-hover/quadrant:border-white transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Top-right subtle hint on hover */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover/quadrant:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:flex items-center gap-1 bg-black/80 border border-white/40 px-2 py-0.5">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span className="font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                        COLOR ON
                      </span>
                    </div>

                    {/* Bottom Work Information */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 pointer-events-none transition-transform duration-300 space-y-0.5">
                      <div className="font-mono text-[9px] sm:text-[11px] text-[#A3A3A3] group-hover/quadrant:text-white/90 transition-colors uppercase tracking-wider truncate">
                        {isKo ? work.artistKo : work.artistEn}
                      </div>
                      <h4 className="text-[11px] sm:text-xs md:text-sm font-bold text-white truncate drop-shadow-md">
                        {isKo ? work.titleKo : work.titleEn}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows (Left / Right) */}
      <button
        onClick={prevSlide}
        aria-label={isKo ? '이전 슬라이드' : 'Previous slide'}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/40 bg-black/60 text-white/80 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label={isKo ? '다음 슬라이드' : 'Next slide'}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/40 bg-black/60 text-white/80 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 transition-all backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination & Counter (Bottom-Right, 2 slides) */}
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-6 z-20 flex items-center gap-2 bg-black/85 backdrop-blur-md border border-white/25 px-2.5 py-1.5 shadow-xl">
        {/* Slide Counter: 01 / 02 or 02 / 02 */}
        <span className="font-mono text-[10px] sm:text-[11px] font-bold text-white tracking-widest">
          {String(currentSlide + 1).padStart(2, '0')}&nbsp;/&nbsp;02
        </span>

        <span className="w-[1px] h-3 bg-white/20 mx-0.5" />

        {/* 2 Indicator Bars */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentSlide(0)}
            aria-label={isKo ? '1번 포스터 슬라이드로 이동' : 'Go to poster slide'}
            className={`h-1.5 transition-all duration-200 rounded-none ${
              currentSlide === 0
                ? 'w-5 sm:w-6 bg-white'
                : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
          <button
            onClick={() => setCurrentSlide(1)}
            aria-label={isKo ? '2번 파빌리온 슬라이드로 이동' : 'Go to pavilion slide'}
            className={`h-1.5 transition-all duration-200 rounded-none ${
              currentSlide === 1
                ? 'w-5 sm:w-6 bg-white'
                : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
