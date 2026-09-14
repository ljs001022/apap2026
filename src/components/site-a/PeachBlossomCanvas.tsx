'use client';

import React, { useRef, useEffect, useState } from 'react';

interface PeachBlossomCanvasProps {
  className?: string;
  count?: number;
  opacity?: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayAngle: number;
  swayRadius: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  alpha: number;
}

export default function PeachBlossomCanvas({
  className = '',
  count = 38,
  opacity = 0.85,
}: PeachBlossomCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // PC (Desktop) version only check: window.innerWidth >= 1024
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop, { passive: true });
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize fluttering white peach blossom petals
    const petals: Petal[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 7, // 7px to 15px
      speedY: Math.random() * 0.9 + 0.65, // Gentle falling speed
      swaySpeed: Math.random() * 0.02 + 0.012,
      swayAngle: Math.random() * Math.PI * 2,
      swayRadius: Math.random() * 1.8 + 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.018,
      flip: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.025 + 0.015,
      alpha: Math.random() * 0.45 + 0.35, // Delicately translucent white
    }));

    let globalWindTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      globalWindTime += 0.008;
      // Soft ambient breeze swaying east and west
      const globalWind = Math.sin(globalWindTime) * 0.4 + 0.25;

      petals.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Base motion
        p.y += p.speedY;
        p.x += Math.sin(p.swayAngle) * p.swayRadius + globalWind;

        // Subtle interactive draft when cursor moves near
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 1.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force * 0.5;
        }

        // Boundary wrap: top & sides
        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) {
          p.x = -30;
        } else if (p.x < -30) {
          p.x = width + 30;
        }

        // 3D Perspective tumble scale
        const flipScale = Math.cos(p.flip);
        const currentAlpha = p.alpha * opacity;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(1, Math.max(0.12, Math.abs(flipScale)));

        // Draw natural peach blossom petal (복사꽃잎 형상: 하트/눈물방울 형태의 곡선과 상단 미세 노치)
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, s);
        // Left curve
        ctx.bezierCurveTo(-s * 0.75, s * 0.5, -s * 0.85, -s * 0.35, -s * 0.22, -s);
        // Top gentle notch
        ctx.bezierCurveTo(-s * 0.08, -s * 1.1, s * 0.08, -s * 1.1, s * 0.22, -s);
        // Right curve
        ctx.bezierCurveTo(s * 0.85, -s * 0.35, s * 0.75, s * 0.5, 0, s);
        ctx.closePath();

        // White peach blossom gradient (Pure white with subtle moonlight luminescence)
        const grad = ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s);
        grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.95})`);
        grad.addColorStop(0.65, `rgba(255, 255, 255, ${currentAlpha * 0.8})`);
        grad.addColorStop(1, `rgba(242, 246, 255, ${currentAlpha * 0.35})`);

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle petal vein
        ctx.beginPath();
        ctx.moveTo(0, s * 0.75);
        ctx.quadraticCurveTo(s * 0.04, 0, 0, -s * 0.65);
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.55})`;
        ctx.lineWidth = Math.max(0.6, s * 0.06);
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isDesktop, count, opacity]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`hidden lg:block fixed inset-0 w-full h-full pointer-events-none z-20 ${className}`}
    />
  );
}
