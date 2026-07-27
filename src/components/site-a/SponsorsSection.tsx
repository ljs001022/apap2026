'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SponsorsSection() {
  // Using placeholder blocks for logos
  const logos = Array.from({ length: 8 }, (_, i) => `PARTNER ${i + 1}`);

  return (
    <section id="sponsors" className="py-24 px-6 border-t border-white/5 relative bg-transparent overflow-hidden">
      <div className="container mx-auto max-w-6xl space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3"
        >
          <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase block">Supported By</span>
          <h2 className="text-xl md:text-2xl font-bold uppercase text-white/80">Sponsors & Partners</h2>
        </motion.div>

        {/* Infinite Logo Marquee */}
        <div className="relative w-full flex overflow-x-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
            className="flex flex-nowrap gap-12 items-center w-max"
          >
            {[...logos, ...logos].map((logo, idx) => (
              <div 
                key={idx} 
                className="w-32 h-16 bg-white/5 border border-white/10 flex items-center justify-center rounded-lg backdrop-blur-sm grayscale opacity-50 hover:opacity-100 transition-opacity"
              >
                <span className="text-[10px] font-mono font-bold text-white/60 tracking-widest">{logo}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
