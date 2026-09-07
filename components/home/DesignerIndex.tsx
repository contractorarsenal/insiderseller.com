'use client';

import Link from 'next/link';
import { useState } from 'react';
import { designers } from '@/lib/data/designers';
import Plate from '@/components/ui/Plate';
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
    <section className="border-t border-black/10 px-4 py-16 md:px-8 md:py-24">
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <h2 className="font-sans text-3xl font-medium uppercase tracking-tight md:text-5xl">Designers</h2>
        <Link href="/designers" className="hidden font-mono text-xs uppercase tracking-widest underline-anim md:inline">
          View All Designers →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <ul className="md:col-span-7">
          {list.map((d) => (
            <li key={d.slug} className="border-b border-black/10">
              <Link
                href={`/designers/${d.slug}`}
                onMouseEnter={() => setActive(d.slug)}
                className={cn(
                  'block py-4 font-sans text-3xl uppercase leading-none tracking-tight transition-colors sm:text-5xl md:py-5 md:text-6xl',
                  active === d.slug ? 'text-black' : 'text-black/25 md:hover:text-black'
                )}
              >
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-24 aspect-[3/4] w-full">
            <Plate seed={`designer-preview-${active}`} tone="dark" watermark={active.replace(/-/g, ' ')} />
          </div>
        </div>
      </div>

      <Link href="/designers" className="mt-8 block font-mono text-xs uppercase tracking-widest underline-anim md:hidden">
        View All Designers →
      </Link>
    </section>
  );
}
