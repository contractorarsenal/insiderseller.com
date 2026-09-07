import { Product } from '@/lib/types';
import { getRelatedProducts } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';

export default function YouKnowWhatElse({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-black/10 px-4 py-14 md:px-8 md:py-28">
      <h2 className="mb-10 font-sans text-2xl font-medium uppercase tracking-tight md:text-3xl">
        You Know What Else.
      </h2>
      <ProductGrid products={related} columns={4} />
    </section>
  );
}
