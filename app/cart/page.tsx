'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { products } from '@/lib/data/products';
import { formatPrice, brandInitials } from '@/lib/utils';
import Plate from '@/components/ui/Plate';

export default function CartPage() {
  const productIds = useCartStore((s) => s.productIds);
  const remove = useCartStore((s) => s.remove);
  const lines = productIds.map((id) => products.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const subtotal = lines.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <h1 className="mb-10 font-sans text-4xl font-medium uppercase tracking-tight md:text-6xl">Bag</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-start gap-4">
          <p className="font-sans text-lg uppercase tracking-wide">Your bag is empty.</p>
          <Link href="/shop" className="border border-black px-6 py-3 font-mono text-xs uppercase tracking-widest underline-anim">
            Shop New Arrivals
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {lines.map((p) => (
              <li key={p.id} className="flex gap-5 py-6">
                <Link href={`/products/${p.slug}`} className="h-32 w-24 shrink-0">
                  <Plate seed={p.slug} watermark={brandInitials(p.brand)} />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-wide text-muted">{p.brand}</p>
                    <Link href={`/products/${p.slug}`} className="font-sans text-base">
                      {p.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase text-muted">Size {p.size}</span>
                    <span className="font-mono text-sm">{formatPrice(p.price)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  className="self-start font-mono text-[10px] uppercase tracking-widest text-muted underline-anim"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between">
            <span className="font-sans text-lg uppercase tracking-wide">Subtotal</span>
            <span className="font-mono text-xl">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
            Items in your bag are not reserved.
          </p>
          <button
            type="button"
            className="mt-6 w-full bg-yellow py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-yellow sm:w-auto sm:px-16"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
