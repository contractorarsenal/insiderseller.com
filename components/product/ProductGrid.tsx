import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

export default function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 2 | 4;
}) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">No pieces match these filters.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6',
        columns === 4 ? 'lg:grid-cols-4 lg:gap-x-8' : 'lg:grid-cols-2 lg:gap-x-12 lg:gap-y-20'
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
