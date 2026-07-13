'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConceptSwitcher from '@/components/site-b/ConceptSwitcher';

// Types & interfaces
interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

type Locale = 'ko' | 'en' | 'ja' | 'zh';

// Translation Dictionary
const dict = {
  ko: {
    heroPrompt: '> generating: anyang public art project, 8th edition — art × artificial intelligence',
    heroTitle: 'APAP_8',
    heroSubtitle: '지능 시대의 예술',
    date: '기간: 2026.11.13—12.20',
    site: '장소: 안양예술공원 · 평촌 일대',
    edition: '회차: 8회',
    admission: '요금: 무료',
    aboutQuery: 'query: 전시 소개',
    aboutTitle: '지능의 시대, 도시는 무엇을 상상하는가',
    aboutDesc1: 'APAP 8은 공공예술과 인공지능의 교차점을 탐구합니다. 안양의 열린 공간 곳곳에서 예술가와 기계 시스템이 함께 만든 작품들이 도시가 감각하고, 학습하고, 기억하는 방식을 질문합니다.',
    aboutDesc2: '제8회는 인공지능을 도구나 위협이 아닌 하나의 공공적 조건 — 우리가 이미 함께 살아가는 환경 — 으로 제안합니다.',
    directorTitle: '예술감독',
    directorBio: '"작가들에게 하나의 질문을 던졌습니다. 기계가 도시를 대신해 결정해서는 안 되는 것은 무엇인가. 그 대답들이 지금 안양의 거리에 서서, 당신의 대답을 기다립니다."',
    artistsTitle: '참여 작가',
    artistsQuery: '8건의 레코드',
    all: '전체',
    kr: '국내',
    intl: '해외',
    worksTitle: '신작 프로젝트',
    worksQuery: '신작 커미션, 생성 중…',
    programTitle: '프로그램',
    programQuery: '일정 데이터',
    talk: '토크',
    workshop: '워크숍',
    tour: '투어',
    event: '행사',
    register: '신청하기',
    visitTitle: '오시는 길',
    visitQuery: '좌표: 37.4°N 126.9°E',
    address: '주소',
    addressVal: '경기도 안양시 만안구 예술공원로 180',
    hours: '관람 시간',
    hoursVal: '10:00–18:00 (야외 작품은 상시 관람)',
    closed: '휴관일',
    closedVal: '매주 월요일 (실내 거점)',
    admissionLabel: '요금',
    admissionVal: '무료',
    transit: '대중교통',
    transitVal: '1호선 안양역 → 마을버스 2번 · 4호선 평촌역 3번 출구',
    newsTitle: '소식',
    newsQuery: '최신 업데이트',
    sponsorsTitle: '주최 · 주관 · 프로젝트',
    hostedBy: '주최',
    organizedBy: '주관',
    project: '프로젝트',
    archiveBack: '역대 회차 아카이브 열기',
    copyright: '안양파빌리온 · 화–일 10:00–18:00 · 경기도 안양시 만안구 예술공원로 180 · 031-687-0548',
    privacy: '개인정보처리방침',
    close: '닫기',
    more: '더보기',
    menuOpen: '전체 메뉴',
    menuClose: '메뉴 닫기'
  },
  en: {
    heroPrompt: '> generating: anyang public art project, 8th edition — art × artificial intelligence',
    heroTitle: 'APAP_8',
    heroSubtitle: 'ART IN THE AGE OF INTELLIGENCE',
    date: 'DATE: 2026.11.13—12.20',
    site: 'SITE: ANYANG ART PARK · PYEONGCHON',
    edition: 'EDITION: 8TH',
    admission: 'ADMISSION: FREE',
    aboutQuery: 'query: what is apap_8',
    aboutTitle: 'WHAT DOES THE CITY DREAM OF, IN THE AGE OF INTELLIGENCE?',
    aboutDesc1: 'APAP 8 explores the crossing of public art and artificial intelligence. Across the open spaces of Anyang, artists and machine systems co-produce works that ask how a city senses, learns, and remembers.',
    aboutDesc2: 'Rather than treating AI as a tool or a threat, the 8th edition proposes it as a public condition — an environment we already inhabit together.',
    directorTitle: 'ARTISTIC DIRECTOR',
    directorBio: '“We asked the artists a single question: what should a machine never decide for a city? Their answers now stand in the streets of Anyang, waiting for yours.”',
    artistsTitle: 'ARTISTS',
    artistsQuery: '8 records found',
    all: 'ALL',
    kr: 'KOREA',
    intl: 'INTL',
    worksTitle: 'NEW PROJECTS',
    worksQuery: 'new commissions, generating…',
    programTitle: 'PROGRAM',
    programQuery: 'schedule.json',
    talk: 'TALK',
    workshop: 'WORKSHOP',
    tour: 'TOUR',
    event: 'EVENT',
    register: 'REGISTER',
    visitTitle: 'VISIT',
    visitQuery: 'coordinates: 37.4°N 126.9°E',
    address: 'ADDRESS',
    addressVal: '180 Yesulgongwon-ro, Manan-gu, Anyang-si, Gyeonggi-do',
    hours: 'HOURS',
    hoursVal: '10:00–18:00 (outdoor works open 24h)',
    closed: 'CLOSED',
    closedVal: 'Mondays (indoor venues)',
    admissionLabel: 'ADMISSION',
    admissionVal: 'FREE',
    transit: 'TRANSIT',
    transitVal: 'Line 1 Anyang Stn. → Bus 2 · Line 4 Pyeongchon Stn. Exit 3',
    newsTitle: 'NEWS / PRESS',
    newsQuery: 'latest updates',
    sponsorsTitle: 'HOSTED / ORGANIZED / PROJECT',
    hostedBy: 'HOSTED BY',
    organizedBy: 'ORGANIZED BY',
    project: 'PROJECT',
    archiveBack: 'open archive --all-editions',
    copyright: 'Anyang Pavilion · Tue–Sun 10:00–18:00 · 180 Yesulgongwon-ro, Manan-gu, Anyang-si · +82-31-687-0548',
    privacy: 'Privacy Policy',
    close: 'CLOSE',
    more: 'MORE',
    menuOpen: 'Menu',
    menuClose: 'Close Menu'
  },
  ja: {
    heroPrompt: '> generating: anyang public art project, 8th edition — art × artificial intelligence',
    heroTitle: 'APAP_8',
    heroSubtitle: '知能時代の芸術',
    date: '会期: 2026.11.13—12.20',
    site: '会場: 安養芸術公園 · 平村一帯',
    edition: '回数: 第8回',
    admission: '料金: 無料',
    aboutQuery: 'query: 展覧会の紹介',
    aboutTitle: '知能의 時代, 都市は何を想像するのか',
    aboutDesc1: 'APAP 8은 공공예술과 인공지능의 교차점을 탐색합니다. 안양의 열린 공간 곳곳에서 예술가와 기계 시스템이 공동 제작한 작품들이 도시가 감각하고, 학습하고, 기억하는 방식을 질문합니다.',
    aboutDesc2: '제8회는 인공지능을 도구나 위협이 아닌 하나의 공공적 조건 — 우리가 이미 함께 살아가는 환경 — 으로 제안합니다.',
    directorTitle: '芸術監督',
    directorBio: '「作家たちに一つの質問を投げかけました。機械が都市に代わって決定してはならないものは何か。その答えが今、安養の街に立ち、あなたの答えを待っています。」',
    artistsTitle: '参加アーティスト',
    artistsQuery: '8件의 레코드',
    all: 'すべて',
    kr: '国内',
    intl: '海外',
    worksTitle: '新作プロジェクト',
    worksQuery: '新作コミッション、生成中…',
    programTitle: 'プログラム',
    programQuery: '日程データ',
    talk: 'トーク',
    workshop: 'ワークショップ',
    tour: 'ツアー',
    event: 'イベント',
    register: '申し込む',
    visitTitle: 'アクセス',
    visitQuery: '座標: 37.4°N 126.9°E',
    address: '住所',
    addressVal: '京畿道安養市万安区芸術公園路180',
    hours: '観覧時間',
    hoursVal: '10:00–18:00 (屋外作品は常시 관람 가능)',
    closed: '休館日',
    closedVal: '毎週月曜日 (屋内拠点)',
    admissionLabel: '料金',
    admissionVal: '無料',
    transit: '公共交通',
    transitVal: '1号線安養駅 → 마을버스2번 · 4号선평촌역3번출구',
    newsTitle: 'ニュース',
    newsQuery: '最新アップデート',
    sponsorsTitle: '主催 · 主管 · プロジェクト',
    hostedBy: '主催',
    organizedBy: '主管',
    project: 'プロジェクト',
    archiveBack: '歴代アーカイブを開く',
    copyright: '安養パビリオン · 火–日 10:00–18:00 · 京畿道安養市万安区芸術公園路180 · 031-687-0548',
    privacy: '個人情報処理方針',
    close: '閉じる',
    more: '詳細表示',
    menuOpen: 'メニュー',
    menuClose: '閉じる'
  },
  zh: {
    heroPrompt: '> generating: anyang public art project, 8th edition — art × artificial intelligence',
    heroTitle: 'APAP_8',
    heroSubtitle: '智能时代的艺术',
    date: '日期: 2026.11.13—12.20',
    site: '地点: 安养艺术公园 · 平村一带',
    edition: '届数: 第八届',
    admission: '门票: 免费',
    aboutQuery: 'query: 展览介绍',
    aboutTitle: '智能时代，城市在想象什么',
    aboutDesc1: 'APAP 8 探讨公共艺术与人工智能的交汇点。在安养的开放空间中，艺术家与机器系统共同创作的作品，拷问着城市感知、学习和记忆的方式。',
    aboutDesc2: '第八届项目将人工智能视为一种公共条件——一个我们已经共同生活的环境，而非单纯的工具或威胁。',
    directorTitle: '艺术总监',
    directorBio: '“我们向艺术家们提出了一个问题：机器绝不应该替城市决定什么？他们的回答现在就矗立在安养的街道上，等待着您的答案。”',
    artistsTitle: '参展艺术家',
    artistsQuery: '8条记录',
    all: '全部',
    kr: '国内',
    intl: '海外',
    worksTitle: '新作项目',
    worksQuery: '新作委托，生成中…',
    programTitle: '活动项目',
    programQuery: '日程数据',
    talk: '访谈',
    workshop: '工作坊',
    tour: '导览',
    event: '活动',
    register: '申请报名',
    visitTitle: '参观指南',
    visitQuery: '坐标: 37.4°N 126.9°E',
    address: '地址',
    addressVal: '京畿道安养市万安区艺术公园路180',
    hours: '参观时间',
    hoursVal: '10:00–18:00 (室外作品全天开放)',
    closed: '闭馆日',
    closedVal: '每周一 (室内场馆)',
    admissionLabel: '费用',
    admissionVal: '免费',
    transit: '公共交通',
    transitVal: '1号线安养站 → 社区巴士2路 · 4号线平村站3号出口',
    newsTitle: '最新动态',
    newsQuery: '最新更新',
    sponsorsTitle: '主办 · 承办 · 项目',
    hostedBy: '主办',
    organizedBy: '承办',
    project: '项目',
    archiveBack: '打开历届归档',
    copyright: '安养展馆 · 周二至周日 10:00–18:00 · 京畿道安养市万安区艺术公园路180 · 031-687-0548',
    privacy: '个人信息处理方针',
    close: '关闭',
    more: '查看更多',
    menuOpen: '全部菜单',
    menuClose: '关闭菜单'
  }
} as const;

