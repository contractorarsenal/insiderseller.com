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
];

export default function DesignerIndex() {
  const list = FEATURED_SLUGS.map((slug) => designers.find((d) => d.slug === slug)).filter(Boolean) as typeof designers;
  const [active, setActive] = useState<string>(list[0].slug);
  const activeDesigner = list.find((d) => d.slug === active) ?? list[0];
  const activeCount = getProductsByBrandSlug(activeDesigner.slug).filter((p) => p.status === 'AVAILABLE').length;

  return (
    <section className="min-h-screen border-t border-black/10 px-4 py-16 md:px-8 md:py-24">
      <Reveal className="mb-10 flex items-end justify-between md:mb-14">
        <h2 className="font-display text-section font-black uppercase tracking-tight">Designers</h2>
        <Link href="/designers" className="arrow-cta hidden font-mono text-xs uppercase tracking-widest underline-anim md:inline">
          View All <span className="arrow-cta-glyph inline-block">→</span>
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <ul className="md:col-span-7">
          {list.map((d) => {
            const isActive = active === d.slug;
            return (
              <li key={d.slug} className="border-b border-black/10">
                <Link
                  href={`/designers/${d.slug}`}
                  onMouseEnter={() => setActive(d.slug)}
                  className="block py-5 md:py-6"
                >
                  <span
                    className={cn(
                      'font-display text-5xl uppercase leading-none tracking-tight transition-colors duration-200 sm:text-6xl md:text-[5.5rem]',
                      isActive ? 'text-black' : 'text-black/20 md:hover:text-black'
                    )}
                  >
                    {d.name}
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
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-black px-5 py-4 text-white">
              <div>
                <p className="font-display text-lg font-bold uppercase leading-none">{activeDesigner.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                  {activeDesigner.location}
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-yellow">
                Available / {String(activeCount).padStart(2, '0')}
              </p>
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
