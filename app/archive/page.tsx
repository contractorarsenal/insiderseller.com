import type { Metadata } from 'next';
import Link from 'next/link';
import { getSoldProducts } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';

export const metadata: Metadata = {
  title: 'The Archive',
  description: 'Sold, gone, not forgotten. A browsable record of pieces that have already found a home.',
};

export default function ArchivePage() {
  const items = [...getSoldProducts()].sort(
    (a, b) => new Date(b.soldDate ?? 0).getTime() - new Date(a.soldDate ?? 0).getTime()
  );

  return (
    <div className="px-4 py-14 md:px-8">
      <h1 className="font-sans text-4xl font-medium uppercase tracking-tight md:text-6xl">The Archive</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">Gone, not forgotten.</p>
      <p className="mt-6 max-w-xl font-sans text-sm text-black/70">
        Every piece here has sold. We keep the record because it proves something: taste, and how fast the right
        thing moves. Something like it may come around again.
      </p>

      <div className="mt-4">
        <Link href="/source" className="font-mono text-xs uppercase tracking-widest underline-anim">
          Find Me Something Like This →
        </Link>
      </div>

      <div className="mt-12">
        <ProductGrid products={items} columns={4} />
      </div>
    </div>
  );
}
