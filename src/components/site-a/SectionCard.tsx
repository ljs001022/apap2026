'use client';

import React, { useRef, useState, useEffect } from 'react';

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
  /** 콘텐츠 수직 정렬 ('center' 기본, 'start' 상단 고정) */
  contentAlign?: 'center' | 'start';
}

export default function SectionCard({
  index,
  labelKo,
  labelEn,
  subtitle,
  summary,
  isKo,
  id,
  contentAlign = 'start',
}: SectionCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let timer: NodeJS.Timeout;
    const scrollContainer = document.querySelector('main');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Settle delay so physical scroll snap completes before child elements animate in
            clearTimeout(timer);
            timer = setTimeout(() => {
              setIsActive(true);
            }, 100);
          } else {
            clearTimeout(timer);
            setIsActive(false);
          }
        });
      },
      {
        root: scrollContainer,
        threshold: 0.35,
      }
    );

    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative h-[100dvh] flex flex-col pt-16 border-b border-white snap-start overflow-hidden bg-[#0A0A0A] ${
        isActive ? 'section-active' : ''
      }`}
    >
      {/* Section Header Row - Animated Title & Pop Number */}
      <div className="relative z-10 flex justify-between items-center px-4 py-2 sm:px-10 sm:py-3 lg:px-16 border-b border-white flex-shrink-0 bg-[#0A0A0A]/70 backdrop-blur-sm">
        <div
          className={`flex items-baseline gap-2 sm:gap-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
          }`}
        >
          <span className="text-title font-extrabold tracking-tight">
            {isKo ? labelKo : labelEn}
          </span>
          <span className="font-mono text-caption font-semibold text-[#6C6C6C] tracking-widest hidden xs:inline">
            {labelEn} — {subtitle}
          </span>
        </div>

        {/* Section number with pop bounce effect */}
        <span
          className={`font-mono font-black text-title sm:text-5xl select-none animate-glitch transition-all duration-700 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}
          aria-hidden
        >
          {index}
        </span>
      </div>

      {/* Summary Content with Staggered Container */}
      <div
        className="relative z-10 flex-1 flex flex-col px-4 sm:px-10 lg:px-16 pt-2.5 pb-6 sm:pt-4 sm:pb-8 overflow-y-auto overflow-x-hidden hide-scrollbar section-stagger-container"
      >
        <div
          className={`w-full flex flex-col ${
            contentAlign === 'center'
              ? 'justify-center my-auto'
              : 'justify-start mt-0 mb-auto'
          }`}
        >
          {summary}
        </div>
      </div>
    </section>
  );
}