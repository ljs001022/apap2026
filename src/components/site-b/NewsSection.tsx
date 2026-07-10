'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface NewsProps {
  t: (key: string) => string;
  locale: string;
}

export default function NewsSection({ t, locale }: NewsProps) {
  const newsList = [
    { type: 'NOTICE', title: locale === 'ko' ? '제8회 안양공공예술프로젝트(APAP8) 예술감독 선임' : 'Appointment of Artistic Director for APAP8', date: '2026.01.15' },
    { type: 'PRESS', title: locale === 'ko' ? 'APAP8, AI와 자연을 결합한 새로운 퍼블릭 아트 선보여' : 'APAP8 Unveils New Public Art Combining AI and Nature', date: '2026.04.22' },
    { type: 'NOTICE', title: locale === 'ko' ? '시민 참여 워크숍 사전 참가자 모집 안내' : 'Pre-registration for Citizens Participation Workshop', date: '2026.06.01' },
  ];

  return (
    <section id="news" className="py-24 px-6 border-t border-white/5 relative bg-transparent">
      <div className="container mx-auto max-w-4xl space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end"
        >
          <div className="space-y-3">
            <span className="text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase block">Updates</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">News / Press</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-1 text-xs font-bold text-white/60 hover:text-white transition-colors">
            MORE <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>

        <div className="border-t border-white/10">
          {newsList.map((news, idx) => (
            <motion.a
              key={idx}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <span className={`text-[10px] font-mono tracking-wider px-2 py-1 rounded w-fit ${news.type === 'NOTICE' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-pink-500/10 text-pink-400'}`}>
                  {news.type}
                </span>
                <h3 className="text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors line-clamp-2 md:line-clamp-1">
                  {news.title}
                </h3>
              </div>
              <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 text-white/40 font-mono text-xs">
                <span>{news.date}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
        
        <a href="#" className="md:hidden flex items-center justify-center gap-2 text-xs font-bold text-white bg-white/5 py-4 rounded-xl">
          VIEW ALL NEWS <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
