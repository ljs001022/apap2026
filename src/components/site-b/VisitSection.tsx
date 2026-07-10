'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Compass } from 'lucide-react';

interface VisitProps {
  t: (key: string) => string;
  locale: string;
}

export default function VisitSection({ t, locale }: VisitProps) {
  return (
    <section id="visit" className="py-24 md:py-32 px-6 border-t border-white/5 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase block">Guideline</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">{t('visitTitle')}</h2>
            </div>
            
            <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
              {t('visitDesc')}
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 bg-white/[0.02] border border-white/5 p-5 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/5 rounded-full text-white/80">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-white/90 leading-snug">
                  {locale === 'ko' ? '경기 안양시 만안구 예술공원로 103 일대' : locale === 'en' ? '103 Arts Park Road, Manan-gu, Anyang, Gyeonggi' : locale === 'ja' ? '京畿道安養市万安区芸術公園路103一帯' : '京畿道安养市万安区艺术公园路103一带'}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 bg-white/[0.02] border border-white/5 p-5 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-white/5 rounded-full text-white/80">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-white/90 leading-snug">
                  {locale === 'ko' ? '야외 전시 상시 개방 (일부 야간 점등)' : locale === 'en' ? 'Outdoor installation always open (night lighting active)' : locale === 'ja' ? '屋外展示常時開放 (一部夜間点灯)' : '户外展区常年开放（部分夜间点亮）'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border border-white/10 rounded-3xl h-[300px] md:h-[400px] relative overflow-hidden bg-black"
          >
            <iframe 
              src="https://maps.google.com/maps?q=%EC%95%88%EC%96%91%ED%8C%8C%EB%B9%8C%EB%A6%AC%EC%98%A8&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }} // Premium Dark Theme filter for map
              allowFullScreen={false} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Anyang Pavilion Map"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
