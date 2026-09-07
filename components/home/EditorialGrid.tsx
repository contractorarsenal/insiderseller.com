import Link from 'next/link';
import { getAvailableProducts } from '@/lib/data/products';
import ProductCard from '@/components/product/ProductCard';
import Plate from '@/components/ui/Plate';

export default function EditorialGrid() {
  const items = getAvailableProducts().slice(8, 14);
  const [a, b, c, d, e, f] = items;

  return (
    <section className="px-4 py-14 md:px-8 md:py-28">
      <div className="mb-10 md:mb-14">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">The Edit</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-12 md:gap-x-6 md:gap-y-14">
        {a && (
          <div className="col-span-1 md:col-span-3">
            <ProductCard product={a} />
          </div>
        )}
        {b && (
          <div className="col-span-1 md:col-span-3">
            <ProductCard product={b} />
          </div>
        )}
        <Link href="/shop" className="group col-span-2 block md:col-span-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[3/4]">
            <Plate seed="editorial-grid-block" tone="dark" watermark="ARCHIVE" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-sans text-xl uppercase tracking-tight text-white md:text-2xl">Rare finds, weekly.</p>
            </div>
          </div>
        </Link>
        {c && (
          <div className="col-span-1 md:col-span-4">
            <ProductCard product={c} />
          </div>
        )}
        {d && (
          <div className="col-span-2 md:col-span-8">
            <ProductCard product={d} />
          </div>
        )}
        {e && (
          <div className="col-span-1 md:col-span-6">
            <ProductCard product={e} />
          </div>
        )}
        {f && (
          <div className="col-span-1 md:col-span-6">
            <ProductCard product={f} />
          </div>
        )}
      </div>
    </section>
  );
}
