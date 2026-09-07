'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { useAddToCart } from '@/lib/hooks/useAddToCart';

export default function MobileBuyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const { inCart, justAdded, add, openCart } = useAddToCart(product.id);
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
      ) : justAdded ? (
        <span className="bg-black px-6 py-3 font-sans text-xs uppercase tracking-widest text-yellow">
          Added ✓
        </span>
      ) : inCart ? (
        <button
          type="button"
          onClick={openCart}
          className="border border-black px-6 py-3 font-sans text-xs uppercase tracking-widest"
        >
          View Bag
        </button>
      ) : (
        <button
          type="button"
          onClick={add}
          className="bg-yellow px-6 py-3 font-sans text-xs uppercase tracking-widest text-black transition-colors duration-200"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
}