// 1. Perspective Wireframe Grid & connected particle canvas (Lime Green & Electric Blue theme)
const WireframeCanvas = ({ accentColor = '#B4FF39' }: { accentColor?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);
    let isMobile = w < 768;

    const resize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
      isMobile = w < 768;
    };
    window.addEventListener('resize', resize);

    const hexToRgb = (hex: string) => {
      const m = hex.replace('#', '');
      return [
        parseInt(m.slice(0, 2), 16),
        parseInt(m.slice(2, 4), 16),
        parseInt(m.slice(4, 6), 16),
      ];
    };

    const N = isMobile ? 18 : 40;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * (isMobile ? 0.0003 : 0.0005),
      vy: (Math.random() - 0.5) * (isMobile ? 0.0003 : 0.0005),
    }));

    let raf: number;
    const draw = () => {
      const a = hexToRgb(accentColor);
      ctx.clearRect(0, 0, w, h);

      // 3D Perspective Grid (Using Electric Blue mixed with Lime)
      ctx.strokeStyle = `rgba(42,92,255,0.06)`;
      ctx.lineWidth = 1;
      const horizon = h * 0.4;

      const vLines = isMobile ? 10 : 20;
      for (let i = 0; i <= vLines; i++) {
        const x = (i / vLines) * w;
        ctx.beginPath();
        ctx.moveTo(w / 2 + (x - w / 2) * 0.15, horizon);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      const hLines = isMobile ? 6 : 12;
      for (let i = 1; i <= hLines; i++) {
        const t = i / hLines;
        const y = horizon + (h - horizon) * t * t;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Drift nodes & link lines (Lime Green)
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = (nodes[i].x - nodes[j].x) * w;
          const dy = (nodes[i].y - nodes[j].y) * h;
          const dist = Math.hypot(dx, dy);
          const maxDist = isMobile ? 110 : 150;
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(${a[0]},${a[1]},${a[2]},${0.12 * (1 - dist / maxDist)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.stroke();
          }
        }
      }

      // Draw small dot particles
      ctx.fillStyle = `rgba(${a[0]},${a[1]},${a[2]},0.45)`;
      nodes.forEach((n) => ctx.fillRect(n.x * w - 1, n.y * h - 1, 2, 2));

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [accentColor]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-0" />;
};

// 2. Typing animation component
const TypingPrompt = ({ text, delay = 25 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <p className="font-mono text-[11px] sm:text-xs tracking-wider text-[#B4FF39]">
      <span>{displayedText}</span>
      <span className="animate-[pulse_1s_infinite] text-[#B4FF39] font-bold">▌</span>
    </p>
  );
};

// 3. Text Decramble scramble effect on scroll
const DecryptedText = ({ text, delay = 35 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const elementRef = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered) {
        setTriggered(true);
      }
    }, { rootMargin: '0px 0px -10% 0px' });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const glyphs = '█▓▒░<>/\\_∆0123456789ABCDEF';
    let frame = 0;
    const total = 22;
    const interval = setInterval(() => {
      frame += 1;
      const reveal = Math.floor((frame / total) * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          out += ' ';
        } else if (i < reveal) {
          out += text[i];
        } else {
          out += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }
      setDisplayedText(out);
      if (frame >= total) {
        setDisplayedText(text);
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [triggered, text, delay]);

  return <span ref={elementRef}>{displayedText || text.replace(/[^\s]/g, '░')}</span>;
};

// 4. Image sweeping scan reveal card
const ScannedImageCard = ({
  src,
  alt,
  label,
  depth,
  delay = 0,
  mousePos,
}: {
  src: string;
  alt: string;
  label: string;
  depth: number;
  delay?: number;
  mousePos: { x: number; y: number };
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered) {
        setTriggered(true);
      }
    }, { rootMargin: '0px 0px -5% 0px' });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const timeout = setTimeout(() => {
      let p = 0;
      const interval = setInterval(() => {
        p = Math.min(100, p + Math.ceil(Math.random() * 8));
        setPercent(p);
        if (p >= 100) {
          clearInterval(interval);
        }
      }, 55);
    }, delay * 1000);
    return () => {};
  }, [triggered, delay]);

  // Parallax styling
  const d = depth * 400;
  const parallaxStyle = {
    transform: `translate(${-mousePos.x * d}px, ${-mousePos.y * d}px)`,
  };

  return (
    <div ref={containerRef} style={parallaxStyle} className="transition-transform duration-300 ease-out">
      <div className="relative overflow-hidden border border-[#B4FF39]/35 bg-[#04060A]">
        <img src={src} alt={alt} className="block w-full h-auto object-cover aspect-[4/3] sm:aspect-auto" />
        {percent < 100 && (
          <>
            <div 
              className="absolute inset-0 bg-[#04060A] transition-opacity duration-300"
              style={{ opacity: 1 - percent / 100 }}
            />
            <div 
              className="absolute left-0 right-0 h-[2px] bg-[#B4FF39] shadow-[0_0_16px_#B4FF39]"
              style={{ top: `${percent}%` }}
            />
          </>
        )}
      </div>
      <div className="flex justify-between mt-1.5 font-mono text-[9px] sm:text-[10px] text-[#5A7A85]">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
    </div>
  );
};

