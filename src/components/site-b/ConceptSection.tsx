'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ConceptProps {
  t: (key: string) => string;
  locale: string;
}

export default function ConceptSection({ t, locale }: ConceptProps) {
  return (
    <section id="about" className="py-24 md:py-32 px-6 relative border-t border-white/5">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] md:text-xs font-mono text-white/50 uppercase tracking-widest block">Concept</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-snug text-white">
                {t('conceptTitle')}
              </h2>
            </div>
            
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
              {t('conceptDesc')}
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l border-white/20 pl-4 space-y-2">
                <h4 className="text-sm md:text-base font-bold text-white/90">
                  {locale === 'ko' ? '미래지향적 미학' : locale === 'en' ? 'Futuristic Aesthetics' : locale === 'ja' ? '未来志向の美学' : '未来主义美学'}
                </h4>
                <p className="text-[11px] md:text-xs text-white/50">
                  {locale === 'ko' ? '인공지능과 가상현실 융합' : locale === 'en' ? 'AI & VR Integration' : locale === 'ja' ? '人工知能とVRの融合' : '人工智能与虚拟现实融合'}
                </p>
              </div>
              <div className="border-l border-white/20 pl-4 space-y-2">
                <h4 className="text-sm md:text-base font-bold text-white/90">
                  {locale === 'ko' ? '자연과의 조화' : locale === 'en' ? 'Harmony with Nature' : locale === 'ja' ? '自然との調和' : '与自然和谐共生'}
                </h4>
                <p className="text-[11px] md:text-xs text-white/50">
                  {locale === 'ko' ? '안양예술공원의 생태계 보존' : locale === 'en' ? 'Ecological Conservation' : locale === 'ja' ? '安養芸術公園の生態系保存' : '安养艺术公园生态保护'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-xl h-auto md:h-[400px] flex flex-col justify-between"
          >
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-pink-500/10 rounded-full blur-[60px]" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[60px]" />
            
            <div className="space-y-2 relative z-10 mb-8 md:mb-0">
              <span className="text-[10px] font-mono text-white/40 tracking-widest">KEYPOINTS</span>
              <h3 className="text-xl md:text-2xl font-bold text-white/90">Conception Map</h3>
            </div>
            
            <div className="space-y-3 relative z-10 flex-1 flex flex-col justify-end">
              {[
                { title: locale === 'ko' ? '01. 미디어아트 갤러리' : '01. Media Art Gallery', tag: 'Media' },
                { title: locale === 'ko' ? '02. 인터랙티브 조각' : '02. Interactive Sculptures', tag: 'Sculpture' },
                { title: locale === 'ko' ? '03. 메타버스 유토피아' : '03. Metaverse Utopia', tag: 'Virtual' }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#0A0A0A]/50 border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-white/10 transition-colors">
                  <span className="text-xs md:text-sm font-semibold text-white/80">{item.title}</span>
                  <span className="text-[9px] md:text-[10px] text-white/40 font-mono uppercase border border-white/10 px-2 py-1 rounded bg-white/5">{item.tag}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
