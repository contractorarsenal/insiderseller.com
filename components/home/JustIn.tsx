import Link from 'next/link';
import { getNewArrivals } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';

export default function JustIn() {
  const items = getNewArrivals(8);
  return (
    <section className="px-4 py-14 md:px-8 md:py-28">
      <div className="mb-10 flex items-end justify-between md:mb-14">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">Just In</h2>
        <Link href="/shop?sort=newest" className="font-mono text-xs uppercase tracking-widest underline-anim">
          View All →
        </Link>
      </div>
      <ProductGrid products={items} columns={4} />
    </section>
  );
}
