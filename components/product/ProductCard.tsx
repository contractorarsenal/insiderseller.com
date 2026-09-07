'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { formatPrice, brandInitials, cn } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useQuickViewStore } from '@/lib/store/quickview';
import Plate from '@/components/ui/Plate';

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const saved = useWishlistStore((s) => s.has(product.id));
  const toggle = useWishlistStore((s) => s.toggle);
  const openQuickView = useQuickViewStore((s) => s.open);

  const isNew = !product.status.includes('SOLD') && Date.now() - new Date(product.dateAdded).getTime() < 10 * 24 * 60 * 60 * 1000;
  const isSold = product.status === 'SOLD';
  const secondAngle = product.images[1]?.angle ?? product.images[0]?.angle;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Modified clicks (open in new tab, etc) fall through to normal navigation.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    openQuickView(product.id);
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`} onClick={handleClick} className="block">
        <div className={cn('relative aspect-[3/4] w-full overflow-hidden', isSold && 'opacity-50')}>
          <div
            className={cn(
              'absolute inset-0 transition-[opacity,transform] duration-300 ease-out',
              hovered ? 'scale-[1.025] opacity-0' : 'scale-100 opacity-100'
            )}
          >
            <Plate seed={`${product.slug}-0`} watermark={brandInitials(product.brand)} />
          </div>
          <div
            className={cn(
              'absolute inset-0 transition-[opacity,transform] duration-300 ease-out',
              hovered ? 'scale-[1.025] opacity-100' : 'scale-100 opacity-0'
            )}
          >
            <Plate seed={`${product.slug}-1`} watermark={brandInitials(product.brand)} label={secondAngle} />
          </div>

          {(isNew || isSold) && (
            <span className="absolute left-3 top-3 bg-edwhite/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
              [{isSold ? 'SOLD' : 'NEW'}]
            </span>
          )}

          {!isSold && (
            <span
              className={cn(
                'absolute bottom-3 left-1/2 -translate-x-1/2 bg-black px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-yellow transition-[opacity,transform] duration-200',
                hovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
              )}
            >
              Quick View
            </span>
          )}
        </div>

        <div
          className={cn(
            'mt-3 space-y-1 transition-transform duration-300 ease-out',
            hovered && 'md:-translate-y-0.5'
          )}
        >
          <p className="font-sans text-xs uppercase tracking-wide">{product.brand}</p>
          <p className="font-sans text-sm text-black/70">{product.name}</p>
          <div className="flex items-center justify-between pt-1 font-mono text-xs">
            <span className="text-muted">SIZE {product.size}</span>
            <span className={cn(isSold && 'text-muted line-through')}>{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
        }}
        aria-pressed={saved}
        aria-label={saved ? 'Remove from saved' : 'Save item'}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center bg-edwhite/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100"
      >
        <HeartIcon filled={saved} />
      </button>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 21s-7.5-4.6-10-9.2C.4 8.4 2 5 5.5 5c2 0 3.5 1.2 4.5 2.7C11 6.2 12.5 5 14.5 5 18 5 19.6 8.4 22 11.8 19.5 16.4 12 21 12 21z" />
    </svg>
  );
}
