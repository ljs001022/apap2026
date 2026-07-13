'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Compass, Layers, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import BlurFade from './BlurFade';

interface ProgramProps {
  t: (key: string) => string;
  locale: string;
}

export default function ProgramSection({ t, locale }: ProgramProps) {
  const [activeTab, setActiveTab] = useState('media-art');

  const programs = [
    {
      id: 'media-art',
      title: locale === 'ko' ? '미디어아트 갤러리' : locale === 'en' ? 'Media Art Gallery' : locale === 'ja' ? 'メディアアート・ギャラリー' : '媒体艺术画廊',
      shortTitle: locale === 'ko' ? '미디어아트' : 'Media Art',
      icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />,
      desc: locale === 'ko' 
        ? '안양천 일대를 디지털 캔버스로 삼아 펼쳐지는 대규모 가상 무릉도원 미디어 아트쇼. 현실과 디지털 세계의 결합을 선보입니다.'
        : locale === 'en' ? 'A large-scale virtual Peach Blossom Spring media art show using the Anyang Stream area as a digital canvas, blending the real and digital worlds.'
        : locale === 'ja' ? '安養川一帯をデジタルキャンバスに見立てた大規模な仮想武陵桃源メディアアートショー。'
        : '以安养川一带为数字画布展开的大型虚拟桃花源媒体艺术展。',
      place: locale === 'ko' ? '안양천 둔치 특별 전시장' : locale === 'en' ? 'Anyang Stream Special Venue' : locale === 'ja' ? '安養川河川敷特別会場' : '安养川河畔特别展场',
      date: '2026.09.12 – 2026.11.30',
    },
    {
      id: 'sculpture-walk',
      title: locale === 'ko' ? '도시 조각 산책' : locale === 'en' ? 'Urban Sculpture Walk' : locale === 'ja' ? '都市彫刻散策' : '都市雕塑散步',
      shortTitle: locale === 'ko' ? '조각 산책' : 'Sculpture',
      icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5" />,
      desc: locale === 'ko'
        ? '안양예술공원 자연 숲에 배치된 공공 예술 조각들과 신규 미래형 미디어 인터랙티브 조각상들의 시공간적 산책 통로.'
        : locale === 'en' ? 'A curated walk through nature connecting public art sculptures and futuristic interactive media installations at Anyang Art Park.'
        : locale === 'ja' ? '安養芸術公園の自然の森に設置されたパブリックアート彫刻と新しい未来型インタラクティブ彫刻の散策路。'
        : '安养艺术公园自然森林中公共艺术雕塑与新型未来派媒体互动雕塑的散步通道。',
      place: locale === 'ko' ? '안양예술공원 전역' : locale === 'en' ? 'Anyang Art Park' : locale === 'ja' ? '安養芸術公園全域' : '安养艺术公园全区',
      date: locale === 'ko' ? '상설 전시' : locale === 'en' ? 'Permanent Exhibition' : locale === 'ja' ? '常設展示' : '常设展览',
    },
    {
      id: 'forum',
      title: locale === 'ko' ? '미래예술 포럼' : locale === 'en' ? 'Futuristic Art Forum' : locale === 'ja' ? '未来芸術フォーラム' : '未来艺术论坛',
      shortTitle: locale === 'ko' ? '포럼' : 'Forum',
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
      desc: locale === 'ko'
        ? '글로벌 석학 및 테크 아티스트들이 한데 모여 생성형 AI와 로봇 공학이 공공예술에 가져올 패러다임을 의논합니다.'
        : locale === 'en' ? 'Global scholars and tech artists gather to discuss paradigms that generative AI and robotics will bring to public art.'
        : locale === 'ja' ? 'グローバルな学者やテックアーティストが集まり、生成AIやロボット工学がもたらすパラダイムを討論します。'
        : '全球学者和科技艺术家共同探讨生成式AI和机器人技术将为公共艺术带来的范式。',
      place: locale === 'ko' ? '안양아트센터 컨벤션홀' : locale === 'en' ? 'Anyang Art Center Convention Hall' : locale === 'ja' ? '安養アートセンターコンベンションホール' : '安养艺术中心会议厅',
      date: '2026.09.15 – 2026.09.17',
    },
    {
      id: 'workshop',
      title: locale === 'ko' ? '시민 참여 워크숍' : locale === 'en' ? "Citizens' Workshop" : locale === 'ja' ? '市民ワークショップ' : '市民创意营',
      shortTitle: locale === 'ko' ? '워크숍' : 'Workshop',
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      desc: locale === 'ko'
        ? '생성형 AI 모델을 활용해 안양의 공공 조각품을 가상 공간에 새롭게 리모델링하고 아트워크를 창작합니다.'
        : locale === 'en' ? "Using generative AI tools, citizens remodel Anyang\u2019s public sculptures and co-create digital artworks in an open studio setting."
        : locale === 'ja' ? '生成AIを活用して安養のパブリック彫刻をリニューアルし、デジタルアートを創作します。'
        : '利用生成式AI重新建模安养的公共雕塑，并创作数字艺术作品。',
      place: locale === 'ko' ? 'APAP 오픈 스튜디오' : locale === 'en' ? 'APAP Open Studio' : locale === 'ja' ? 'APAPオープンスタジオ' : 'APAP开放工作室',
      date: locale === 'ko' ? '행사 기간 중 매주 주말' : locale === 'en' ? 'Every weekend during the event' : locale === 'ja' ? 'イベント期間中の毎週末' : '活动期间每个周末',
    },
  ];

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const idx = programs.findIndex((p) => p.id === prev);
        return programs[(idx + 1) % programs.length].id;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentProg = programs.find((p) => p.id === activeTab);
  const activeIndex = programs.findIndex((p) => p.id === activeTab);

  return (
    <section id="program" className="relative min-h-screen flex flex-col justify-center py-20 md:py-32 px-5 sm:px-6 bg-transparent">
      <div className="container mx-auto max-w-5xl space-y-8 sm:space-y-12">
        
        <BlurFade className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-[10px] md:text-xs font-mono text-white/40 tracking-widest uppercase">Exhibitions & Events</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight break-keep">{t('programTitle')}</h2>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed font-light break-keep">
            {t('programDesc')}
          </p>
        </BlurFade>

        {/* Mobile: tab pills as horizontal scroll row */}
        <div className="flex lg:hidden gap-2.5 overflow-x-auto hide-scrollbar pb-1">
          {programs.map((prog) => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(prog.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-300 cursor-pointer",
                activeTab === prog.id
                  ? "bg-pink-500/15 border-pink-400/50 text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.2)]"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
              )}
            >
              {prog.icon}
              <span>{prog.shortTitle}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
          
          {/* Desktop: vertical tab list */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex lg:flex-col gap-3 lg:w-[260px] flex-shrink-0"
          >
            {programs.map((prog) => (
              <button
                key={prog.id}
                onClick={() => setActiveTab(prog.id)}
                className={cn(
                  "text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 border cursor-pointer",
                  activeTab === prog.id
                    ? "bg-pink-500/10 border-pink-500/40 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                    : "bg-transparent border-transparent hover:bg-white/5 text-white/50 hover:text-white"
                )}
              >
                <div className={cn("transition-colors flex-shrink-0", activeTab === prog.id ? "text-pink-300" : "text-white/30")}>
                  {prog.icon}
                </div>
                <span className="font-bold text-sm leading-snug">{prog.title}</span>
              </button>
            ))}
          </motion.div>

          {/* Content panel */}
          <BlurFade 
            delay={300}
            className="flex-1 bg-white/[0.03] border border-white/10 hover:border-pink-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 relative overflow-hidden backdrop-blur-md min-h-[280px] sm:min-h-[320px] hover:shadow-[0_10px_30px_rgba(236,72,153,0.1)] transition-all duration-500"
          >
            <AnimatePresence mode="wait">
              {currentProg && (
                <motion.div
                  key={currentProg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5 sm:space-y-8 flex flex-col justify-between h-full relative z-10"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] md:text-xs font-mono text-pink-300 uppercase tracking-widest flex items-center gap-2">
                      {currentProg.icon} {currentProg.id.replace('-', ' ')}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight break-keep">
                      {currentProg.title}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed font-light break-keep">
                      {currentProg.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-5">
                    <div className="flex items-start space-x-3 text-white/50">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-pink-400" />
                      <div>
                        <p className="text-[9px] font-mono uppercase mb-1">{locale === 'ko' ? '장소' : 'Location'}</p>
                        <p className="text-xs sm:text-sm font-semibold text-white/90 leading-snug">{currentProg.place}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-white/50">
                      <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-pink-400" />
                      <div>
                        <p className="text-[9px] font-mono uppercase mb-1">{locale === 'ko' ? '기간' : 'Schedule'}</p>
                        <p className="text-xs sm:text-sm font-semibold text-white/90 leading-snug">{currentProg.date}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Watermark */}
            {currentProg && (
              <div className="absolute top-1/2 -translate-y-1/2 right-8 text-pink-500/[0.015] scale-[8] pointer-events-none">
                {currentProg.icon}
              </div>
            )}

            {/* Autoplay progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden rounded-b-3xl">
              <motion.div
                key={activeTab}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="h-full bg-pink-400/60"
              />
            </div>
          </BlurFade>

        </div>

        {/* Mobile tab indicators */}
        <div className="flex lg:hidden justify-center space-x-2">
          {programs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(programs[idx].id)}
              className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex ? 'w-6 bg-pink-400' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
