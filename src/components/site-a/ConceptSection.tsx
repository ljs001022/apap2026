import React from 'react';
import { motion } from 'framer-motion';
import BlurFade from './BlurFade';

interface ConceptProps {
  t: (key: string) => string;
  locale: string;
}

export default function ConceptSection({ t, locale }: ConceptProps) {
  const keyPoints = [
    {
      title: locale === 'ko' ? '미래지향적 미학' : locale === 'en' ? 'Futuristic Aesthetics' : locale === 'ja' ? '未来志向の美学' : '未来主义美学',
      desc: locale === 'ko' ? '인공지능과 가상현실 융합' : locale === 'en' ? 'AI & VR Integration' : locale === 'ja' ? '人工知能とVRの融合' : '人工智能与虚拟现实融合',
    },
    {
      title: locale === 'ko' ? '자연과의 조화' : locale === 'en' ? 'Harmony with Nature' : locale === 'ja' ? '自然との調和' : '与自然和谐共生',
      desc: locale === 'ko' ? '안양예술공원의 생태계 보존' : locale === 'en' ? 'Ecological Conservation' : locale === 'ja' ? '安養芸術公園の生態系保存' : '安养艺术公园生态保护',
    },
  ];

  const mapItems = [
    { title: locale === 'ko' ? '01. 미디어아트 갤러리' : '01. Media Art Gallery', tag: 'Media' },
    { title: locale === 'ko' ? '02. 인터랙티브 조각' : '02. Interactive Sculptures', tag: 'Sculpture' },
    { title: locale === 'ko' ? '03. 메타버스 유토피아' : '03. Metaverse Utopia', tag: 'Virtual' },
  ];

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-20 md:py-32 px-5 sm:px-6 bg-transparent">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start lg:items-center">
          
          {/* Left: text */}
          <div className="space-y-6 sm:space-y-8">
            <BlurFade className="space-y-3">
              <span className="text-[10px] md:text-xs font-mono text-white/50 uppercase tracking-widest block">Concept</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-snug text-white break-keep">
                {t('conceptTitle')}
              </h2>
            </BlurFade>
            
            <BlurFade delay={150}>
              <p className="text-white/60 text-sm md:text-base leading-relaxed font-light break-keep">
                {t('conceptDesc')}
              </p>
            </BlurFade>
            
            <BlurFade delay={300} className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
              {keyPoints.map((kp, idx) => (
                <div key={idx} className="border-l-2 border-white/20 pl-4 space-y-1.5">
                  <h4 className="text-sm md:text-base font-bold text-white/90 leading-snug">{kp.title}</h4>
                  <p className="text-[11px] md:text-xs text-white/50 leading-snug">{kp.desc}</p>
                </div>
              ))}
            </BlurFade>
          </div>

          {/* Right: conception map card */}
          <BlurFade delay={200}>
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white/[0.03] border border-white/10 hover:border-pink-500/35 rounded-3xl p-5 sm:p-7 md:p-8 relative overflow-hidden backdrop-blur-md flex flex-col gap-6 hover:shadow-[0_10px_30px_rgba(236,72,153,0.1)] transition-all duration-500"
            >
              <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-pink-500/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">KEYPOINTS</span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white/90">Conception Map</h3>
              </div>
              
              <div className="space-y-3 relative z-10">
                {mapItems.map((item, idx) => (
                  <div key={idx} className="bg-[#0A0A0A]/50 border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-pink-500/30 transition-colors duration-300">
                    <span className="text-xs md:text-sm font-semibold text-white/80 group-hover:text-pink-200 transition-colors leading-snug pr-4">{item.title}</span>
                    <span className="text-[9px] md:text-[10px] text-white/40 font-mono uppercase border border-white/10 px-2 py-1 rounded bg-white/5 flex-shrink-0">{item.tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
