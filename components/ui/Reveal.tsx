'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms — used for sequential reveals (product grids, lists). */
  delay?: number;
}

/**
 * Lightweight scroll-reveal wrapper. Uses a single IntersectionObserver
 * instance per element rather than a full animation library — the site only
 * needs opacity/translateY on enter, once, which doesn't justify the bundle
 * cost of Framer Motion. Respects prefers-reduced-motion via the global
 * `.reveal` CSS (see app/globals.css), which is instant under that media
 * query.
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety net: content must never be permanently stuck invisible (a slow
    // main thread, an extremely fast scroll-past, or any observer edge case
    // shouldn't be able to hide real content forever).
    const fallback = setTimeout(() => setVisible(true), 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          clearTimeout(fallback);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
