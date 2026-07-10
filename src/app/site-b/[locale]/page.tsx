'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Sparkles, Calendar, MapPin, ArrowUpRight, Compass, Layers, Users } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function SiteBPage({ params }: PageProps) {
  // Next.js 15+ 클라이언트 컴포넌트에서 비동기 params 언래핑
  const { locale } = React.use(params);
  
  const t = useTranslations('site-b');
  const navT = useTranslations('nav');

  const [activeTab, setActiveTab] = React.useState('media-art');

  const locales = ['ko', 'en', 'ja', 'zh'];

  // 프로그램 정보는 각 국어별 텍스트 매칭 (JSON 리소스 참조 가능하지만 컴포넌트 상에서 직접 다국어 UI 설계)
  const programs = [
    {
      id: 'media-art',
      title: locale === 'ko' ? '미디어아트 스펙터클' : locale === 'en' ? 'Media Art Spectacle' : locale === 'ja' ? 'メディアアート・スペクタクル' : '媒体艺术盛宴',
      icon: <Sparkles className="w-6 h-6 text-pink-400" />,
      desc: locale === 'ko' 
        ? '안양천 일대를 디지털 캔버스로 삼아 펼쳐지는 대규모 가상 무릉도원 미디어 아트쇼. 현실과 디지털 세계의 결합을 선보합니다.'
        : locale === 'en'
        ? 'A large-scale virtual Peach Blossom Spring media art show using the Anyang Stream area as a digital canvas, merging reality and virtuality.'
        : locale === 'ja'
        ? '安養川一帯をデジタルキャンバスに見立てて繰り広げられる大規模な仮想武陵桃源メディアアートショー。現実とデジタルの融合を披露します。'
        : '以安养川一带为数字画布展开的大型虚拟桃花源媒体艺术展，展现现实与数字世界的完美结合。',
      place: locale === 'ko' ? '안양천 둔치 특별 전시장' : locale === 'en' ? 'Anyang Stream Special Venue' : locale === 'ja' ? '安養川河川敷特別会場' : '安养川河畔特别展场',
      date: '2026.09.12 - 2026.11.30',
    },
    {
      id: 'sculpture-walk',
      title: locale === 'ko' ? '도시 조각 산책' : locale === 'en' ? 'Urban Sculpture Walk' : locale === 'ja' ? '都市彫刻散策' : '都市雕塑散步',
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      desc: locale === 'ko'
        ? '안양예술공원 자연 숲에 배치된 기존 공공 예술 조각들과 신규 미래형 미디어 인터랙티브 조각상들의 시공간적 산책 통로.'
        : locale === 'en'
        ? 'A walk through nature connecting existing public art sculptures and new futuristic interactive media installations in Anyang Art Park.'
        : locale === 'ja'
        ? '安養芸術公園の自然の森に配置された既存のパブリックアート彫刻と、新規の未来型メディアインタラクティブ彫刻の時空間的な散策路。'
        : '安养艺术公园自然森林中现有的公共艺术雕塑与新型未来派媒体互动雕塑的时空散步通道。',
      place: locale === 'ko' ? '안양예술공원 전역' : locale === 'en' ? 'Anyang Art Park Area' : locale === 'ja' ? '安養芸術公園全域' : '安养艺术公园全区',
      date: locale === 'ko' ? '상설 전시' : locale === 'en' ? 'Permanent Exhibition' : locale === 'ja' ? '常設展示' : '常设展览',
    },
    {
      id: 'forum',
      title: locale === 'ko' ? '미래예술 포럼' : locale === 'en' ? 'Futuristic Art Forum' : locale === 'ja' ? '未来芸術フォーラム' : '未来艺术论坛',
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      desc: locale === 'ko'
        ? '글로벌 석학 및 테크 아티스트들이 한데 모여 생성형 AI와 로봇 공학이 공공예술에 가져올 미래적 패러다임을 의논합니다.'
        : locale === 'en'
        ? 'Global scholars and tech artists gather to discuss the futuristic paradigms that generative AI and robotics will bring to public art.'
        : locale === 'ja'
        ? 'グローバルな学者やテックアーティストが集まり、生成AIやロボット工学がパブリックアートにもたらす未来的パラダイムを討論します。'
        : '全球学者和科技艺术家齐聚一堂，共同探讨生成式AI和机器人技术将为公共艺术带来的未来范式。',
      place: locale === 'ko' ? '안양아트센터 컨벤션홀' : locale === 'en' ? 'Anyang Art Center Convention Hall' : locale === 'ja' ? '安養アートセンターコンベンションホール' : '安养艺术中心会议厅',
      date: '2026.09.15 - 2026.09.17',
    },
    {
      id: 'workshop',
      title: locale === 'ko' ? '시민 참여 워크숍' : locale === 'en' ? "Citizens' Art Workshop" : locale === 'ja' ? '市民参加型ワークショップ' : '市民参与创意营',
      icon: <Users className="w-6 h-6 text-yellow-400" />,
      desc: locale === 'ko'
        ? '생성형 AI 모델을 활용해 안양의 공공 조각품을 가상 공간에 새롭게 리모델링하고 크라우드 소싱 기반의 디지털 아트워크를 창작합니다.'
        : locale === 'en'
        ? 'Using generative AI tools, citizens remodel Anyang’s public sculptures in virtual spaces and co-create digital crowdsourced artworks.'
        : locale === 'ja'
        ? '生成AIモデルを活用して安養のパブリック彫刻を仮想空間にリニューアルし、クラウドソーシングによるデジタルアートを創作します。'
        : '利用生成式AI模型在虚拟空间中重新建模安养的公共雕塑，并创作基于众包 carbon 的数字艺术作品。',
      place: locale === 'ko' ? 'APAP 오픈 스튜디오' : locale === 'en' ? 'APAP Open Studio' : locale === 'ja' ? 'APAPオープンスタジオ' : 'APAP开放工作室',
      date: locale === 'ko' ? '행사 기간 중 매주 주말' : locale === 'en' ? 'Every weekend during the event' : locale === 'ja' ? 'イベント期間中の毎週週末' : '活动期间每个周末',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-pink-500 selection:text-white overflow-hidden relative">
      {/* Background Neon Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111726_1px,transparent_1px),linear-gradient(to_bottom,#111726_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-35 pointer-events-none" />

      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b14]/75 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black tracking-widest bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              APAP 8
            </span>
            <span className="text-xs text-cyan-400 font-mono tracking-widest border border-cyan-400/20 px-2 py-0.5 rounded bg-cyan-950/30">
              2026 BIENNALE
            </span>
          </div>

          {/* Site B Navigation */}
          <nav className="hidden lg:flex space-x-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <a href="#hero" className="hover:text-pink-500 transition-colors">Home</a>
            <a href="#about" className="hover:text-pink-500 transition-colors">Concept</a>
            <a href="#programs" className="hover:text-pink-500 transition-colors">Programs</a>
            <a href="#visit" className="hover:text-pink-500 transition-colors">Visit</a>
          </nav>

          {/* Lang selector for Site B */}
          <div className="flex items-center space-x-4">
            <div className="flex border border-white/10 rounded-full overflow-hidden text-[10px] font-mono">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={`px-2.5 py-1.5 transition-colors uppercase ${
                    locale === loc ? 'bg-pink-600 text-white' : 'bg-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {loc}
                </Link>
              ))}
            </div>

            {/* Return link to Site A (Archive) */}
            <Link
              href={`/${locale}`}
              className="flex items-center space-x-1 border border-white/10 hover:border-pink-500/50 bg-white/5 hover:bg-pink-950/20 text-xs font-bold px-4 py-2 rounded-full transition-all group"
            >
              <span>{navT('archiveBack')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center pt-20 px-6 text-center relative">
        <div className="space-y-6 max-w-4xl">
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-pink-500 uppercase">
            {t('subtitle')}
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            {locale === 'ko' || locale === 'zh' ? '' : 'Digital '}<span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('title')}</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            {t('desc')}
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(219,39,119,0.3)] transition-all text-sm uppercase tracking-wider"
            >
              {t('btnConcept')}
            </a>
            <a
              href="#programs"
              className="bg-transparent border border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-lg transition-all text-sm uppercase tracking-wider"
            >
              {t('btnProgram')}
            </a>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Scroll Down</span>
          <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-transparent animate-bounce rounded-full" />
        </div>
      </section>

      {/* 2. CONCEPT / ABOUT SECTION */}
      <section id="about" className="py-32 px-6 border-t border-white/5 relative bg-[#090e1a]/40">
        <div className="container mx-auto max-w-5xl space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-1 bg-pink-500" />
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-snug">
                {t('conceptTitle')}
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                {t('conceptDesc')}
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-pink-500/30 pl-4 space-y-1">
                  <h4 className="text-sm md:text-base font-bold text-pink-400">
                    {locale === 'ko' ? '미래지향적 미학' : locale === 'en' ? 'Futuristic Aesthetics' : locale === 'ja' ? '未来志向の美学' : '未来主义美学'}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-500">
                    {locale === 'ko' ? '인공지능과 가상현실 융합' : locale === 'en' ? 'AI & VR Integration' : locale === 'ja' ? '人工知能とVRの融合' : '人工智能与虚拟现实融合'}
                  </p>
                </div>
                <div className="border-l-2 border-cyan-500/30 pl-4 space-y-1">
                  <h4 className="text-sm md:text-base font-bold text-cyan-400">
                    {locale === 'ko' ? '자연과의 조화' : locale === 'en' ? 'Harmony with Nature' : locale === 'ja' ? '自然との調和' : '与自然和谐共生'}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-500">
                    {locale === 'ko' ? '안양예술공원의 생태계 보존' : locale === 'en' ? 'Ecological Conservation' : locale === 'ja' ? '安養芸術公園の生態系保存' : '安养艺术公园生态保护'}
                  </p>
                </div>
              </div>
            </div>

            {/* Conception Visual Card Mockup */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm shadow-xl flex flex-col justify-between h-[380px] group hover:border-pink-500/20 transition-all">
              <div className="absolute top-[-30%] right-[-30%] w-[60%] h-[60%] bg-pink-500/10 rounded-full blur-[80px] group-hover:bg-pink-500/20 transition-all" />
              <div className="space-y-2 relative z-10">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">APAP8 CONCEPTION</span>
                <h3 className="text-2xl font-bold">Concept Keypoints</h3>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">{locale === 'ko' ? '01. 미디어아트 갤러리' : '01. Media Art Gallery'}</span>
                  <span className="text-[10px] text-pink-500 font-mono">Media Art</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">{locale === 'ko' ? '02. 디지털 미디어 조각상' : '02. Interactive Sculptures'}</span>
                  <span className="text-[10px] text-cyan-500 font-mono">Sculptures</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">{locale === 'ko' ? '03. 무릉도원 유토피아' : '03. Taoist Utopia'}</span>
                  <span className="text-[10px] text-purple-500 font-mono">Utopia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAMS SECTION */}
      <section id="programs" className="py-32 px-6 border-t border-white/5 relative">
        <div className="container mx-auto max-w-5xl space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">EXHIBITIONS & EVENTS</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase">{t('programTitle')}</h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light font-sans">
              {t('programDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Nav Tabs */}
            <div className="lg:col-span-1 flex flex-col space-y-3">
              {programs.map((prog) => (
                <button
                  key={prog.id}
                  onClick={() => setActiveTab(prog.id)}
                  className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    activeTab === prog.id
                      ? 'bg-gradient-to-r from-pink-950/30 to-purple-950/20 border-pink-500/50 shadow-[0_0_15px_rgba(219,39,119,0.15)]'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {prog.icon}
                    <span className="font-bold text-sm">{prog.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{prog.id.replace('-', ' ')}</span>
                </button>
              ))}
            </div>

            {/* Right Tab Content */}
            <div className="lg:col-span-2 bg-[#090e1a]/80 border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[300px] shadow-lg relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                {programs.find((p) => p.id === activeTab)?.icon}
              </div>
              
              {(() => {
                const currentProg = programs.find((p) => p.id === activeTab);
                if (!currentProg) return null;
                return (
                  <div className="space-y-6 relative z-10 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-mono text-pink-500 uppercase tracking-widest">PROGRAM DETAIL</span>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                          {currentProg.title}
                        </h3>
                      </div>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light font-sans">
                        {currentProg.desc}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6 mt-6">
                      <div className="flex items-center space-x-3 text-xs text-slate-400">
                        <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 uppercase">{locale === 'ko' ? '장소' : 'Location'}</p>
                          <p className="font-semibold text-slate-200 mt-0.5">{currentProg.place}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400">
                        <Calendar className="w-5 h-5 text-pink-400 shrink-0" />
                        <div>
                          <p className="text-[10px] font-mono text-slate-500 uppercase">{locale === 'ko' ? '기간' : 'Schedule'}</p>
                          <p className="font-semibold text-slate-200 mt-0.5">{currentProg.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISIT INFO SECTION */}
      <section id="visit" className="py-32 px-6 border-t border-white/5 relative bg-[#090e1a]/40">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono text-pink-500 tracking-widest uppercase">GUIDELINE</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase">{t('visitTitle')}</h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                {t('visitDesc')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <MapPin className="w-5 h-5 text-pink-500" />
                  <span className="text-xs md:text-sm font-semibold">
                    {locale === 'ko' ? '경기 안양시 만안구 예술공원로 103 일대' : locale === 'en' ? '103 Arts Park Road, Manan-gu, Anyang, Gyeonggi' : locale === 'ja' ? '京畿道安養市万安区芸術公園路103一帯' : '京畿道安养市万安区艺术公园路103一带'}
                  </span>
                </div>
                <div className="flex items-center space-x-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <Calendar className="w-5 h-5 text-cyan-500" />
                  <span className="text-xs md:text-sm font-semibold">
                    {locale === 'ko' ? '야외 전시 상시 개방 (일부 미디어 아트 야간 점등)' : locale === 'en' ? 'Outdoor installation always open (night lighting active)' : locale === 'ja' ? '屋外展示常時開放 (一部メディアアート夜間点灯)' : '户外展区常年开放（部分媒体艺术夜间点亮）'}
                  </span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-950 border border-white/10 rounded-2xl h-[300px] flex flex-col justify-center items-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-35" />
              <div className="relative z-10 text-center space-y-2">
                <Compass className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
                <h4 className="text-lg font-bold">Interactive Map</h4>
                <p className="text-xs text-slate-500">
                  {locale === 'ko' ? '실시간 작품 탐색 지도는 준비 중입니다.' : locale === 'en' ? 'Interactive map is under development.' : locale === 'ja' ? 'インタラクティブマップは準備中です。' : '实时作品探索地图正在准备中。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#05080f] py-16 px-6 relative z-10 text-xs text-slate-500">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-extrabold text-slate-300 tracking-wider">APAP 8 (안양공공예술프로젝트)</p>
            <p>안양문화예술재단 APAP 사무국 | 경기도 안양시 만안구 예술공원로 103</p>
            <p className="text-[10px]">© 2026 Anyang Foundation for Culture & Arts. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Cross-link back to Archive Main */}
            <Link
              href={`/${locale}`}
              className="text-slate-400 hover:text-pink-500 transition-colors font-semibold"
            >
              {navT('archiveBack')}
            </Link>
            <a href="https://www.ayac.or.kr" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors font-semibold">
              재단 홈페이지
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
