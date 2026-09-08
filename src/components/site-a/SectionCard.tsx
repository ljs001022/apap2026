'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import DustCanvas from './DustCanvas';

interface SectionCardProps {
  /** 섹션 번호: "01", "02", ... */
  index: string;
  labelKo: string;
  labelEn: string;
  /** GNB 서브 라벨 (영문) ex: "OVERVIEW / THEME" */
  subtitle: string;
  /** 요약 콘텐츠 — 각 섹션이 주입 */
  summary: React.ReactNode;
  /** "See more" 이동 경로 */
  href: string;
  isKo: boolean;
  /** 섹션 id (앵커/스냅 타깃) */
  id: string;
}

export default function SectionCard({
  index,
  labelKo,
  labelEn,
  subtitle,
  summary,
  href,
  isKo,
  id,
}: SectionCardProps) {
  const router = useRouter();
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [pullDist, setPullDist] = useState(0);

  // Touch gesture: Pull up at the bottom of section to navigate to subpage
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setPullDist(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const delta = touchStartY - currentY; // positive = dragging UP
    if (delta > 0) {
      setPullDist(Math.min(delta, 70));
    } else {
      setPullDist(0);
    }
  };

  const onTouchEnd = () => {
    if (pullDist >= 50) {
      router.push(href);
    }
    setPullDist(0);
    setTouchStartY(null);
  };

  return (
    <section
      id={id}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative h-screen h-[100dvh] flex flex-col border-b border-white snap-start overflow-hidden bg-[#0A0A0A]"
      style={{ height: '100vh', minHeight: '100dvh' }}
    >
      {/* Background DUST particle effect (lightweight, responsive) */}
      <DustCanvas opacity={0.25} />

      {/* Section Header Row - Compact padding for mobile */}
      <div className="relative z-10 flex justify-between items-center px-4 py-3.5 sm:px-10 sm:py-5 lg:px-16 border-b border-white flex-shrink-0 bg-[#0A0A0A]/70 backdrop-blur-sm">
        <h2 className="flex items-baseline gap-2 sm:gap-3">
          <span className="text-xl sm:text-3xl font-extrabold tracking-tight">
            {isKo ? labelKo : labelEn}
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] font-semibold text-[#6C6C6C] tracking-widest hidden xs:inline">
            {labelEn} — {subtitle}
          </span>
        </h2>

        {/* Section number with subtle CSS glitch effect */}
        <span
          className="font-mono font-black text-3xl sm:text-5xl text-transparent select-none animate-glitch"
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}
          aria-hidden
        >
          {index}
        </span>
      </div>

      {/* Summary Content + Inline See More Link (Natural flow, not pinned) */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-between px-4 py-4 sm:px-10 sm:py-8 lg:px-16 overflow-y-auto overflow-x-hidden hide-scrollbar"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* Main section body */}
        <div className="my-auto">
          {summary}

          {/* Minimal Inline See More Link (Minimum 44x44px touch area) */}
          <div className="pt-4 sm:pt-6">
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 -ml-2.5 p-2.5 text-xs font-mono font-bold tracking-widest text-white/80 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-all min-h-[44px] min-w-[44px]"
            >
              <span>{isKo ? '자세히 보기' : 'SEE MORE'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Subtle pull-up continuous scroll hint at the bottom */}
        <div className="pt-2 pb-1 flex items-center justify-between font-mono text-[10px] text-white/40 border-t border-white/10 flex-shrink-0">
          <span className="truncate">
            {pullDist > 30 ? (
              <span className="text-white font-bold animate-pulse">
                {isKo ? '놓으면 페이지 이동 →' : 'Release to open →'}
              </span>
            ) : (
              <span>{isKo ? '아래로 스크롤하여 상세 보기' : 'Scroll down for details'}</span>
            )}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${pullDist > 30 ? 'rotate-180 text-white' : 'animate-bounce'}`} />
        </div>
      </motion.div>
    </section>
  );
}