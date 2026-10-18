'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

// 안양파빌리온 메인 작가 4명 (다이고 우시, 박재훈, 스튜디오 올레오밍구스, 처 지엔취안)
const PAVILION_WORKS: PavilionWork[] = [
  {
    id: 'daigo-ushi',
    titleKo: '〈D#31 AI 새장: 안양의 메아리〉',
    titleEn: '〈D#31 AI Birdcage : Echoes of Anyang〉',
    artistKo: '다이고 우시',
    artistEn: 'Daigo Ushi',
    genreKo: '단채널 비디오(4K)',
    genreEn: 'Single-channel video (4K)',
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

const MAIN_VIDEO_SRC = '/videos/308.mp4';

// 총 6개 슬라이드: 0 = 308 영상, 1 = 메인 포스터, 2 = 다이고 우시, 3 = 박재훈, 4 = 스튜디오 올레오밍구스, 5 = 처 지엔취안
const VIDEO_SLIDE = 0;
const POSTER_SLIDE = 1;
const WORK_SLIDE_OFFSET = 2;
const TOTAL_SLIDES = WORK_SLIDE_OFFSET + PAVILION_WORKS.length; // 6

export default function HeroSlider({ locale }: HeroSliderProps) {
  const isKo = locale === 'ko';
  const [currentSlide, setCurrentSlide] = useState<number>(VIDEO_SLIDE);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  // 모바일: 308 영상 재생 후 메인 포스터로 전환
  const [mobileVideoDone, setMobileVideoDone] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 화면 크기 체크 (모바일 환경에서는 슬라이더 타이머 비활성화)
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Autoplay (이미지 슬라이드 6초, 데스크톱 전용) 및 마우스 hover 시 일시 정지 처리
  // 영상 슬라이드는 타이머 대신 영상 재생 종료(onEnded) 시 다음 슬라이드로 전환
  useEffect(() => {
    if (!isDesktop || isPaused || currentSlide === VIDEO_SLIDE) return;

    timerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 6000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isDesktop, isPaused, currentSlide]);

  // 헤더 로고 클릭 시 첫 슬라이드(308 영상)로 복귀
  useEffect(() => {
    const handleReset = () => {
      setCurrentSlide(VIDEO_SLIDE);
      setMobileVideoDone(false);
    };

    window.addEventListener('reset-hero-slider', handleReset);
    return () => window.removeEventListener('reset-hero-slider', handleReset);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Keyboard navigation (데스크톱)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  const scrollToExhibition = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('exhibition');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 현재 슬라이드가 작품 슬라이드인 경우(2, 3, 4, 5) 해당 작품 데이터
  const activeWork = currentSlide >= WORK_SLIDE_OFFSET ? PAVILION_WORKS[currentSlide - WORK_SLIDE_OFFSET] : null;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black select-none">
      {/* ── MOBILE VIEW (< md): 308 영상 → Poster (No artwork slides, no arrows, no pagination) ── */}
      <div
        className="block md:hidden w-full h-full overflow-hidden flex items-center justify-center cursor-default"
        aria-label={isKo ? '제8회 안양공공예술프로젝트(APAP8) 공식 포스터' : 'The 8th Anyang Public Art Project (APAP8) Official Poster'}
      >
        {!isDesktop && !mobileVideoDone ? (
          <video
            src={MAIN_VIDEO_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setMobileVideoDone(true)}
            onError={() => setMobileVideoDone(true)}
            className="w-full h-full object-contain pointer-events-none"
          />
        ) : (
        <picture className="w-full h-full flex items-center justify-center">
          <source
            type="image/webp"
            media="(max-width: 767px)"
            srcSet="/images/main-768x768.webp"
          />
          <img
            src="/images/main-768x768.jpg"
            alt={isKo ? '제8회 안양공공예술프로젝트(APAP8) 공식 포스터' : 'The 8th Anyang Public Art Project (APAP8) Official Poster'}
            className="w-full h-full object-contain pointer-events-none"
            loading="eager"
          />
        </picture>
        )}
      </div>

      {/* ── DESKTOP VIEW (>= md): Full Slider with 308 Video + Poster + 4 Artwork Stills, Arrows & Pagination ── */}
      <div
        className="hidden md:flex relative w-full h-full overflow-hidden items-center justify-center group focus:outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label={isKo ? '메인 포스터 및 대표 출품작 슬라이더' : 'Main Poster & Featured Artworks Slider'}
      >
        {/* Slide Layer */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {currentSlide === VIDEO_SLIDE ? (
              /* ── Slide 1: 308 Video (재생 종료 시 다음 슬라이드로 전환) ── */
              <motion.div
                key="slide-video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center bg-black cursor-default"
              >
                {isDesktop && (
                  <video
                    src={MAIN_VIDEO_SRC}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onEnded={nextSlide}
                    onError={nextSlide}
                    className="w-full h-full object-contain pointer-events-none"
                  />
                )}
              </motion.div>
            ) : currentSlide === POSTER_SLIDE ? (
              /* ── Slide 2: Main Poster ── */
              <motion.div
                key="slide-poster"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full h-full flex items-center justify-center cursor-default"
              >
                <picture className="w-full h-full block">
                  <source
                    type="image/webp"
                    srcSet="/images/main-1920x800.webp"
                  />
                  <img
                    src="/images/main-1920x800.jpg"
                    alt={isKo ? '제8회 안양공공예술프로젝트(APAP8) 공식 포스터' : 'The 8th Anyang Public Art Project (APAP8) Official Poster'}
                    className="w-full h-full object-fill pointer-events-none"
                    loading="eager"
                  />
                </picture>
              </motion.div>
            ) : activeWork ? (
              /* ── Slides 3, 4, 5, 6: Individual Artwork Still Frame Slides ── */
              <motion.div
                key={`slide-work-${activeWork.id}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-full h-full flex items-center justify-center bg-[#070707] cursor-pointer group/slide"
                onClick={scrollToExhibition}
              >
                {/* Subtle ambient blur background */}
                <img
                  src={activeWork.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
                />

                {/* Main Still Image */}
                <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 pb-14 sm:pb-16">
                  <img
                    src={activeWork.image}
                    alt={isKo ? `${activeWork.artistKo} - ${activeWork.titleKo}` : `${activeWork.artistEn} - ${activeWork.titleEn}`}
                    className="max-w-full max-h-full object-contain border border-white/10 shadow-2xl transition-transform duration-700 ease-out group-hover/slide:scale-[1.01]"
                    loading="eager"
                  />
                </div>

                {/* Gradient Scrims for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                {/* Top-Left: Artist Name & Artwork Title Only */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-6 flex flex-col gap-1 sm:gap-1.5 pointer-events-none max-w-[85%] sm:max-w-2xl z-10">
                  <span className="font-mono text-xs sm:text-sm font-bold text-white/90 tracking-wider uppercase bg-black/75 border border-white/20 px-2 sm:px-2.5 py-0.5 sm:py-1 backdrop-blur-sm inline-block w-fit">
                    {isKo ? activeWork.artistKo : activeWork.artistEn}
                  </span>
                  <h3 className="text-sm sm:text-lg md:text-xl font-black text-white tracking-tight drop-shadow-lg line-clamp-1 bg-black/75 px-2 sm:px-2.5 py-1 backdrop-blur-sm inline-block max-w-full">
                    {isKo ? activeWork.titleKo : activeWork.titleEn}
                  </h3>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows (Left / Right) */}
        <button
          onClick={prevSlide}
          aria-label={isKo ? '이전 슬라이드' : 'Previous slide'}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/40 bg-black/60 text-white/80 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 transition-all backdrop-blur-sm cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label={isKo ? '다음 슬라이드' : 'Next slide'}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/40 bg-black/60 text-white/80 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 transition-all backdrop-blur-sm cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Pagination & Counter (Bottom-Right, 6 slides) */}
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-6 z-20 flex items-center gap-2 bg-black/85 backdrop-blur-md border border-white/25 px-2.5 py-1.5 shadow-xl">
          {/* Slide Counter: 01 / 06 ~ 06 / 06 */}
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-white tracking-widest">
            {String(currentSlide + 1).padStart(2, '0')}&nbsp;/&nbsp;0{TOTAL_SLIDES}
          </span>

          <span className="w-[1px] h-3 bg-white/20 mx-0.5" />

          {/* 6 Indicator Bars */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={
                  isKo
                    ? `${idx + 1}번 슬라이드로 이동`
                    : `Go to slide ${idx + 1}`
                }
                className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                  currentSlide === idx
                    ? 'w-5 sm:w-6 bg-white'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
