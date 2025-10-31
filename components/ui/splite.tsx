'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/5 animate-pulse rounded-full" />
});

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className}><div className="w-full h-full bg-black/5 animate-pulse rounded-full" /></div>;
  }

  return (
    <div className={className}>
      <Spline scene={scene} />
    </div>
  );
}