export default function SiteBPage({ params }: PageProps) {
  const { locale } = React.use(params) as { locale: Locale };
  const validLocale = (['ko', 'en', 'ja', 'zh'].includes(locale) ? locale : 'ko') as Locale;
  const t = dict[validLocale];

  // State Management
  const [region, setRegion] = useState<'all' | 'kr' | 'intl'>('all');
  const [category, setCategory] = useState<'all' | 'talk' | 'workshop' | 'tour' | 'event'>('all');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Refs
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax mouse move handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const dx = e.clientX / window.innerWidth - 0.5;
    const dy = e.clientY / window.innerHeight - 0.5;
    setMousePos({ x: dx, y: dy });
  };

  // Scroll spy & Header bg change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const sections = ['#about', '#artists', '#works', '#program', '#visit', '#news'];
      const probe = window.scrollY + window.innerHeight * 0.35;
      let active = '#hero';
      sections.forEach((id) => {
        const el = document.querySelector(id) as HTMLElement;
        if (el && el.offsetTop <= probe) {
          active = id;
        }
      });
      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleGoTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId) as HTMLElement;
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  // Artists mock data
  const artistsData = [
    {
      id: 1,
      name: { ko: '작가 A', en: 'Artist A', ja: '作家 A', zh: '艺术家 A' },
      nation: 'KR',
      region: 'kr',
      workTitle: { ko: '학습하는 정원', en: 'The Learning Garden', ja: '学習する庭園', zh: '学习的花园' },
      workSite: { ko: '안양예술공원', en: 'Anyang Art Park', ja: '安養芸術公園', zh: '安养艺术公园' },
      img: '/images/concept-b/1510ccbd-1274-4ea2-a7c4-ab4c94a49036.jpg',
      bio: {
        ko: 'AI 시스템과 도시 데이터를 매개로 공공 공간의 감각을 재구성하는 작업을 이어왔다. 이번 APAP 8에서는 안양의 장소 기억을 학습한 설치 작업을 선보인다.',
        en: 'Works with AI systems and urban data to reconfigure how public space is sensed. For APAP 8, presents an installation trained on the place-memories of Anyang.',
        ja: 'AIシステムと都市データを媒介に、公共空間의感覚を재구성하는 작업을 이어왔다. 이번 APAP 8에서는 안양의 장소 기억을 학습한 설치 작업을 선보인다.',
        zh: '持续通过人工智能系统和城市数据重构公共空间感知。在本次APAP 8中，将展示学习了安养场所记忆的装置作品。'
      }
    },
    {
      id: 2,
      name: { ko: '작가 B', en: 'Artist B', ja: '作家 B', zh: '艺术家 B' },
      nation: 'KR',
      region: 'kr',
      workTitle: { ko: '도시의 기억 장치', en: 'Urban Memory Unit', ja: '都市の記憶装置', zh: '城市的记忆装置' },
      workSite: { ko: '평촌중앙공원', en: 'Pyeongchon Central Park', ja: '平村中央公園', zh: '平村中央公园' },
      img: '/images/concept-b/f43e59c1-7592-41ed-8198-a436f0be1d54.jpg',
      bio: {
        ko: '도시 공간의 물리적 구조물과 가상의 레이어를 매핑하는 미디어 아티스트다. AI 모델이 기억하는 과거의 흔적을 투사하는 대형 기둥 형태의 작업을 준비했다.',
        en: 'A media artist mapping physical structures with virtual layers. Prepared a tower installation projecting trace memories of Anyang recorded by AI models.',
        ja: '도시 공간의 물리적 구조물과 가상의 레이어를 매핑하는 미디어 아티스트다. AI 모델이 기억하는 과거의 흔적을 투사하는 대형 기둥 형태의 작업을 준비했다.',
        zh: '融合都市物理结构与虚拟图层的媒体艺术家。创作了以大立柱投射AI模型记录的过去城市印记的装置。'
      }
    },
    {
      id: 3,
      name: { ko: 'Artist C', en: 'Artist C', ja: 'アーティスト C', zh: '艺术家 C' },
      nation: 'DE',
      region: 'intl',
      workTitle: { ko: 'Latent Plaza', en: 'Latent Plaza', ja: 'レイテントプラザ', zh: '潜在线性广场' },
      workSite: { ko: '안양파빌리온', en: 'Anyang Pavilion', ja: '安養パビリオン', zh: '安养展馆' },
      img: '/images/concept-b/a8810f8b-25d9-4949-bbe8-9cae98e189a2.jpg',
      bio: {
        ko: '잠재 공간 속 이미지를 생성하고 변형하는 인스톨레이션을 전문으로 한다. 안양파빌리온 내부에 안양시민들의 사운드스케이프를 가시화하는 인터랙티브 풀을 구현한다.',
        en: 'Specializes in generative space images and morphing installations. Realizes an interactive audio-visual pool visualizing soundscapes of Anyang citizens inside the pavilion.',
        ja: '潜在空間内のイメージを生成し変形するインスタレーションを専門とする。安養パビリオン内部に、安養市民のサウンドスクープを視覚化するインタラクティブなプールを実装する。',
        zh: '专长于生成式潜空间图像及变形装置。在安养展馆内部打造了可视化安养市民声景的互动声光池。'
      }
    },
    {
      id: 4,
      name: { ko: '작가 D', en: 'Artist D', ja: '作家 D', zh: '艺术家 D' },
      nation: 'KR',
      region: 'kr',
      workTitle: { ko: '천 개의 목소리', en: 'A Thousand Voices', ja: '千の歌声', zh: '千种声音' },
      workSite: { ko: '안양역 광장', en: 'Anyang Station Square', ja: '安養駅広場', zh: '安养站广场' },
      img: '/images/concept-b/b063889b-b5a2-43be-92d5-0a5d80731ef3.jpg',
      bio: {
        ko: '거리의 소음과 대화에서 데이터를 축적하여 거대 텍스트 네트워크를 시각화하는 설치 프로젝트를 진행한다. 안양역 일대의 라이브 텍스트 보드 형태로 띄워진다.',
        en: 'Collects street chatter and sounds to visualize massive text networks. Placed on an active live text panel displaying generative poetry around Anyang Station.',
        ja: '街のノイズや会話からデータを蓄積し、巨大なテキストネットワークを視覚化するインスタレーションプロジェクトを進行する。安養駅一帯にライブテキストボードの形式で掲示される。',
        zh: '收集街道杂音和对话数据并可视化大型文本网络。在安养站广场以实时动态电子面板的形式呈现生成诗歌。'
      }
    },
    {
      id: 5,
      name: { ko: 'Artist E', en: 'Artist E', ja: 'アーティスト E', zh: '艺术家 E' },
      nation: 'US',
      region: 'intl',
      workTitle: { ko: 'Weather Model', en: 'Weather Model', ja: 'ウェザーモデル', zh: '天气生成模型' },
      workSite: { ko: '학운공원', en: 'Haguun Park', ja: '鶴雲公園', zh: '鹤云公园' },
      img: '/images/concept-b/1a54f0b8-88f0-468f-a10d-491431a35c19.jpg',
      bio: {
        ko: '안양 학운공원에 날씨와 기계 기후 예측 데이터를 기반으로 구조물의 팽창과 수축을 제어하는 키네틱 아트 구조물을 구축하여 인간과 환경의 연결을 도모한다.',
        en: 'Builds a kinetic art structure in Haguun Park that expands and contracts based on meteorological predictive data, reflecting relationship between human and environment.',
        ja: '安養の鶴雲公園に、天気や機械の気候予測データを基に構造物の膨張と収縮を制御するキネティック・アート構造物を構築し、人間と環境のつながりを図る。',
        zh: '在安养鹤云公园建造了一座动力学艺术结构，根据气象预测数据控制结构的膨胀 and 收缩，以此连接人类与自然。'
      }
    },
    {
      id: 6,
      name: { ko: 'Artist F', en: 'Artist F', ja: 'アーティスト F', zh: '艺术家 F' },
      nation: 'JP',
      region: 'intl',
      workTitle: { ko: 'Slow Prediction', en: 'Slow Prediction', ja: 'スロー・プレディクション', zh: '慢速预测' },
      workSite: { ko: '안양천 산책로', en: 'Anyang Stream Walkway', ja: '安養川散歩道', zh: '安养川步道' },
      img: '/images/concept-b/8b5b3503-dbde-4f24-8ee9-bab0e19ce038.jpg',
      bio: {
        ko: '안양천 생태 흐름에 연동되는 디지털 투사 디바이스를 설치한다. 시냇물 소리와 바람의 결을 읽어 픽셀 드로잉을 강둑에 야간 투사하는 기계 유닛이다.',
        en: 'Deploys dynamic projection units along Anyang Stream syncing with ecological flow. Translates running water and wind currents into custom pixel canvas projected onto banks.',
        ja: '안양천 생태 흐름에 연동되는 디지털 투사 디바이스를 설치한다. 시냇물 소리와 바람의 결을 읽어 픽셀 드로잉을 강둑에 야간 투사하는 기계 유닛이다.',
        zh: '在安养川沿岸部署生态流动数字投影装置。通过读取河水流速和风势，将生成像素画夜间投射在河堤上。'
      }
    },
    {
      id: 7,
      name: { ko: '작가 G', en: 'Artist G', ja: '작가 G', zh: '艺术家 G' },
      nation: 'KR',
      region: 'kr',
      workTitle: { ko: '반려 신호등', en: 'Companion Traffic Light', ja: '伴侶信号機', zh: '伴侣信号灯' },
      workSite: { ko: '범계역 일대', en: 'Beomgye Station Area', ja: '凡渓駅一帯', zh: '凡溪站附近' },
      img: '/images/concept-b/1510ccbd-1274-4ea2-a7c4-ab4c94a49036.jpg',
      bio: {
        ko: '범계역 주변의 바쁜 도보 흐름을 센싱하여 신호 조명을 커스텀 애니메이션으로 전환하는 프로젝트로, 규칙적인 통제를 친화적인 리듬으로 교정한다.',
        en: 'A project sensing busy pedestrian flows near Beomgye Station to shift traffic lights into friendly animated loops, transforming structural control into artistic rhythm.',
        ja: '범계역 주변의 바쁜 도보 흐름을 센싱하여 신호 조명을 커스텀 애니메이션으로 전환하는 프로젝트로, 규칙적인 통제를 친화적인 리듬으로 교정한다.',
        zh: '感应凡溪站繁忙的步行流量，将交替的信号灯转化为温馨的动画循环，把规整的管理纠偏为艺术节奏。'
      }
    },
    {
      id: 8,
      name: { ko: 'Artist H', en: 'Artist H', ja: 'アーティスト H', zh: '艺术家 H' },
      nation: 'NL',
      region: 'intl',
      workTitle: { ko: 'Public Dataset', en: 'Public Dataset', ja: 'パブリックデータセット', zh: '公共数据集' },
      workSite: { ko: '평촌 학원가', en: 'Pyeongchon Academy Street', ja: '平村塾街', zh: '平村学院街' },
      img: '/images/concept-b/1a54f0b8-88f0-468f-a10d-491431a35c19.jpg',
      bio: {
        ko: '학생들의 학습 패턴 데이터를 수집하여 빛의 그라데이션으로 환원시키는 야외 발광 타일 설치 작업이다. 평촌 학원가의 보도블록에 내장된다.',
        en: 'An outdoor glowing pavement tile installation converting student study pattern logs into color gradients, embedded inside sidewalks of Academy Street.',
        ja: '학생들의 학습 패턴 데이터를 수집하여 빛의 그라데이션으로 환원시키는 야외 발광 타일 설치 작업이다. 평촌 학원가의 보도블록에 내장된다.',
        zh: '收集学生学习模式数据并转化为色彩渐变的发光地砖装置。嵌入平村学院街的人行道中。'
      }
    }
  ];

  // Programs mock data
  const programsData = [
    { date: '11.13', time: '17:00', cat: 'event', title: { ko: '개막식 & 개막 퍼포먼스', en: 'Opening Ceremony & Performance', ja: '開幕式 & 開幕パフォーマンス', zh: '开幕式与开幕表演' }, place: { ko: '안양예술공원', en: 'Anyang Art Park', ja: '安養芸術公園', zh: '安养艺术公园' } },
    { date: '11.14', time: '14:00', cat: 'talk', title: { ko: '아티스트 토크 — 기계와 함께 만들기', en: 'Artist Talk — Making with Machines', ja: 'アーティストトーク — 機械と共に創る', zh: '艺术家对谈——与机器共同创作' }, place: { ko: '안양파빌리온', en: 'Anyang Pavilion', ja: '安養パビリオン', zh: '安养展馆' } },
    { date: '11.21', time: '11:00', cat: 'tour', title: { ko: '도슨트 투어 — 예술공원 코스', en: 'Docent Tour — Art Park Route', ja: 'ガイドツアー — 芸術公園コース', zh: '导览参观——艺术公园路线' }, place: { ko: '안양예술공원', en: 'Anyang Art Park', ja: '安養芸術公園', zh: '安养艺术公园' } },
    { date: '11.28', time: '14:00', cat: 'workshop', title: { ko: '시민 워크숍 — 나의 도시 데이터 그리기', en: 'Citizen Workshop — Drawing My City Data', ja: 'Citizen Workshop', zh: '市民工作坊——描绘我的城市数据' }, place: { ko: '평촌중앙공원', en: 'Pyeongchon Central Park', ja: '平村中央公園', zh: '平村中央公园' } },
    { date: '12.05', time: '15:00', cat: 'talk', title: { ko: '라운드테이블 — 공공예술과 AI 윤리', en: 'Roundtable — Public Art & AI Ethics', ja: '座談会 — 公共芸術とAI倫理', zh: '圆桌会议——公共艺术与AI伦理' }, place: { ko: '안양파빌리온', en: 'Anyang Pavilion', ja: '安養パビリオン', zh: '安养展馆' } },
    { date: '12.12', time: '11:00', cat: 'tour', title: { ko: '도슨트 투어 — 평촌 코스', en: 'Docent Tour — Pyeongchon Route', ja: 'ガイドツアー — 平村コース', zh: '导览参观——平村路线' }, place: { ko: '평촌 일대', en: 'Pyeongchon Area', ja: '平村一帯', zh: '平村附近' } },
    { date: '12.19', time: '14:00', cat: 'workshop', title: { ko: '어린이 워크숍 — 로봇에게 그림 가르치기', en: 'Kids Workshop — Teaching a Robot to Draw', ja: '子供ワークショップ — ロボットに絵を教える', zh: '儿童工作坊——教机器人画画' }, place: { ko: '학운공원', en: 'Haguun Park', ja: '鶴雲公園', zh: 'Flux Park' } },
    { date: '12.20', time: '17:00', cat: 'event', title: { ko: '폐막 프로그램 — 도시의 대답', en: 'Closing Program — The City Replies', ja: '閉幕プログラム — 都市の答え', zh: '闭幕活动——城市的回答' }, place: { ko: '안양예술공원', en: 'Anyang Art Park', ja: '安養芸術公園', zh: '安养艺术公园' } }
  ];

  // News mock data
  const newsData = [
    { cat: 'NOTICE', date: '2026.07.01', title: { ko: 'APAP 8 참여 작가 1차 발표', en: 'APAP 8 first artist list announced', ja: 'APAP 8 参加アーティスト第1次発表', zh: 'APAP 8 参展艺术家第一批公布' } },
    { cat: 'PRESS', date: '2026.06.18', title: { ko: '제8회 안양공공예술프로젝트, 주제 "AI" 공개', en: 'APAP 8 reveals its theme: AI', ja: '第8回安養パブリックアートプロジェクト、テーマ「AI」公開', zh: '第八届安养公共艺术项目公布主题“AI”' } },
    { cat: 'NOTICE', date: '2026.06.02', title: { ko: '시민 도슨트 자원활동가 모집', en: 'Recruiting citizen docent volunteers', ja: '市民ガイド・ボランティア募集', zh: '招募市民志愿者导览员' } },
    { cat: 'PRESS', date: '2026.05.20', title: { ko: '예술감독 선임 발표', en: 'Artistic Director appointed', ja: '芸術監督の選任発表', zh: '艺术总监委任公告' } }
  ];

  // Works list
  const works = [
    { num: '01', title: { ko: '학습하는 정원', en: 'The Learning Garden', ja: '学習する庭園', zh: '学习的花园' }, artist: { ko: '작가 A', en: 'Artist A', ja: '작가 A', zh: '艺术家 A' }, site: { ko: '안양예술공원', en: 'Anyang Art Park', ja: '安養芸術公園', zh: '安养艺术公园' }, img: '/images/concept-b/1510ccbd-1274-4ea2-a7c4-ab4c94a49036.jpg' },
    { num: '02', title: { ko: 'Latent Plaza', en: 'Latent Plaza', ja: 'レイテントプラザ', zh: '潜在线性广场' }, artist: { ko: 'Artist C', en: 'Artist C', ja: 'アーティスト C', zh: '艺术家 C' }, site: { ko: '안양파빌리온', en: 'Anyang Pavilion', ja: '安養パビリオン', zh: '安养展馆' }, img: '/images/concept-b/a8810f8b-25d9-4949-bbe8-9cae98e189a2.jpg' },
    { num: '03', title: { ko: '천 개의 목소리', en: 'A Thousand Voices', ja: '千の歌声', zh: '千种声音' }, artist: { ko: '작가 D', en: 'Artist D', ja: '작가 D', zh: '艺术家 D' }, site: { ko: '안양역 광장', en: 'Anyang Station Square', ja: '安養駅広場', zh: '安养站广场' }, img: '/images/concept-b/b063889b-b5a2-43be-92d5-0a5d80731ef3.jpg' },
    { num: '04', title: { ko: 'Public Dataset', en: 'Public Dataset', ja: 'パbiblioc Dataset', zh: '公共数据集' }, artist: { ko: 'Artist H', en: 'Artist H', ja: 'アーティスト H', zh: '艺术家 H' }, site: { ko: '평촌 학원가', en: 'Pyeongchon Academy Street', ja: '平村塾街', zh: '平村学院街' }, img: '/images/concept-b/1a54f0b8-88f0-468f-a10d-491431a35c19.jpg' },
    { num: '05', title: { ko: '도시의 기억 장치', en: 'Urban Memory Unit', ja: '都市의 기억 장치', zh: '城市的记忆装置' }, artist: { ko: '작가 B', en: 'Artist B', ja: '작가 B', zh: '艺术家 B' }, site: { ko: '평촌중앙공원', en: 'Pyeongchon Central Park', ja: '平村中央公園', zh: '平村中央公园' }, img: '/images/concept-b/f43e59c1-7592-41ed-8198-a436f0be1d54.jpg' },
    { num: '06', title: { ko: 'Slow Prediction', en: 'Slow Prediction', ja: 'スロー・プレディクション', zh: '慢速预测' }, artist: { ko: 'Artist F', en: 'Artist F', ja: 'アーティスト F', zh: '艺术家 F' }, site: { ko: '안양천 산책로', en: 'Anyang Stream Walkway', ja: '安養川散歩道', zh: '安养川步道' }, img: '/images/concept-b/8b5b3503-dbde-4f24-8ee9-bab0e19ce038.jpg' }
  ];

  // Filtering Logic
  const filteredArtists = artistsData
    .filter((a) => region === 'all' || a.region === region)
    .map((a) => ({
      ...a,
      displayName: a.name[validLocale],
      displayWorkTitle: a.workTitle[validLocale],
      displayWorkSite: a.workSite[validLocale],
    }));

  const selectedArtist = artistsData.find((a) => a.id === selectedId);

  const filteredPrograms = programsData
    .filter((p) => category === 'all' || p.cat === category)
    .map((p) => ({
      ...p,
      displayTitle: p.title[validLocale],
      displayPlace: p.place[validLocale],
    }));

  const navItems = [
    { href: '#about', label: 'About', num: '01' },
    { href: '#artists', label: 'Artists', num: '02' },
    { href: '#works', label: 'Works', num: '03' },
    { href: '#program', label: 'Program', num: '04' },
    { href: '#visit', label: 'Visit', num: '05' },
    { href: '#news', label: 'News', num: '06' },
  ];

  // Region & Category Switch CSS styles helper
  const tabStyle = (active: boolean) => ({
    background: active ? '#B4FF39' : 'none',
    border: `1px solid ${active ? '#B4FF39' : 'rgba(180,255,57,0.3)'}`,
    color: active ? '#04060A' : '#EAF2F5',
  });

  return (
    <div 
      className="min-h-screen bg-[#04060A] text-[#EAF2F5] font-sans overflow-x-hidden selection:bg-[#B4FF39]/20 selection:text-[#B4FF39] relative"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Canvas Background */}
      <WireframeCanvas accentColor="#B4FF39" />

      {/* 2. Fixed Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 border-b border-[#B4FF39]/10 ${
          scrolled || menuOpen ? 'bg-[#04060A]/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Link 
          href={`/site-b/${validLocale}`} 
          className="font-mono font-bold text-lg tracking-wider text-white select-none hover:text-[#B4FF39] transition-colors"
        >
          APAP_8<span className="text-[#B4FF39] animate-pulse">▌</span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-sm">
            {navItems.map((ni) => (
              <a
                key={ni.href}
                href={ni.href}
                onClick={(e) => handleGoTo(e, ni.href)}
                className={`transition-colors py-1 ${
                  activeSection === ni.href ? 'text-[#B4FF39]' : 'text-[#C4D6DD] hover:text-[#B4FF39]'
                }`}
              >
                {ni.label}
              </a>
            ))}
          </nav>

          {/* Lang Selector */}
          <div className="flex border border-[#B4FF39]/25 rounded-sm overflow-hidden text-[10px] font-mono bg-black/40">
            {(['ko', 'en'] as const).map((loc) => (
              <Link
                key={loc}
                href={`/site-b/${loc}`}
                className={`px-2 py-1 uppercase transition-colors ${
                  validLocale === loc
                    ? 'bg-[#B4FF39]/20 text-[#B4FF39] font-bold'
                    : 'text-white/40 hover:text-[#B4FF39] hover:bg-white/5'
                }`}
              >
                {loc}
              </Link>
            ))}
          </div>

          {/* Menu button for Mobile GNB */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-8 border border-[#B4FF39]/25 bg-black/20 text-[#EAF2F5] cursor-pointer hover:border-[#B4FF39] transition-colors"
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 3. Mobile GNB Overlay Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#04060A]/98 backdrop-blur-xl flex flex-col justify-center px-8 py-20"
          >
            <nav className="flex flex-col gap-6 font-mono">
              {navItems.map((ni) => (
                <a
                  key={ni.href}
                  href={ni.href}
                  onClick={(e) => handleGoTo(e, ni.href)}
                  className="flex items-baseline gap-4 py-3 border-b border-[#B4FF39]/10 text-white"
                >
                  <span className="font-mono text-xs text-[#B4FF39] min-w-8">{ni.num}</span>
                  <span className="text-3xl font-bold hover:text-[#B4FF39] transition-colors">{ni.label}</span>
                </a>
              ))}
            </nav>
            <div className="mt-12 font-mono text-[10px] text-[#4A6570] tracking-wider">
              ANYANG PUBLIC ART PROJECT — 8TH EDITION
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center pt-24 pb-16 px-6 sm:px-12 md:px-24 overflow-hidden z-10"
        ref={heroRef}
      >
        {/* Floating Generated Images (Mouse Parallax) */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
          <div className="absolute top-[12%] right-[6%] w-[26vw] max-w-[340px]">
            <ScannedImageCard
              src="/images/concept-b/88845ae5-620d-4323-bfb3-b459e0dd9754.jpg"
              alt="안양파빌리온"
              label="anyang_pavilion.png"
              depth={0.03}
              delay={0}
              mousePos={mousePos}
            />
          </div>
          <div className="absolute top-[52%] right-[22%] w-[18vw] max-w-[230px]">
            <ScannedImageCard
              src="/images/concept-b/b063889b-b5a2-43be-92d5-0a5d80731ef3.jpg"
              alt="공공 설치 작품"
              label="public_work_04.png"
              depth={0.06}
              delay={0.6}
              mousePos={mousePos}
            />
          </div>
          <div className="absolute bottom-[10%] right-[3%] w-[15vw] max-w-[200px]">
            <ScannedImageCard
              src="/images/concept-b/f43e59c1-7592-41ed-8198-a436f0be1d54.jpg"
              alt="설치 작품"
              label="spiral_structure.png"
              depth={0.045}
              delay={1.2}
              mousePos={mousePos}
            />
          </div>
        </div>

        {/* Hero Copy */}
        <div className="relative max-w-4xl w-full mx-auto z-10 flex flex-col items-start gap-4">
          <TypingPrompt text={t.heroPrompt} />

          <h1 className="font-bold font-mono tracking-tight leading-none text-white text-[15vw] sm:text-[10vw]">
            <DecryptedText text={t.heroTitle} />
          </h1>
          
          <p className="font-semibold tracking-widest text-[#B4FF39] text-sm sm:text-2xl mt-2 select-none uppercase">
            <DecryptedText text={t.heroSubtitle} />
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-10 pt-6 border-t border-[#B4FF39]/20 font-mono text-xs sm:text-sm text-[#8FAAB5]">
            <div>
              <span className="text-[#4A6570] block mb-1">DATE</span>
              {t.date.split(': ')[1] || t.date}
            </div>
            <div>
              <span className="text-[#4A6570] block mb-1">SITE</span>
              {t.site.split(': ')[1] || t.site}
            </div>
            <div>
              <span className="text-[#4A6570] block mb-1">EDITION</span>
              {t.edition.split(': ')[1] || t.edition}
            </div>
            <div>
              <span className="text-[#4A6570] block mb-1">ADMISSION</span>
              {t.admission.split(': ')[1] || t.admission}
            </div>
          </div>
        </div>
      </section>

      {/* 5. About Section */}
      <section id="about" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto z-10 border-t border-[#B4FF39]/10">
        <p className="font-mono text-xs text-[#B4FF39] tracking-wider mb-8">[01] ABOUT — {t.aboutQuery}</p>
        
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5">
            <h2 className="text-xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
              <DecryptedText text={t.aboutTitle} />
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col gap-6 text-sm sm:text-base leading-relaxed text-[#B8CBD3]">
            <p>{t.aboutDesc1}</p>
            <p>{t.aboutDesc2}</p>
            <div className="font-mono text-[10px] text-[#4A6570] border border-[#B4FF39]/15 px-4 py-3 bg-black/20 mt-4">
              model: apap-8-public · temperature: 0.8 · seed: 20261113
            </div>
          </div>
        </div>

        {/* Artistic Director Card */}
        <div className="grid md:grid-cols-12 gap-6 mt-20 items-center border border-[#B4FF39]/15 p-6 sm:p-10 bg-[#B4FF39]/[0.02] rounded-md">
          <div className="md:col-span-3 max-w-[200px] md:max-w-none mx-auto relative overflow-hidden border border-[#B4FF39]/25">
            <img src="/images/concept-b/9c0e4744-42e5-48c2-a691-864de0d19bad.jpg" alt="Artistic Director" className="block w-full h-auto" />
          </div>
          <div className="md:col-span-9 flex flex-col gap-3">
            <p className="text-base sm:text-lg italic text-[#D5E4EA] font-light leading-relaxed">
              {t.directorBio}
            </p>
            <p className="font-mono text-xs text-[#5A7A85] uppercase">
              {t.directorTitle} — APAP 8 TEAM
            </p>
          </div>
        </div>
      </section>

      {/* 6. Artists Section */}
      <section id="artists" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto z-10 border-t border-[#B4FF39]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs text-[#B4FF39] tracking-wider mb-2">[02] ARTISTS — {t.artistsQuery}</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              <DecryptedText text={t.artistsTitle} />
            </h2>
          </div>

          {/* Region Tabs */}
          <div className="flex gap-2">
            {(['all', 'kr', 'intl'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                style={tabStyle(region === r)}
                className="px-4 py-2 font-mono text-xs uppercase cursor-pointer transition-all rounded-sm"
              >
                {t[r]}
              </button>
            ))}
          </div>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <button
              key={artist.id}
              onClick={() => setSelectedId(artist.id)}
              className="group block text-left bg-black/40 border border-[#B4FF39]/15 hover:border-[#B4FF39] transition-all cursor-pointer rounded-sm overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 border-b border-[#B4FF39]/10">
                <img 
                  src={artist.img} 
                  alt={artist.displayName} 
                  className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <div className="p-4 flex flex-col gap-1 bg-[#04060A]/60">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="font-bold text-base text-white tracking-tight group-hover:text-[#B4FF39] transition-colors">
                    {artist.displayName}
                  </span>
                  <span className="font-mono text-[10px] text-[#B4FF39]">{artist.nation}</span>
                </div>
                <span className="font-mono text-[10px] text-[#5A7A85] truncate">
                  「{artist.displayWorkTitle}」 @ {artist.displayWorkSite}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Artist Details Popup Modal */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 bg-[#04060A]/85 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#070B12] border border-[#B4FF39]/30 p-6 sm:p-10 max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-sm relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 border border-[#B4FF39]/30 text-white cursor-pointer hover:border-[#B4FF39] hover:text-[#B4FF39] transition-all font-mono text-sm"
                aria-label={t.close}
              >
                ×
              </button>

              <span className="font-mono text-[10px] text-[#B4FF39] tracking-wider block mb-1">
                RECORD #{selectedArtist.id} · {selectedArtist.nation}
              </span>
              
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-6">
                {selectedArtist.name[validLocale]}
              </h3>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="aspect-[4/3] overflow-hidden border border-[#B4FF39]/20 rounded-sm">
                  <img src={selectedArtist.img} alt={selectedArtist.name[validLocale]} className="block w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-[#B8CBD3] text-sm sm:text-base leading-relaxed">
                    {selectedArtist.bio[validLocale]}
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="font-bold text-white block mb-1 text-sm">
                      {selectedArtist.workTitle[validLocale]}
                    </span>
                    <span className="font-mono text-xs text-[#5A7A85]">
                      — {selectedArtist.workSite[validLocale]}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. Works Section */}
      <section id="works" className="relative py-24 overflow-hidden z-10 border-t border-[#B4FF39]/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12">
          <p className="font-mono text-xs text-[#B4FF39] tracking-wider mb-2">[03] WORKS — {t.worksQuery}</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            <DecryptedText text={t.worksTitle} />
          </h2>
        </div>

        {/* Works Horizontal Swipe Container */}
        <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x hide-scrollbar px-6 md:px-12 max-w-6xl mx-auto">
          {works.map((w, index) => (
            <article 
              key={index} 
              className="flex-shrink-0 w-[280px] sm:w-[380px] snap-start bg-[#04060A]/40 border border-[#B4FF39]/15 hover:border-[#B4FF39] transition-all p-3 rounded-sm group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-[#B4FF39]/10 bg-zinc-900 mb-4">
                <img 
                  src={w.img} 
                  alt={w.title[validLocale]} 
                  className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <span className="absolute top-3 left-3 font-mono text-[9px] text-[#B4FF39] bg-[#04060A]/85 border border-[#B4FF39]/40 px-2 py-0.5">
                  {w.site[validLocale]}
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-4 px-1">
                <h3 className="font-bold text-base text-white truncate">{w.title[validLocale]}</h3>
                <span className="font-mono text-[10px] text-[#5A7A85]">{w.num}/06</span>
              </div>
              <p className="font-mono text-[11px] text-[#5A7A85] mt-1 px-1">
                {w.artist[validLocale]}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 8. Program Section */}
      <section id="program" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto z-10 border-t border-[#B4FF39]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs text-[#B4FF39] tracking-wider mb-2">[04] PROGRAM — {t.programQuery}</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              <DecryptedText text={t.programTitle} />
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'talk', 'workshop', 'tour', 'event'] as const).map((catKey) => (
              <button
                key={catKey}
                onClick={() => setCategory(catKey)}
                style={tabStyle(category === catKey)}
                className="px-3.5 py-1.5 font-mono text-xs uppercase cursor-pointer transition-all rounded-sm"
              >
                {t[catKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Programs List */}
        <div className="border-t border-[#B4FF39]/20 divide-y divide-[#B4FF39]/10">
          {filteredPrograms.map((pg, index) => (
            <div 
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center hover:bg-[#B4FF39]/[0.01] px-2 transition-colors duration-300"
            >
              <div className="md:col-span-2 font-mono">
                <div className="text-2xl font-bold text-[#B4FF39]">{pg.date}</div>
                <div className="text-xs text-[#4A6570]">{pg.time}</div>
              </div>
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="font-mono text-[9px] text-[#B4FF39] border border-[#B4FF39]/40 px-2 py-0.5 uppercase bg-[#B4FF39]/5">
                    {t[pg.cat as 'talk' | 'workshop' | 'tour' | 'event']}
                  </span>
                  <span className="font-mono text-xs text-[#4A6570]">{pg.displayPlace}</span>
                </div>
                <div className="text-lg font-semibold text-white tracking-tight">
                  {pg.displayTitle}
                </div>
              </div>
              <div className="md:col-span-2 md:text-right">
                <button className="border border-[#B4FF39]/35 hover:border-[#B4FF39] bg-transparent text-[#EAF2F5] hover:bg-[#B4FF39] hover:text-[#04060A] px-5 py-2 font-semibold text-xs transition-all tracking-wider font-mono cursor-pointer rounded-sm">
                  {t.register}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Visit Section */}
      <section id="visit" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto z-10 border-t border-[#B4FF39]/10">
        <p className="font-mono text-xs text-[#B4FF39] tracking-wider mb-2">[05] VISIT — {t.visitQuery}</p>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-12">
          <DecryptedText text={t.visitTitle} />
        </h2>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Embedded Google Maps */}
          <div className="md:col-span-6 aspect-video md:aspect-[4/3] border border-[#B4FF39]/20 overflow-hidden bg-black/40 rounded-sm">
            <iframe 
              title="APAP Map" 
              src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EC%98%88%EC%88%A0%EA%B3%B5%EC%9B%90%EB%A1%9C%20180&amp;z=15&amp;output=embed" 
              className="block w-full h-full border-none grayscale invert contrast-90 brightness-[0.85]"
            />
          </div>

          {/* Details list */}
          <div className="md:col-span-6 border-t border-[#B4FF39]/20 divide-y divide-[#B4FF39]/10 text-sm">
            <div className="grid grid-cols-3 py-4 gap-4">
              <span className="text-[#5A7A85] font-mono text-xs uppercase">{t.address}</span>
              <span className="col-span-2 text-white">{t.addressVal}</span>
            </div>
            <div className="grid grid-cols-3 py-4 gap-4">
              <span className="text-[#5A7A85] font-mono text-xs uppercase">{t.hours}</span>
              <span className="col-span-2 text-white">{t.hoursVal}</span>
            </div>
            <div className="grid grid-cols-3 py-4 gap-4">
              <span className="text-[#5A7A85] font-mono text-xs uppercase">{t.closed}</span>
              <span className="col-span-2 text-white">{t.closedVal}</span>
            </div>
            <div className="grid grid-cols-3 py-4 gap-4">
              <span className="text-[#5A7A85] font-mono text-xs uppercase">{t.admissionLabel}</span>
              <span className="col-span-2 text-[#B4FF39] font-bold">{t.admissionVal}</span>
            </div>
            <div className="grid grid-cols-3 py-4 gap-4">
              <span className="text-[#5A7A85] font-mono text-xs uppercase">{t.transit}</span>
              <span className="col-span-2 text-[#B8CBD3] leading-relaxed">{t.transitVal}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. News Section */}
      <section id="news" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto z-10 border-t border-[#B4FF39]/10">
        <p className="font-mono text-xs text-[#B4FF39] tracking-wider mb-2">[06] NEWS — {t.newsQuery}</p>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-12">
          <DecryptedText text={t.newsTitle} />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newsData.map((n, index) => (
            <a
              key={index}
              href={`/site-b/${validLocale}`}
              className="block bg-[#B4FF39]/[0.01] hover:bg-[#B4FF39]/[0.03] border border-[#B4FF39]/15 hover:border-[#B4FF39] p-6 transition-all rounded-sm flex flex-col justify-between gap-12 group cursor-pointer"
            >
              <div className="flex justify-between items-center font-mono text-[10px] text-[#5A7A85]">
                <span className="text-[#B4FF39] font-bold">{n.cat}</span>
                <span>{n.date}</span>
              </div>
              <h3 className="text-base font-semibold leading-snug text-[#EAF2F5] group-hover:text-white transition-colors duration-300">
                {n.title[validLocale]}
              </h3>
            </a>
          ))}
        </div>
      </section>

      {/* 11. Sponsors Section */}
      <section id="sponsors" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto z-10 border-t border-[#B4FF39]/10">
        <p className="font-mono text-xs text-[#5A7A85] tracking-wider mb-10 uppercase">{t.sponsorsTitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[#B4FF39]/15 p-6 bg-black/30 rounded-sm flex flex-col gap-4">
            <span className="font-mono text-[10px] text-[#5A7A85] tracking-widest uppercase">{t.hostedBy}</span>
            <div className="bg-white h-20 flex items-center justify-center p-4 rounded-sm">
              <img src="/images/concept-b/ccf2093a-c7be-4fd4-8bc2-1aabfa910b1d.jpg" alt="안양시" className="max-h-12 max-w-full object-contain filter grayscale" />
            </div>
          </div>
          <div className="border border-[#B4FF39]/15 p-6 bg-black/30 rounded-sm flex flex-col gap-4">
            <span className="font-mono text-[10px] text-[#5A7A85] tracking-widest uppercase">{t.organizedBy}</span>
            <div className="bg-white h-20 flex items-center justify-center p-4 rounded-sm">
              <img src="/images/concept-b/296b8365-65a3-45d5-999f-b7d31030a90a.jpg" alt="안양문화예술재단" className="max-h-12 max-w-full object-contain filter grayscale" />
            </div>
          </div>
          <div className="border border-[#B4FF39]/15 p-6 bg-black/30 rounded-sm flex flex-col gap-4">
            <span className="font-mono text-[10px] text-[#5A7A85] tracking-widest uppercase">{t.project}</span>
            <div className="bg-white h-20 flex items-center justify-center p-4 rounded-sm">
              <img src="/images/concept-b/edc83147-886b-44b4-abb9-fb02e4c61b67.jpg" alt="APAP" className="max-h-12 max-w-full object-contain filter grayscale" />
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="relative z-10 border-t border-[#B4FF39]/20 bg-[#04060A] pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-[#B4FF39]/12">
            <div>
              <p className="font-mono text-[10px] text-[#B4FF39] tracking-wider mb-2">&gt; {t.archiveBack}</p>
              <Link 
                href={`/archive/${validLocale}`}
                className="font-mono text-2xl sm:text-4xl font-bold text-white hover:text-[#B4FF39] transition-colors tracking-tight block"
              >
                APAP ARCHIVE ↗
              </Link>
            </div>
            
            {/* Socials */}
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 border border-[#B4FF39]/25 hover:border-[#B4FF39] rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none"></circle></svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 border border-[#B4FF39]/25 hover:border-[#B4FF39] rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2.5" y="6" width="19" height="12.5" rx="3.5"></rect><path d="M10.2 9.7 15 12.2l-4.8 2.5z" fill="currentColor" stroke="none"></path></svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 border border-[#B4FF39]/25 hover:border-[#B4FF39] rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.5 8.5V6.8c0-.9.6-1.3 1.4-1.3h1.6V2.6h-2.6c-2.4 0-3.9 1.6-3.9 4v1.9H8.5v3h2.5V21h3.5v-9.5h2.6l.4-3z"></path></svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6 font-mono text-xs text-[#5A7A85] leading-relaxed">
            <p>{t.copyright}</p>
            <div className="flex gap-6 items-center">
              <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
              <span>© 2026 APAP</span>
            </div>
          </div>

          {/* Large bottom transparent banner */}
          <div aria-hidden="true" className="w-full text-center overflow-hidden h-28 hidden sm:block relative">
            <div className="font-mono text-[90px] md:text-[140px] font-bold tracking-widest text-transparent pointer-events-none select-none absolute left-1/2 -translate-x-1/2 top-4 w-full" style={{ WebkitTextStroke: '1px rgba(180,255,57,0.08)' }}>
              APAP_8 — 2026
            </div>
          </div>
        </div>
      </footer>

      {/* 컨셉 선택용 플로팅 위젯 */}
      <ConceptSwitcher locale={validLocale} />
    </div>
  );
}
