'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { products } from '@/lib/data/products';
import { formatPrice, brandInitials, cn } from '@/lib/utils';
import { useQuickViewStore } from '@/lib/store/quickview';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useAddToCart } from '@/lib/hooks/useAddToCart';
import { useModalA11y } from '@/lib/hooks/useModalA11y';
import { useInteractionStore } from '@/lib/store/interactions';
import Plate from '@/components/ui/Plate';
import ConditionBadge from '@/components/product/ConditionBadge';
import MeasurementTable from '@/components/product/MeasurementTable';

export default function QuickView() {
  const productId = useQuickViewStore((s) => s.productId);
  const close = useQuickViewStore((s) => s.close);
  const product = products.find((p) => p.id === productId) ?? null;
  const visible = Boolean(product);

  const [imageIndex, setImageIndex] = useState(0);
  const saved = useWishlistStore((s) => (product ? s.has(product.id) : false));
  const toggleSaved = useWishlistStore((s) => s.toggle);
  const registerInteraction = useInteractionStore((s) => s.increment);
  const { inCart, justAdded, add, openCart } = useAddToCart(product?.id ?? '', close);

  const dialogRef = useModalA11y(visible, close);

  useEffect(() => {
    setImageIndex(0);
  }, [productId]);

  useEffect(() => {
    if (visible) registerInteraction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (!visible || !product) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') setImageIndex((i) => (i + 1) % product!.images.length);
      if (e.key === 'ArrowLeft') setImageIndex((i) => (i - 1 + product!.images.length) % product!.images.length);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, product]);

  if (!product) return null;

  const isSold = product.status === 'SOLD';
  const image = product.images[imageIndex];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-0 md:p-6 motion-safe:animate-fade-in-fast"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.brand} ${product.name} quick view`}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full flex-col overflow-y-auto bg-edwhite motion-safe:animate-sheet-up md:h-[88vh] md:max-h-[920px] md:w-[90vw] md:max-w-[1360px] md:flex-row md:overflow-hidden md:motion-safe:animate-modal-in"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center bg-edwhite/90 font-mono text-sm text-black md:bg-black/40 md:text-white"
        >
          ✕
        </button>

        {/* Gallery */}
        <div className="relative aspect-[4/5] w-full shrink-0 md:aspect-auto md:h-full md:w-[58%]">
          <Plate seed={image.id} watermark={brandInitials(product.brand)} label={image.angle} sub={product.sku} />

          {product.images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setImageIndex((i) => (i - 1 + product.images.length) % product.images.length)}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-edwhite/80 font-mono text-lg"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setImageIndex((i) => (i + 1) % product.images.length)}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-edwhite/80 font-mono text-lg"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-edwhite/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
                {String(imageIndex + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex w-full flex-col px-6 py-8 md:w-[42%] md:overflow-y-auto md:px-10 md:py-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">{product.brand}</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-[0.98] tracking-tight md:text-4xl">
            {product.name}
          </h2>

          <div className="mt-4 flex items-center gap-4">
            <span className="font-mono text-xl">{formatPrice(product.price)}</span>
            {product.isOneOfOne && (
              <span className="border border-black px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
                1 of 1
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="border border-black/20 px-3 py-1.5 font-mono text-xs uppercase tracking-widest">
              Size {product.size}
            </span>
            <ConditionBadge condition={product.condition} score={product.conditionScore} />
          </div>

          <div className="mt-6 border-t border-black/10 pt-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">Measurements</p>
            <MeasurementTable measurements={product.measurements} />
          </div>

          <div className="mt-8 space-y-3">
            {isSold ? (
              <div className="w-full border border-black/20 py-4 text-center font-sans text-sm uppercase tracking-widest text-muted">
                Sold
              </div>
            ) : justAdded ? (
              <div className="w-full bg-black py-4 text-center font-sans text-sm uppercase tracking-widest text-yellow">
                Added To Bag ✓
              </div>
            ) : inCart ? (
              <button
                type="button"
                onClick={openCart}
                className="w-full border border-black py-4 font-sans text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
              >
                In Bag · View Bag
              </button>
            ) : (
              <button
                type="button"
                onClick={add}
                className="w-full bg-yellow py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors duration-200 hover:bg-black hover:text-yellow"
              >
                Add To Cart
              </button>
            )}

            <div className="flex gap-3">
              <Link
                href={`/products/${product.slug}`}
                onClick={close}
                className="flex-1 border border-black py-3 text-center font-sans text-xs uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
              >
                View Full Item
              </Link>
              <button
                type="button"
                onClick={() => toggleSaved(product.id)}
                aria-pressed={saved}
                className={cn(
                  'flex-1 border py-3 font-sans text-xs uppercase tracking-widest transition-colors',
                  saved ? 'border-black bg-black text-white' : 'border-black/20 hover:border-black'
                )}
              >
                {saved ? 'Saved ✓' : 'Save'}
              </button>
            </div>
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
            Authenticity guaranteed. Items are not reserved until checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
