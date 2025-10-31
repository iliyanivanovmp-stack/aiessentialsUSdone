'use client';

import { useEffect, useRef } from 'react';

interface SpotlightCursorConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
}

interface SpotlightCursorProps {
  config?: SpotlightCursorConfig;
}

export function SpotlightCursor({
  config = {
    radius: 100,
    brightness: 0.15,
    color: '#ffffff',
    smoothing: 0.1
  }
}: SpotlightCursorProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * (config.smoothing || 0.1);
      currentY.current += (targetY.current - currentY.current) * (config.smoothing || 0.1);

      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${currentX.current}px`;
        spotlightRef.current.style.top = `${currentY.current}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [config.smoothing]);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed z-50 rounded-full"
      style={{
        width: `${config.radius || 100}px`,
        height: `${config.radius || 100}px`,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${config.color || '#ffffff'}${Math.floor((config.brightness || 0.15) * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        mixBlendMode: 'screen',
        filter: 'blur(20px)'
      }}
    />
  );
}
