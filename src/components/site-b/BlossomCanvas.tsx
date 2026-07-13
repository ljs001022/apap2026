'use client';

import React, { useRef, useEffect } from 'react';

export default function BlossomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);
    const isMobile = w < 768;

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle settings
    // 1. Peach Blossom Petals (Reduced on mobile for performance)
    const petalCount = isMobile ? 15 : 35;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 4 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.5,
      speedX: 0.4 + Math.random() * 0.8, // drift rightwards
      speedY: 0.3 + Math.random() * 0.6, // drift downwards
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.015,
      waveOffset: Math.random() * Math.PI * 2,
      waveSpeed: 0.005 + Math.random() * 0.01,
    }));

    // 2. Emerald Spirit/Mist particles (Reduced on mobile for performance)
    const mistCount = isMobile ? 8 : 20;
    const mists = Array.from({ length: mistCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: 20 + Math.random() * 40,
      opacity: 0.05 + Math.random() * 0.12,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      pulseSpeed: 0.003 + Math.random() * 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const render = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Render Emerald Mists
      mists.forEach((m) => {
        m.x += m.speedX;
        m.y += m.speedY;
        
        // Wrap edges
        if (m.x < -m.radius) m.x = w + m.radius;
        if (m.x > w + m.radius) m.x = -m.radius;
        if (m.y < -m.radius) m.y = h + m.radius;
        if (m.y > h + m.radius) m.y = -m.radius;

        // Pulse size and opacity
        const pulse = Math.sin(time * m.pulseSpeed + m.pulseOffset);
        const radius = m.radius * (1 + pulse * 0.15);
        const opacity = m.opacity * (1 + pulse * 0.1);

        const gradient = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, radius);
        gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity})`); // Emerald green
        gradient.addColorStop(0.5, `rgba(16, 185, 129, ${opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Peach Blossom Petals
      petals.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY + Math.sin(time * p.waveSpeed + p.waveOffset) * 0.15; // wave motion
        p.angle += p.spin;

        // Wrap edges
        if (p.x > w + 20) {
          p.x = -20;
          p.y = Math.random() * h;
        }
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;

        // Draw organic petal shape
        ctx.fillStyle = '#ff8da1'; // Soft peach pink
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw central petal rib (subtle highlights)
        ctx.strokeStyle = '#ffb7c5';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-p.size, 0);
        ctx.lineTo(p.size, 0);
        ctx.stroke();

        ctx.restore();
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-0" />;
}
