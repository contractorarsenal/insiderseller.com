'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';

export default function MobileBuyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const inCart = useCartStore((s) => s.productIds.includes(product.id));
  const addToCart = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const isSold = product.status === 'SOLD';

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-black/10 bg-edwhite px-4 py-3 safe-bottom transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <span className="font-mono text-base">{formatPrice(product.price)}</span>
      {isSold ? (
        <span className="border border-black/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted">
          Sold
        </span>
      ) : inCart ? (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="border border-black px-6 py-3 font-sans text-xs uppercase tracking-widest"
        >
          View Bag
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            addToCart(product.id);
            setCartOpen(true);
          }}
          className="bg-yellow px-6 py-3 font-sans text-xs uppercase tracking-widest text-black"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
}
