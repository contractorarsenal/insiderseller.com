'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useUIStore } from '@/lib/store/ui';
import { useCartStore } from '@/lib/store/cart';
import { products } from '@/lib/data/products';
import { formatPrice, brandInitials } from '@/lib/utils';
import Plate from '@/components/ui/Plate';
import { cn } from '@/lib/utils';

export default function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const setOpen = useUIStore((s) => s.setCartOpen);
  const productIds = useCartStore((s) => s.productIds);
  const remove = useCartStore((s) => s.remove);

  const lines = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const subtotal = lines.reduce((sum, p) => sum + p.price, 0);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, setOpen]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/40 transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-edwhite transition-transform duration-300 ease-out sm:w-[440px]',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="flex h-[58px] shrink-0 items-center justify-between border-b border-black/10 px-5 md:h-20">
          <span className="font-sans text-sm uppercase tracking-widest">Bag ({lines.length})</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-xs uppercase tracking-widest underline-anim"
            aria-label="Close bag"
          >
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-sans text-lg uppercase tracking-wide">Your bag is empty.</p>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="border border-black px-6 py-3 font-mono text-xs uppercase tracking-widest underline-anim"
            >
              Shop New Arrivals
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="divide-y divide-black/10">
              {lines.map((p) => (
                <li key={p.id} className="flex gap-4 py-5">
                  <Link href={`/products/${p.slug}`} onClick={() => setOpen(false)} className="h-24 w-20 shrink-0">
                    <Plate seed={p.slug} watermark={brandInitials(p.brand)} />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wide text-muted">{p.brand}</p>
                      <Link href={`/products/${p.slug}`} onClick={() => setOpen(false)} className="font-sans text-sm">
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
                    aria-label={`Remove ${p.name} from bag`}
                    className="self-start font-mono text-[10px] uppercase tracking-widest text-muted underline-anim"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {lines.length > 0 && (
          <div className="shrink-0 border-t border-black/10 px-5 py-5 safe-bottom">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted">
              Items in your bag are not reserved.
            </p>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-sans text-sm uppercase tracking-wide">Subtotal</span>
              <span className="font-mono text-base">{formatPrice(subtotal)}</span>
            </div>
            <button
              type="button"
              className="mb-3 w-full bg-yellow py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-yellow"
            >
              Checkout
            </button>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="block w-full border border-black py-4 text-center font-sans text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
            >
              View Bag
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
