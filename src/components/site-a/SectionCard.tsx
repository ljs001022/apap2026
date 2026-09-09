'use client';

import React from 'react';
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
  isKo,
  id,
}: SectionCardProps) {
  return (
    <section
      id={id}
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

      {/* Summary Content */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col px-4 py-6 sm:px-10 sm:py-10 lg:px-16 overflow-y-auto overflow-x-hidden hide-scrollbar"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="m-auto w-full pb-16 sm:pb-24 flex flex-col justify-center min-h-full">
          {summary}
        </div>
      </motion.div>
    </section>
  );
}