'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';
import { useAlertsStore } from '@/lib/store/alerts';
import ConditionBadge from './ConditionBadge';
import MeasurementTable from '@/components/product/MeasurementTable';
import Accordion from '@/components/ui/Accordion';

export default function ProductInfo({ product }: { product: Product }) {
  const inCart = useCartStore((s) => s.productIds.includes(product.id));
  const addToCart = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const addAlert = useAlertsStore((s) => s.add);
  const [alerted, setAlerted] = useState(false);
  const isSold = product.status === 'SOLD';

  function handleAlert() {
    addAlert({ designer: product.brand, size: product.size, category: product.category });
    setAlerted(true);
  }

  return (
    <div>
      <p className="font-sans text-sm uppercase tracking-widest text-muted">{product.brand}</p>
      <h1 className="mt-1 font-sans text-2xl font-medium leading-tight md:text-3xl">{product.name}</h1>

      <div className="mt-4 flex items-center gap-4">
        <span className="font-mono text-2xl">{formatPrice(product.price)}</span>
        {product.isOneOfOne && (
          <span className="bg-yellow px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-black">
            1 of 1
          </span>
        )}
      </div>

      {product.archiveNotes && (
        <p className="mt-4 border-l-2 border-black/15 pl-4 font-sans text-sm italic text-black/70">
          {product.archiveNotes}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="border border-black/20 px-3 py-1.5 font-mono text-xs uppercase tracking-widest">
          Size {product.size}
        </span>
        <ConditionBadge condition={product.condition} score={product.conditionScore} />
      </div>

      <div className="mt-8">
        {!isSold ? (
          inCart ? (
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="w-full border border-black py-4 font-sans text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
            >
              In Bag · View Bag
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                addToCart(product.id);
                setCartOpen(true);
              }}
              className="w-full bg-yellow py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-yellow"
            >
              Add To Cart
            </button>
          )
        ) : (
          <div className="space-y-3">
            <div className="w-full border border-black/20 py-4 text-center font-sans text-sm uppercase tracking-widest text-muted">
              Sold
            </div>
            <Link
              href={`/source?designer=${encodeURIComponent(product.brand)}&item=${encodeURIComponent(product.name)}&size=${encodeURIComponent(product.size)}`}
              className="block w-full bg-black py-4 text-center font-sans text-sm uppercase tracking-widest text-white transition-colors hover:bg-charcoal"
            >
              Find Me Another
            </Link>
            <button
              type="button"
              onClick={handleAlert}
              disabled={alerted}
              className="w-full border border-black py-4 font-sans text-sm uppercase tracking-widest transition-colors hover:bg-black hover:text-white disabled:opacity-50"
            >
              {alerted ? 'You’ll Be Alerted' : 'Alert Me For Similar'}
            </button>
          </div>
        )}

        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">Authenticity Guaranteed.</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
          Items are not reserved until checkout.
        </p>
      </div>

      <div className="mt-10">
        <Accordion title="Description" defaultOpen>
          <p>{product.description}</p>
        </Accordion>
        <Accordion title="Measurements">
          <MeasurementTable measurements={product.measurements} />
        </Accordion>
        <Accordion title="Condition">
          <p>{product.conditionNotes}</p>
        </Accordion>
        <Accordion title="Authenticity">
          <p>
            Every item is inspected before being listed. If an item is determined not to be authentic, you receive a
            full refund.
          </p>
        </Accordion>
        <Accordion title="Shipping">
          <p>Shipping details and timelines are confirmed at checkout.</p>
        </Accordion>
        <Accordion title="Returns">
          <p>Return eligibility is confirmed at checkout and varies by item.</p>
        </Accordion>
      </div>
    </div>
  );
}
