'use client';

import React, { useRef, useEffect } from 'react';

export default function BlossomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);
    let isMobile = w < 768;

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
      isMobile = w < 768;
    };
    window.addEventListener('resize', handleResize);

    // Particle settings
    // 1. Peach Blossom Petals (Significantly reduced on mobile)
    const petalCount = isMobile ? 8 : 35;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: isMobile ? 3 + Math.random() * 3 : 4 + Math.random() * 6,
      opacity: isMobile ? 0.2 + Math.random() * 0.4 : 0.3 + Math.random() * 0.5,
      speedX: isMobile ? 0.3 + Math.random() * 0.5 : 0.4 + Math.random() * 0.8,
      speedY: isMobile ? 0.2 + Math.random() * 0.4 : 0.3 + Math.random() * 0.6,
      angle: Math.random() * Math.PI * 2,
      spin: isMobile ? 0 : (Math.random() - 0.5) * 0.015,
      waveOffset: Math.random() * Math.PI * 2,
      waveSpeed: 0.005 + Math.random() * 0.01,
    }));

    // 2. Emerald Spirit/Mist particles (Disabled on mobile to prevent canvas radial gradient lag)
    const mistCount = isMobile ? 0 : 20;
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

      // Render Emerald Mists (Skip on mobile)
      if (!isMobile && mists.length > 0) {
        mists.forEach((m) => {
          m.x += m.speedX;
          m.y += m.speedY;
          
          if (m.x < -m.radius) m.x = w + m.radius;
          if (m.x > w + m.radius) m.x = -m.radius;
          if (m.y < -m.radius) m.y = h + m.radius;
          if (m.y > h + m.radius) m.y = -m.radius;

          const pulse = Math.sin(time * m.pulseSpeed + m.pulseOffset);
          const radius = m.radius * (1 + pulse * 0.15);
          const opacity = m.opacity * (1 + pulse * 0.1);

          const gradient = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, radius);
          gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(16, 185, 129, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(m.x, m.y, radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Render Peach Blossom Petals
      petals.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY + (isMobile ? 0 : Math.sin(time * p.waveSpeed + p.waveOffset) * 0.15);
        if (!isMobile) p.angle += p.spin;

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
        if (!isMobile) {
          ctx.rotate(p.angle);
        }
        ctx.globalAlpha = p.opacity;

        // Draw simplified ellipse for mobile, or organic shape for desktop
        ctx.fillStyle = '#ff8da1';
        ctx.beginPath();
        if (isMobile) {
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        } else {
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        }
        ctx.fill();

        // Draw central petal rib (Skip on mobile)
        if (!isMobile) {
          ctx.strokeStyle = '#ffb7c5';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(-p.size, 0);
          ctx.lineTo(p.size, 0);
          ctx.stroke();
        }

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
