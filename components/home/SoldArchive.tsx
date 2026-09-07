import Link from 'next/link';
import { getSoldProducts } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';

export default function SoldArchive() {
  const items = [...getSoldProducts()]
    .sort((a, b) => new Date(b.soldDate ?? 0).getTime() - new Date(a.soldDate ?? 0).getTime())
    .slice(0, 8);

  return (
    <section className="border-t border-black/10 px-4 py-16 md:px-8 md:py-24">
      <div className="mb-10 md:mb-14">
        <h2 className="font-sans text-3xl font-medium uppercase tracking-tight md:text-5xl">The Archive</h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">Gone, not forgotten.</p>
      </div>
      <ProductGrid products={items} columns={4} />
      <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/source" className="font-mono text-xs uppercase tracking-widest underline-anim">
          Find Me Something Like This →
        </Link>
        <Link href="/archive" className="font-mono text-xs uppercase tracking-widest underline-anim">
          View Full Archive →
        </Link>
      </div>
    </section>
  );
}
