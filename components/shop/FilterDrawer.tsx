'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/store/ui';
import { cn } from '@/lib/utils';
import FilterSidebar, { ShopFilters } from './FilterSidebar';

export default function FilterDrawer({
  filters,
  onChange,
  resultCount,
}: {
  filters: ShopFilters;
  onChange: (f: ShopFilters) => void;
  resultCount: number;
}) {
  const open = useUIStore((s) => s.filterDrawerOpen);
  const setOpen = useUIStore((s) => s.setFilterDrawerOpen);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex max-h-[85svh] flex-col bg-edwhite transition-transform duration-300 ease-out lg:hidden',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-4">
          <span className="font-sans text-sm uppercase tracking-widest">Filter</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-xs uppercase tracking-widest underline-anim"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <FilterSidebar filters={filters} onChange={onChange} />
        </div>
        <div className="shrink-0 border-t border-black/10 p-5 safe-bottom">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full bg-yellow py-4 font-sans text-sm uppercase tracking-widest text-black"
          >
            Show {resultCount} Results
          </button>
        </div>
      </div>
    </>
  );
}
