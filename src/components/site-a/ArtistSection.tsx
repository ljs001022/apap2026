'use client';

import React, { useMemo } from 'react';
import BlurFade from './BlurFade';
import ArtistGrid from './ArtistGrid';
import { CardTheme } from './ArtistCard';
import { getVenues } from '@/lib/artists';

import { getLocalizedVenueName } from '@/lib/artistLocalization';

interface ArtistSectionProps {
  t?: (key: string) => string;
  locale?: string;
  className?: string;
  theme?: CardTheme;
}

export default function ArtistSection({
  t,
  locale = 'ko',
  className = '',
  theme = 'lime',
}: ArtistSectionProps) {
  const venues = useMemo(() => getVenues(), []);
  const isKo = locale === 'ko';

  // Map venues into generic CategoryGroup with localized labels
  const categories = useMemo(() => {
    return venues.map((v) => ({
      id: v.venue_slug,
      label: getLocalizedVenueName(v.venue_slug, locale),
      items: v.artists,
    }));
  }, [venues, locale]);

  const tagColor = {
    lime: 'text-lime-400',
    cyan: 'text-[#00E5FF]',
    peach: 'text-rose-400',
    blackwhite: 'text-white',
  }[theme];

  return (
    <section
      id="exhibition"
      className={`relative min-h-screen flex flex-col justify-center py-20 md:py-28 px-5 sm:px-6 bg-transparent border-t border-white/10 ${className}`}
    >
      <div className="container mx-auto max-w-6xl space-y-10 sm:space-y-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <BlurFade className="space-y-2">
            <span className={`text-[10px] md:text-xs font-mono tracking-widest uppercase block font-bold ${tagColor}`}>
              {isKo ? '[02] 전시 — 참여 작가' : '[02] EXHIBITION — PARTICIPATING ARTISTS'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              {isKo ? '참여 작가' : 'Participating Artists'}
            </h2>
          </BlurFade>

          <p className="font-mono text-xs text-white/50 max-w-sm sm:text-right">
            {isKo
              ? '제8회 안양공공예술프로젝트(APAP8) 공식 참여 작가 라인업'
              : 'Official Participating Artists Lineup for APAP8'}
          </p>
        </div>

        {/* Artist Grid with Venue Category Tabs & Modal */}
        <ArtistGrid
          categories={categories}
          allLabel={isKo ? '전체 부문 (ALL)' : 'ALL VENUES'}
          theme={theme}
          locale={locale}
        />
      </div>
    </section>
  );
}
