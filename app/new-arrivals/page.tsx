import type { Metadata } from 'next';
import { getNewArrivals } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';

export const metadata: Metadata = {
  title: 'New Arrivals',
  description: 'The latest pieces added to Insider Sellers.',
};

export default function NewArrivalsPage() {
  const items = getNewArrivals(24);
  return (
    <div className="px-4 py-14 md:px-8">
      <h1 className="font-sans text-4xl font-medium uppercase tracking-tight md:text-6xl">New Arrivals</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">{items.length} Pieces</p>
      <div className="mt-12">
        <ProductGrid products={items} columns={4} />
      </div>
    </div>
  );
}
