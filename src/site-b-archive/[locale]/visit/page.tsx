import React from 'react';
import { MapPin, Clock, ShieldCheck, Bus } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function VisitPage({ params }: PageProps) {
  const { locale } = await params;

  const t = {
    ko: {
      title: '관람 및 방문 안내',
      subtitle: 'Visit Info & Directions',
      desc: '안양공공예술프로젝트(APAP)의 거점 전시장 및 야외 미술공원 오시는 길과 관람 상세 안내입니다.',
      pavilionTitle: '안양파빌리온 (실내 상설관)',
      pavilionDesc: '전시 도록 아카이브, 세미나, 실내 전시가 상시 운영되는 공공예술의 핵심 거점입니다.',
      addressLabel: '주소',
      addressVal: '경기도 안양시 만안구 예술공원로 180 (안양파빌리온)',
      hoursLabel: '관람 시간',
      hoursVal: '화요일 ~ 일요일 10:00 - 18:00 (매주 월요일 휴관)',
      admissionLabel: '관람 요금',
      admissionVal: '무료',
      transitTitle: '대중교통 오시는 길',
      subwayLabel: '지하철 연계',
      subwayVal: '1호선 관악역 또는 안양역 하차',
      busLabel: '버스 탑승',
      busVal: '안양역 1번 출구 건너편에서 마을버스 2번 탑승 → 안양예술공원 종점 하차',
    },
    en: {
      title: 'Visit Information & Directions',
      subtitle: 'Visit Info & Directions',
      desc: 'Information regarding hours, tickets, and coordinates of APAP outdoor art parks and the Pavilion.',
      pavilionTitle: 'Anyang Pavilion (Indoor Hub)',
      pavilionDesc: 'A central platform hosting exhibition files, catalog archives, and public forums.',
      addressLabel: 'Address',
      addressVal: '180 Yesulgongwon-ro, Manan-gu, Anyang-si, Gyeonggi-do (Anyang Pavilion)',
      hoursLabel: 'Hours',
      hoursVal: 'Tuesday – Sunday 10:00 - 18:00 (Closed on Mondays)',
      admissionLabel: 'Admission',
      admissionVal: 'Free',
      transitTitle: 'Public Transportation',
      subwayLabel: 'Subway',
      subwayVal: 'Line 1 Gwanak Station or Anyang Station',
      busLabel: 'Bus connection',
      busVal: 'Line 1 Anyang Stn. Exit 1 → Board Town Bus 2 → Get off at Anyang Art Park terminal.',
    }
  }[locale === 'ko' ? 'ko' : 'en'];

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t.title}</h1>
          <p className="text-sm font-mono text-blue-600 mt-1 uppercase tracking-wider">{t.subtitle}</p>
          <p className="text-sm text-slate-500 mt-3 font-light">{t.desc}</p>
        </div>

        {/* Map iframe */}
        <div className="aspect-video border border-slate-200 overflow-hidden bg-white rounded-2xl shadow-sm">
          <iframe
            title="APAP Map"
            src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EC%98%88%EC%88%A0%EA%B3%B5%EC%9B%90%EB%A1%9C%20180&amp;z=15&amp;output=embed"
            className="block w-full h-full border-none contrast-95 grayscale"
          />
        </div>

        {/* Details list */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Main Info */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2">{t.pavilionTitle}</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-light">{t.pavilionDesc}</p>
            
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block">{t.addressLabel}</span>
                  <span className="text-slate-600">{t.addressVal}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block">{t.hoursLabel}</span>
                  <span className="text-slate-600">{t.hoursVal}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-700 block">{t.admissionLabel}</span>
                  <span className="text-blue-600 font-bold">{t.admissionVal}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transit Info */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            <h3 className="font-bold text-blue-400 text-lg border-b border-slate-800 pb-2 flex items-center gap-2">
              <Bus className="w-5 h-5" /> {t.transitTitle}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  {t.subwayLabel}
                </span>
                <p className="text-slate-200 leading-snug">{t.subwayVal}</p>
              </div>
              <div className="space-y-1 border-t border-slate-800 pt-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  {t.busLabel}
                </span>
                <p className="text-slate-200 leading-relaxed font-light">{t.busVal}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
