'use client';

import { useMotionValue, motion, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface SpotlightProps {
  className?: string;
  size?: number;
  springOptions?: {
    bounce?: number;
    stiffness?: number;
    damping?: number;
  };
}

export function Spotlight({
  className = '',
  size = 300,
  springOptions = { bounce: 0.1 }
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: springOptions.stiffness || 150,
    damping: springOptions.damping || 20,
    bounce: springOptions.bounce
  });

  const springY = useSpring(y, {
    stiffness: springOptions.stiffness || 150,
    damping: springOptions.damping || 20,
    bounce: springOptions.bounce
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: size,
          height: size,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(30px)'
        }}
      />
    </div>
  );
}
