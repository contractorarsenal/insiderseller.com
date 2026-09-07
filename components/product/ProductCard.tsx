'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { formatPrice, brandInitials, cn } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store/wishlist';
import Plate from '@/components/ui/Plate';

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const saved = useWishlistStore((s) => s.has(product.id));
  const toggle = useWishlistStore((s) => s.toggle);

  const isNew = !product.status.includes('SOLD') && Date.now() - new Date(product.dateAdded).getTime() < 10 * 24 * 60 * 60 * 1000;
  const isSold = product.status === 'SOLD';
  const secondAngle = product.images[1]?.angle ?? product.images[0]?.angle;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className={cn('relative aspect-[3/4] w-full overflow-hidden', isSold && 'opacity-50')}>
          <div className={cn('absolute inset-0 transition-opacity duration-[250ms]', hovered ? 'opacity-0' : 'opacity-100')}>
            <Plate seed={`${product.slug}-0`} watermark={brandInitials(product.brand)} />
          </div>
          <div className={cn('absolute inset-0 transition-opacity duration-[250ms]', hovered ? 'opacity-100' : 'opacity-0')}>
            <Plate seed={`${product.slug}-1`} watermark={brandInitials(product.brand)} label={secondAngle} />
          </div>

          {(isNew || isSold) && (
            <span className="absolute left-3 top-3 bg-edwhite/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
              [{isSold ? 'SOLD' : 'NEW'}]
            </span>
          )}
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

      <Link href={`/products/${product.slug}`} className="block">
        <div className="mt-3 space-y-1">
          <p className="font-sans text-xs uppercase tracking-wide">{product.brand}</p>
          <p className="font-sans text-sm text-black/70">{product.name}</p>
          <div className="flex items-center justify-between pt-1 font-mono text-xs">
            <span className="text-muted">SIZE {product.size}</span>
            <span className={cn(isSold && 'text-muted line-through')}>{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>
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
