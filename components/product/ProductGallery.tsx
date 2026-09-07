'use client';

import { useRef, useState } from 'react';
import { Product } from '@/lib/types';
import { brandInitials } from '@/lib/utils';
import Plate from '@/components/ui/Plate';

export default function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex(i);
  }

  return (
    <div>
      {/* Mobile: horizontal swipe */}
      <div className="relative lg:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {product.images.map((img) => (
            <div key={img.id} className="aspect-[3/4] w-full shrink-0 snap-center">
              <Plate seed={img.id} watermark={brandInitials(product.brand)} label={img.angle} sub={product.sku} />
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 bg-edwhite/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
          {String(index + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}
        </div>
      </div>

      {/* Desktop: stacked gallery */}
      <div className="hidden flex-col gap-3 lg:flex">
        {product.images.map((img) => (
          <div key={img.id} className="aspect-[3/4] w-full">
            <Plate seed={img.id} watermark={brandInitials(product.brand)} label={img.angle} sub={product.sku} />
          </div>
        ))}
      </div>
    </div>
  );
}
