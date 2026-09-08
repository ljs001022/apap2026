'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import GnbHeader from '@/components/site-a/GnbHeader';
import Footer from '@/components/site-a/Footer';
import ArtistGrid from '@/components/site-a/ArtistGrid';
import ArtistModal from '@/components/site-a/ArtistModal';
import { getVenues } from '@/lib/artists';
import { getLocalizedVenueName } from '@/lib/artistLocalization';
import { Artist } from '@/types/artist';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function ExhibitionPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'ko';
  const validLocale = ['ko', 'en'].includes(locale) ? locale : 'ko';
  const isKo = validLocale === 'ko';

  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const venues = useMemo(() => getVenues(), []);

  const categories = useMemo(() => {
    return venues.map((v) => ({
      id: v.venue_slug,
      label: getLocalizedVenueName(v.venue_slug, validLocale),
      items: v.artists,
    }));
  }, [venues, validLocale]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased flex flex-col justify-between">
      <GnbHeader locale={validLocale} />

      <main className="flex-1 pt-24 pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href={`/${validLocale}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isKo ? '메인으로 돌아가기' : 'BACK TO MAIN'}</span>
          </Link>
        </div>

        {/* Page Title & Section Header */}
        <div className="border-b border-white pb-6 mb-10 flex justify-between items-baseline">
          <div>
            <span className="font-mono text-xs font-bold text-[#8C8C8C] tracking-widest uppercase">
              {isKo ? '참여 작가 및 출품 작품' : 'PARTICIPATING ARTISTS & WORKS'}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              {isKo ? '전시' : 'EXHIBITION'}
            </h1>
            <p className="text-xs sm:text-sm text-[#8C8C8C] font-mono mt-2">
              {isKo
                ? '작가 카드를 클릭하면 상세 프로필과 출품 작품을 확인하실 수 있습니다.'
                : 'Click an artist card to view their profile and participating artworks.'}
            </p>
          </div>
          <span
            className="font-mono font-black text-5xl sm:text-7xl text-transparent select-none"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
          >
            02
          </span>
        </div>

        {/* Integrated Artists Grid */}
        <ArtistGrid
          categories={categories}
          allLabel={isKo ? '전체 부문 (ALL)' : 'ALL VENUES'}
          onArtistClick={(artist) => setSelectedArtist(artist)}
          showModalInternally={false}
          theme="blackwhite"
          locale={validLocale}
        />
      </main>

      {/* Integrated Artist & Works Carousel Modal */}
      <ArtistModal
        artist={selectedArtist}
        onClose={() => setSelectedArtist(null)}
        locale={validLocale}
        theme="blackwhite"
      />

      <Footer locale={validLocale} />
    </div>
  );
}