'use client';

import { useEffect, useRef } from 'react';

/**
 * Very subtle scroll parallax for full-bleed editorial imagery — translateY
 * only, capped small, rAF-throttled. Returns a ref for an element rendered
 * slightly oversized (e.g. `-inset-y-8`) so the shift never reveals an edge.
 */
export function useParallax(strength = 0.08) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Clamped hard — the element is rendered with a small fixed bleed
      // (see ParallaxLayer), and the offset must never exceed it.
      const offset = Math.max(-24, Math.min(24, rect.top * strength));
      el.style.transform = `translateY(${offset}px)`;
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [strength]);

  return ref;
}
