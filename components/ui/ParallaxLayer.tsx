'use client';

import { useParallax } from '@/lib/hooks/useParallax';

export default function ParallaxLayer({
  children,
  strength = 0.08,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useParallax(strength);
  return (
    <div ref={ref} className="absolute -inset-y-8 inset-x-0">
      {children}
    </div>
  );
}
