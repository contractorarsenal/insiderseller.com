import type { Metadata } from 'next';
import Link from 'next/link';
import { designers } from '@/lib/data/designers';
import { getProductsByBrandSlug } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'Designers',
  description: 'Chrome Hearts, Rick Owens, Acne Studios, Maison Margiela, Saint Laurent and the rest of the archive.',
};

export default function DesignersPage() {
  return (
    <div className="px-4 py-14 md:px-8">
      <h1 className="mb-14 font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">Designers</h1>
      <ul>
        {designers.map((d) => {
          const count = getProductsByBrandSlug(d.slug).filter((p) => p.status === 'AVAILABLE').length;
          return (
            <li key={d.slug} className="border-b border-black/10">
              <Link href={`/designers/${d.slug}`} className="group flex items-baseline justify-between gap-4 py-6">
                <span className="font-display text-4xl uppercase leading-none tracking-tight transition-colors group-hover:text-black/60 sm:text-6xl md:text-7xl">
                  {d.name}
                </span>
                <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted">
                  {count} Available
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
