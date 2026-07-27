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
    <section id="news" className="relative flex flex-col justify-center py-20 md:py-28 px-5 sm:px-6 bg-transparent">
      <div className="container mx-auto max-w-4xl space-y-8 sm:space-y-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end"
        >
          <div className="space-y-2">
            <span className="text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase block">Updates</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">News / Press</h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-1 text-xs font-bold text-white/50 hover:text-white transition-colors">
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
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 sm:py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl gap-3"
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-6">
                <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full flex-shrink-0 ${news.type === 'NOTICE' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20' : 'bg-pink-500/10 text-pink-400 border border-pink-400/20'}`}>
                  {news.type}
                </span>
                <h3 className="text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors leading-snug break-keep">
                  {news.title}
                </h3>
              </div>
              <div className="flex items-center justify-end gap-4 text-white/40 font-mono text-xs flex-shrink-0 pl-0 sm:pl-4">
                <span>{news.date}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
        
        <a href="#" className="sm:hidden flex items-center justify-center gap-2 text-xs font-bold text-white/70 bg-white/5 border border-white/10 py-4 rounded-xl hover:bg-white/10 transition-colors active:scale-98">
          VIEW ALL NEWS <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
