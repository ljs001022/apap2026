import React from 'react';
import { MapPin, Info, Clock } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PavilionPage({ params }: PageProps) {
  const { locale } = await params;

  const t = {
    ko: {
      title: '안양파빌리온',
      subtitle: 'Anyang Pavilion',
      desc1: '안양파빌리온은 포르투갈의 거장 건축가 알바로 시자(Álvaro Siza)가 아시아에서 처음으로 디자인한 공공 건축물입니다.',
      desc2: '독특한 비정형 곡선 노출콘크리트 구조로 설계되어 자연광이 신비롭게 내부로 유입되며, 현재는 안양공공예술프로젝트(APAP)의 상설 아카이브 센터 및 도서관으로 운영되고 있습니다.',
      addressLabel: '위치',
      addressVal: '경기도 안양시 만안구 예술공원로 180 (안양예술공원 내)',
      hoursLabel: '운영 시간',
      hoursVal: '화요일 ~ 일요일 10:00 - 18:00 (매주 월요일 휴관)',
      admissionLabel: '관람료',
      admissionVal: '무료',
      featureTitle: '건축적 특징',
      feature1: '자연과의 조화: 지형의 고저차를 이용해 지면에서 솟아난 듯한 형상',
      feature2: '빛의 기하학: 실내 기둥 없이 굴곡진 벽체와 천장의 천창을 통한 간접광 확보',
      feature3: '가변적 공간: 전시, 독서, 세미나 등 다양한 공공 행사를 포용하는 가변형 공간 구성'
    },
    en: {
      title: 'Anyang Pavilion',
      subtitle: 'Anyang Pavilion',
      desc1: 'Anyang Pavilion is the first public building in Asia designed by the legendary Portuguese architect Álvaro Siza.',
      desc2: 'Constructed with unique, organic exposed concrete curves, it allows natural light to dynamically enter the space. Today, it serves as the permanent archive hub and public library for the Anyang Public Art Project (APAP).',
      addressLabel: 'Location',
      addressVal: '180 Yesulgongwon-ro, Manan-gu, Anyang-si (Inside Anyang Art Park)',
      hoursLabel: 'Hours',
      hoursVal: 'Tuesday – Sunday 10:00 - 18:00 (Closed on Mondays)',
      admissionLabel: 'Admission',
      admissionVal: 'Free',
      featureTitle: 'Architectural Features',
      feature1: 'Harmony with Nature: Designed to emerge naturally from the park topography.',
      feature2: 'Geometry of Light: Pillarless interior utilizing curving concrete walls and skylights.',
      feature3: 'Flexible Space: Reconfigurable layouts hosting exhibitions, readings, and community forums.'
    }
  }[locale === 'ko' ? 'ko' : 'en'];

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
          <p className="text-sm font-mono text-blue-600 mt-1 uppercase tracking-wider">{t.subtitle}</p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed font-light">{t.desc1}</p>
            <p className="text-slate-600 leading-relaxed">{t.desc2}</p>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 mt-8">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">{t.featureTitle}</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{t.feature1}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{t.feature2}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{t.feature3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md space-y-6">
            <div>
              <span className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-1.5">
                <MapPin className="w-3.5 h-3.5" /> {t.addressLabel}
              </span>
              <p className="text-sm text-slate-200 leading-snug">{t.addressVal}</p>
            </div>
            <div className="border-t border-slate-800 pt-4">
              <span className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-1.5">
                <Clock className="w-3.5 h-3.5" /> {t.hoursLabel}
              </span>
              <p className="text-sm text-slate-200">{t.hoursVal}</p>
            </div>
            <div className="border-t border-slate-800 pt-4">
              <span className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-1.5">
                <Info className="w-3.5 h-3.5" /> {t.admissionLabel}
              </span>
              <p className="text-lg font-bold text-blue-400">{t.admissionVal}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
