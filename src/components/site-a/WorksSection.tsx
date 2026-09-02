'use client';

import React, { useMemo } from 'react';
import BlurFade from './BlurFade';
import WorkGallery from './WorkGallery';
import { getVenues } from '@/lib/artists';
import { WorkWithArtist } from '@/types/artist';

interface WorksSectionProps {
  t?: (key: string) => string;
  locale?: string;
  className?: string;
}

export default function WorksSection({ t, locale = 'ko', className = '' }: WorksSectionProps) {
  const venues = useMemo(() => getVenues(), []);

  // Group works by venue
  const categories = useMemo(() => {
    return venues.map((v) => {
      const worksInVenue: WorkWithArtist[] = [];
      v.artists.forEach((artist) => {
        artist.works.forEach((work) => {
          worksInVenue.push({
            work,
            artist,
            venue_ko: v.venue_ko,
            venue_slug: v.venue_slug,
          });
        });
      });

      return {
        id: v.venue_slug,
        label: v.venue_ko,
        items: worksInVenue,
      };
    });
  }, [venues]);

  const isKo = locale === 'ko';

  return (
    <section
      id="works"
      className={`relative min-h-screen flex flex-col justify-center py-20 md:py-28 px-5 sm:px-6 bg-transparent border-t border-white/10 ${className}`}
    >
      <div className="container mx-auto max-w-6xl space-y-10 sm:space-y-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <BlurFade className="space-y-2">
            <span className="text-[10px] md:text-xs font-mono text-lime-400 tracking-widest uppercase block font-bold">
              [03] EXHIBITION GALLERY — WORKS &amp; PROJECTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
              {isKo ? '출품작' : 'Works on View'}
            </h2>
          </BlurFade>

          <p className="font-mono text-xs text-white/50 max-w-sm sm:text-right">
            안양 도심 및 예술공원에 설치·상영되는 주요 작품 갤러리
          </p>
        </div>

        {/* Work Gallery with Carousel & Categories */}
        <WorkGallery
          categories={categories}
          allLabel={isKo ? '전체 출품작 (ALL)' : 'ALL WORKS'}
        />
      </div>
    </section>
  );
}
