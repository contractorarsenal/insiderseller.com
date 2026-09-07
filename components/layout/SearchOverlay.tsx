'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useUIStore } from '@/lib/store/ui';
import { designers } from '@/lib/data/designers';
import { searchProducts } from '@/lib/data/products';
import { formatPrice, cn } from '@/lib/utils';
import Plate from '@/components/ui/Plate';
import { brandInitials } from '@/lib/utils';

const TRENDING = ['Chrome Hearts', 'Rick Owens', 'Acne Studios', 'ERD', 'Margiela'];

export default function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
      setQuery('');
    };
  }, [open, setOpen]);

  const matchedDesigners = useMemo(
    () =>
      query.trim()
        ? designers.filter((d) => d.name.toLowerCase().includes(query.trim().toLowerCase()))
        : [],
    [query]
  );

  const matchedProducts = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 6) : []), [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-edwhite animate-fade-in-fast" role="dialog" aria-modal="true">
      <div className="flex h-[58px] shrink-0 items-center justify-between px-4 md:h-20 md:px-8">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Search</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close search"
          className="font-mono text-xs uppercase tracking-widest underline-anim"
        >
          Close [Esc]
        </button>
      </div>

      <div className="border-b border-black/10 px-4 pb-6 md:px-8">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="WHAT ARE YOU LOOKING FOR?"
          aria-label="Search products and designers"
          className="w-full bg-transparent font-display text-3xl uppercase tracking-tight placeholder:text-black/25 focus:outline-none md:text-6xl"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
        {query.trim() === '' ? (
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">Trending</p>
            <ul className="space-y-4">
              {TRENDING.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    onClick={() => setQuery(t)}
                    className="font-sans text-2xl uppercase tracking-wide underline-anim md:text-3xl"
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">Designer</p>
              {matchedDesigners.length === 0 && (
                <p className="font-mono text-xs text-muted">No designer match.</p>
              )}
              <ul className="space-y-3">
                {matchedDesigners.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/designers/${d.slug}`}
                      onClick={() => setOpen(false)}
                      className="font-sans text-lg uppercase tracking-wide underline-anim"
                    >
                      {d.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">Products</p>
              {matchedProducts.length === 0 && (
                <p className="font-mono text-xs text-muted">No products match &ldquo;{query}&rdquo;.</p>
              )}
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {matchedProducts.map((p) => (
                  <li key={p.id}>
                    <Link href={`/products/${p.slug}`} onClick={() => setOpen(false)} className="group block">
                      <div className={cn('aspect-[3/4] w-full', p.status === 'SOLD' && 'opacity-60')}>
                        <Plate seed={p.slug} watermark={brandInitials(p.brand)} />
                      </div>
                      <p className="mt-2 font-sans text-xs uppercase tracking-wide">{p.brand}</p>
                      <p className="font-mono text-xs text-muted">{formatPrice(p.price)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
