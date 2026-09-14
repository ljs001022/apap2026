'use client';

import React, { useRef, useEffect } from 'react';

interface DustCanvasProps {
  className?: string;
  opacity?: number;
}

/**
 * DustCanvas — "미래지향 시안" reference 기반
 * 화면 전체에 아주 작은 미세 먼지/파티클 점(지름 2~4px)들이
 * 무작위 방향으로 매우 천천히 유영하는 앰비언트 효과.
 */
export default function DustCanvas({
  className = '',
  opacity = 0.9,
}: DustCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;

    const resize = () => {
      if (!canvas) return;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 모바일: 32개, 데스크톱: 60개
    const count = w < 768 ? 32 : 60;

    // 점들: 정규화 좌표(0~1) + reference 기반 매우 느린 표류 속도
    const dots = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      radius: Math.random() * 0.8 + 1.1,      // 반경 1.1 ~ 1.9px (지름 2.2 ~ 3.8px)
      baseAlpha: Math.random() * 0.35 + 0.55, // 0.55 ~ 0.90 (확실하게 보임)
      pulseSpeed: Math.random() * 0.015 + 0.008,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((d) => {
        // 이동
        d.x += d.vx;
        d.y += d.vy;
        d.pulsePhase += d.pulseSpeed;

        // 벽 반사 (bounce)
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        d.x = Math.max(0, Math.min(1, d.x));
        d.y = Math.max(0, Math.min(1, d.y));

        // 은은한 깜빡임
        const shimmer = Math.sin(d.pulsePhase) * 0.25 + 0.75;
        const currentAlpha = Math.min(1, Math.max(0.2, d.baseAlpha * shimmer * opacity));

        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(d.x * w * dpr, d.y * h * dpr, d.radius * dpr, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
}