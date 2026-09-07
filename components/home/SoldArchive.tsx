import Link from 'next/link';
import { getSoldProducts } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import Reveal from '@/components/ui/Reveal';

export default function SoldArchive() {
  const items = [...getSoldProducts()]
    .sort((a, b) => new Date(b.soldDate ?? 0).getTime() - new Date(a.soldDate ?? 0).getTime())
    .slice(0, 8);

  return (
    <section className="bg-black px-4 pb-16 pt-20 text-white md:px-8 md:pb-20 md:pt-28">
      <Reveal className="mb-12 md:mb-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/50">The Archive</p>
        <h2 className="font-display text-section font-black uppercase leading-[0.85] tracking-tight">
          Gone,
          <br />
          not
          <br />
          forgotten.
        </h2>
      </Reveal>

      <div className="bg-edwhite px-4 py-10 text-black md:px-8 md:py-14">
        <ProductGrid products={items} columns={4} />
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/source" className="arrow-cta font-mono text-xs uppercase tracking-widest underline-anim">
            Find Me Something Like This <span className="arrow-cta-glyph inline-block">→</span>
          </Link>
          <Link href="/archive" className="arrow-cta font-mono text-xs uppercase tracking-widest underline-anim">
            View Full Archive <span className="arrow-cta-glyph inline-block">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
