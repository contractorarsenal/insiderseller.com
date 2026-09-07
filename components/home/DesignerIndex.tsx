'use client';

import Link from 'next/link';
import { useState } from 'react';
import { designers } from '@/lib/data/designers';
import { getProductsByBrandSlug } from '@/lib/data/products';
import Plate from '@/components/ui/Plate';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const FEATURED_SLUGS = [
  'chrome-hearts',
  'rick-owens',
  'acne-studios',
  'erd',
  'maison-margiela',
  'saint-laurent',
  'kapital',
  'alyx',
  'balenciaga',
  'stussy',
];

export default function DesignerIndex() {
  const list = FEATURED_SLUGS.map((slug) => designers.find((d) => d.slug === slug)).filter(Boolean) as typeof designers;
  const [active, setActive] = useState<string>(list[0].slug);

  return (
    <section className="border-t border-black/10 px-4 py-14 md:px-8 md:py-28">
      <Reveal className="mb-10 flex items-end justify-between md:mb-14">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">Designers</h2>
        <Link href="/designers" className="hidden font-mono text-xs uppercase tracking-widest underline-anim md:inline">
          View All Designers →
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <ul className="md:col-span-7">
          {list.map((d) => {
            const count = getProductsByBrandSlug(d.slug).filter((p) => p.status === 'AVAILABLE').length;
            const isActive = active === d.slug;
            return (
              <li key={d.slug} className="border-b border-black/10">
                <Link
                  href={`/designers/${d.slug}`}
                  onMouseEnter={() => setActive(d.slug)}
                  className="flex items-baseline justify-between gap-4 py-4 md:py-5"
                >
                  <span
                    className={cn(
                      'font-display text-3xl uppercase leading-none tracking-tight transition-colors duration-200 sm:text-5xl md:text-6xl',
                      isActive ? 'text-black' : 'text-black/25 md:hover:text-black'
                    )}
                  >
                    {d.name}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted transition-opacity duration-200',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    Available / {String(count).padStart(2, '0')}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-24 aspect-[3/4] w-full overflow-hidden">
            <div key={active} className="absolute inset-0 animate-preview-in">
              <Plate seed={`designer-preview-${active}`} tone="dark" watermark={active.replace(/-/g, ' ')} />
            </div>
          </div>
        </div>
      </div>

      <Link href="/designers" className="mt-8 block font-mono text-xs uppercase tracking-widest underline-anim md:hidden">
        View All Designers →
      </Link>
    </section>
  );
}
