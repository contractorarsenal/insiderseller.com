'use client';

import { useState } from 'react';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useAlertsStore } from '@/lib/store/alerts';
import { products } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { formatDate, cn } from '@/lib/utils';

const TABS = ['Orders', 'Saved', 'Alerts', 'Selling'] as const;
type Tab = (typeof TABS)[number];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('Saved');
  const savedIds = useWishlistStore((s) => s.productIds);
  const alerts = useAlertsStore((s) => s.alerts);
  const removeAlert = useAlertsStore((s) => s.remove);

  const saved = savedIds.map((id) => products.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="px-4 py-14 md:px-8">
      <h1 className="mb-10 font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">Account</h1>

      <div className="mb-10 flex gap-8 border-b border-black/10">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'border-b-2 pb-4 font-mono text-xs uppercase tracking-widest transition-colors',
              tab === t ? 'border-black text-black' : 'border-transparent text-muted hover:text-black'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Orders' && (
        <p className="font-mono text-xs uppercase tracking-widest text-muted">No orders yet.</p>
      )}

      {tab === 'Saved' &&
        (saved.length > 0 ? (
          <ProductGrid products={saved} columns={4} />
        ) : (
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Nothing saved yet.</p>
        ))}

      {tab === 'Alerts' &&
        (alerts.length > 0 ? (
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {alerts.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-sans text-sm uppercase tracking-wide">
                    {a.designer}
                    {a.size ? ` / Size ${a.size}` : ''}
                    {a.category ? ` / ${a.category}` : ''}
                  </p>
                  <p className="font-mono text-xs text-muted">Since {formatDate(a.createdAt)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAlert(a.id)}
                  className="font-mono text-xs uppercase tracking-widest underline-anim"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            No alerts set. Visit a designer or a sold item to set one.
          </p>
        ))}

      {tab === 'Selling' && (
        <p className="font-mono text-xs uppercase tracking-widest text-muted">No active submissions.</p>
      )}
    </div>
  );
}
