'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { products } from '@/lib/data/products';
import { formatPrice, brandInitials, cn } from '@/lib/utils';
import { useQuickViewStore } from '@/lib/store/quickview';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useAlertsStore } from '@/lib/store/alerts';
import { useAddToCart } from '@/lib/hooks/useAddToCart';
import { useModalA11y } from '@/lib/hooks/useModalA11y';
import { useInteractionStore } from '@/lib/store/interactions';
import Plate from '@/components/ui/Plate';
import MeasurementTable from '@/components/product/MeasurementTable';

export default function QuickView() {
  const productId = useQuickViewStore((s) => s.productId);
  const close = useQuickViewStore((s) => s.close);
  const product = products.find((p) => p.id === productId) ?? null;
  const visible = Boolean(product);

  const [imageIndex, setImageIndex] = useState(0);
  const [alerted, setAlerted] = useState(false);
  const saved = useWishlistStore((s) => (product ? s.has(product.id) : false));
  const toggleSaved = useWishlistStore((s) => s.toggle);
  const registerInteraction = useInteractionStore((s) => s.increment);
  const addAlert = useAlertsStore((s) => s.add);
  const { inCart, justAdded, add, openCart } = useAddToCart(product?.id ?? '', close);

  const dialogRef = useModalA11y(visible, close);

  useEffect(() => {
    setImageIndex(0);
    setAlerted(false);
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

  function handleAlert() {
    if (!product) return;
    addAlert({ designer: product.brand, size: product.size, category: product.category });
    setAlerted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-0 md:p-6 motion-safe:animate-fade-in-fast"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.brand} ${product.name} quick view`}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full w-full flex-col overflow-y-auto bg-edwhite motion-safe:animate-sheet-up md:h-[90vh] md:max-h-[960px] md:w-[92vw] md:max-w-[1500px] md:flex-row md:overflow-hidden md:motion-safe:animate-modal-in"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close quick view"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center bg-edwhite/90 font-mono text-sm text-black md:bg-black/50 md:text-white"
        >
          ✕
        </button>

        {/* Gallery */}
        <div className="relative aspect-[4/5] w-full shrink-0 bg-archive md:aspect-auto md:h-full md:w-[60%]">
          <Plate seed={image.id} watermark={brandInitials(product.brand)} label={image.angle} sub={product.sku} />

          {product.images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setImageIndex((i) => (i - 1 + product.images.length) % product.images.length)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-edwhite/85 font-mono text-lg transition-colors hover:bg-black hover:text-yellow"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setImageIndex((i) => (i + 1) % product.images.length)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-edwhite/85 font-mono text-lg transition-colors hover:bg-black hover:text-yellow"
              >
                ›
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white">
                {String(imageIndex + 1).padStart(2, '0')} / {String(product.images.length).padStart(2, '0')}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex w-full flex-col px-7 py-9 md:w-[40%] md:overflow-y-auto md:px-12 md:py-12">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{product.brand}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{product.sku}</p>
          </div>

          <h2 className="mt-3 font-display text-feature font-black uppercase leading-[0.88] tracking-tight">
            {product.name}
          </h2>

          <div className="mt-5 flex items-center gap-3">
            <span className="font-mono text-2xl">{formatPrice(product.price)}</span>
            {product.isOneOfOne && (
              <span className="bg-yellow px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-black">
                1 of 1
              </span>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-black/10 py-4 font-mono text-[11px] uppercase tracking-widest">
            <div>
              <p className="text-muted">Size</p>
              <p className="mt-1 text-black">{product.size}</p>
            </div>
            <div>
              <p className="text-muted">Condition</p>
              <p className="mt-1 text-black">{product.condition}</p>
            </div>
            <div>
              <p className="text-muted">Status</p>
              <p className="mt-1 text-black">{product.isOneOfOne ? '1 of 1' : product.status}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">Measurements</p>
            <MeasurementTable measurements={product.measurements} />
          </div>

          <div className="mt-8 space-y-3">
            {isSold ? (
              <>
                <div className="w-full border border-black py-4 text-center font-sans text-sm uppercase tracking-widest">
                  Sold
                </div>
                <Link
                  href={`/source?designer=${encodeURIComponent(product.brand)}&item=${encodeURIComponent(product.name)}&size=${encodeURIComponent(product.size)}`}
                  onClick={close}
                  className="wipe-btn block bg-black py-4 text-center font-sans text-sm uppercase tracking-widest text-white"
                >
                  <span className="wipe-btn-fill" aria-hidden="true" />
                  <span className="wipe-btn-label">Find Me Another →</span>
                </Link>
                <button
                  type="button"
                  onClick={handleAlert}
                  disabled={alerted}
                  className="w-full border border-black py-4 font-sans text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white disabled:opacity-50"
                >
                  {alerted ? 'You’ll Be Alerted' : 'Alert Me For Similar →'}
                </button>
              </>
            ) : justAdded ? (
              <div className="w-full bg-black py-5 text-center font-sans text-sm uppercase tracking-widest text-yellow">
                Added To Bag ✓
              </div>
            ) : inCart ? (
              <button
                type="button"
                onClick={openCart}
                className="w-full border border-black py-5 font-sans text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
              >
                In Bag · View Bag
              </button>
            ) : (
              <button type="button" onClick={add} className="wipe-btn w-full bg-yellow py-5 font-sans text-sm uppercase tracking-widest text-black">
                <span className="wipe-btn-fill" aria-hidden="true" />
                <span className="wipe-btn-label">Add To Bag</span>
              </button>
            )}

            <div className="flex gap-3">
              <Link
                href={`/products/${product.slug}`}
                onClick={close}
                className="arrow-cta flex-1 border border-black py-3 text-center font-sans text-xs uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
              >
                View Full Item <span className="arrow-cta-glyph inline-block">→</span>
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
