'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data/products';
import { Category } from '@/lib/types';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar, { ShopFilters } from '@/components/shop/FilterSidebar';
import FilterDrawer from '@/components/shop/FilterDrawer';
import SortMenu, { SortOption } from '@/components/shop/SortMenu';
import { useUIStore } from '@/lib/store/ui';
import { cn } from '@/lib/utils';

const EMPTY_FILTERS: ShopFilters = {
  brands: [],
  categories: [],
  sizes: [],
  conditions: [],
  availability: 'ALL',
  price: [0, Infinity],
};

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as Category | null;
  const initialSort = (searchParams.get('sort') as SortOption | null) ?? 'newest';

  const [filters, setFilters] = useState<ShopFilters>({
    ...EMPTY_FILTERS,
    categories: initialCategory ? [initialCategory] : [],
  });
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [columns, setColumns] = useState<2 | 4>(4);
  const setFilterDrawerOpen = useUIStore((s) => s.setFilterDrawerOpen);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.brands.length && !filters.brands.includes(p.brandSlug)) return false;
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.sizes.length && !filters.sizes.includes(p.size)) return false;
      if (filters.conditions.length && !filters.conditions.includes(p.condition)) return false;
      if (filters.availability !== 'ALL' && p.status !== filters.availability) return false;
      if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'designer':
          return a.brand.localeCompare(b.brand);
        case 'newest':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

    return list;
  }, [filters, sort]);

  return (
    <div className="px-4 pb-24 pt-10 md:px-8 md:pt-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-sans text-4xl font-medium uppercase tracking-tight md:text-6xl">Shop</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">{filtered.length} Pieces</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </aside>

        <div>
          <div className="mb-8 hidden items-center justify-between border-b border-black/10 pb-4 lg:flex">
            <SortMenu value={sort} onChange={setSort} />
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <span className="text-muted">View</span>
              <button
                type="button"
                onClick={() => setColumns(4)}
                className={cn('underline-anim', columns === 4 && 'text-black', columns !== 4 && 'text-muted')}
              >
                4 Column
              </button>
              <span className="text-muted">/</span>
              <button
                type="button"
                onClick={() => setColumns(2)}
                className={cn('underline-anim', columns === 2 && 'text-black', columns !== 2 && 'text-muted')}
              >
                2 Column
              </button>
            </div>
          </div>

          <ProductGrid products={filtered} columns={columns} />
        </div>
      </div>

      <FilterDrawer filters={filters} onChange={setFilters} resultCount={filtered.length} />

      <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-black/10 bg-edwhite lg:hidden">
        <button
          type="button"
          onClick={() => setFilterDrawerOpen(true)}
          className="flex-1 border-r border-black/10 py-4 text-center font-mono text-xs uppercase tracking-widest safe-bottom"
        >
          Filter
        </button>
        <button
          type="button"
          onClick={() => setSort(sort === 'newest' ? 'price-asc' : sort === 'price-asc' ? 'price-desc' : 'newest')}
          className="flex-1 py-4 text-center font-mono text-xs uppercase tracking-widest safe-bottom"
        >
          Sort
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
