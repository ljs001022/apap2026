'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ArtistProps {
  t: (key: string) => string;
  locale: string;
}

export default function ArtistSection({ t, locale }: ArtistProps) {
  // Mock data for artists
  const artists = [
    { name: locale === 'ko' ? '김아영' : 'Ayoung Kim', type: 'Media Art', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '레픽 아나돌' : 'Refik Anadol', type: 'AI Installation', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '히토 슈타이어얼' : 'Hito Steyerl', type: 'Video Essay', img: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '백남준 아트센터' : 'NJP Art Center', type: 'Archival', img: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '이불' : 'Lee Bul', type: 'Sculpture', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop' },
    { name: locale === 'ko' ? '이안 쳉' : 'Ian Cheng', type: 'Live Simulation', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <section id="artists" className="py-24 px-6 border-t border-white/5 relative bg-transparent">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <span className="text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase block">Artists</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">Participating Artists</h2>
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#artists" 
            className="text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            View All Artists →
          </motion.a>
        </div>

        {/* Horizontal Scroll / Grid for Desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x hide-scrollbar md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:-mx-0">
          {artists.map((artist, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex-shrink-0 w-[280px] md:w-auto snap-start group cursor-pointer mr-4 md:mr-0 relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 aspect-[4/5]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-80 transition-opacity duration-700 ease-in-out scale-100 group-hover:scale-105"
                style={{ backgroundImage: `url(${artist.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 space-y-1">
                <span className="text-[10px] font-mono uppercase text-pink-400 border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 rounded-full inline-block mb-2">
                  {artist.type}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {artist.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
