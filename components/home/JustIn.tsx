import Link from 'next/link';
import { getNewArrivals } from '@/lib/data/products';
import ProductCard from '@/components/product/ProductCard';
import ProductGrid from '@/components/product/ProductGrid';
import Reveal from '@/components/ui/Reveal';

export default function JustIn() {
  const items = getNewArrivals(12);
  const [featured, sideA, sideB, oversized, oversizedB, ...rest] = items;

  return (
    <section className="px-4 pt-16 md:px-8 md:pt-24">
      <Reveal className="mb-10 flex items-end justify-between md:mb-16">
        <h2 className="font-display text-section font-black uppercase tracking-tight">
          Just
          <br />
          In.
        </h2>
        <Link href="/shop?sort=newest" className="arrow-cta hidden font-mono text-xs uppercase tracking-widest underline-anim md:inline">
          View All <span className="arrow-cta-glyph inline-block">→</span>
        </Link>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-12 md:gap-x-6 md:gap-y-14">
        {featured && (
          <Reveal className="col-span-2 md:col-span-6">
            <ProductCard product={featured} />
          </Reveal>
        )}
        <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-10 self-start md:col-span-6 md:gap-x-6">
          {sideA && (
            <Reveal delay={60}>
              <ProductCard product={sideA} />
            </Reveal>
          )}
          {sideB && (
            <Reveal delay={110}>
              <ProductCard product={sideB} />
            </Reveal>
          )}
        </div>
        {oversized && (
          <Reveal delay={80} className="col-span-2 md:col-span-8">
            <ProductCard product={oversized} />
          </Reveal>
        )}
        {oversizedB && (
          <Reveal delay={140} className="col-span-2 md:col-span-4">
            <ProductCard product={oversizedB} />
          </Reveal>
        )}
      </div>

      <div className="mt-16 border-t border-black/10 pt-14 md:mt-24 md:pt-16">
        <ProductGrid products={rest} columns={4} />
      </div>

      <Link href="/shop?sort=newest" className="arrow-cta mt-8 block text-center font-mono text-xs uppercase tracking-widest underline-anim md:hidden">
        View All <span className="arrow-cta-glyph inline-block">→</span>
      </Link>
    </section>
  );
}
