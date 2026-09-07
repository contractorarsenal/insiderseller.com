'use client';

import { useRecentlyViewedStore } from '@/lib/store/recentlyViewed';
import { products } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const ids = useRecentlyViewedStore((s) => s.productIds).filter((id) => id !== excludeId);
  const items = ids.map((id) => products.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) return null;

  return (
    <section className="border-t border-black/10 px-4 py-14 md:px-8 md:py-28">
      <h2 className="mb-10 font-sans text-2xl font-medium uppercase tracking-tight md:text-3xl">Recently Viewed</h2>
      <ProductGrid products={items} columns={4} />
    </section>
  );
}
