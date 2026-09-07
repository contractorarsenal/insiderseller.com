'use client';

import { Category, ConditionGrade } from '@/lib/types';
import { designers } from '@/lib/data/designers';
import { cn } from '@/lib/utils';

export interface ShopFilters {
  brands: string[];
  categories: Category[];
  sizes: string[];
  conditions: ConditionGrade[];
  availability: 'ALL' | 'AVAILABLE' | 'SOLD';
  price: [number, number];
}

const ALL_CATEGORIES: Category[] = ['OUTERWEAR', 'TOPS', 'BOTTOMS', 'FOOTWEAR', 'ACCESSORIES', 'JEWELRY'];
const ALL_CONDITIONS: ConditionGrade[] = ['PRISTINE', 'EXCELLENT', 'GOOD', 'ARCHIVAL WEAR'];
const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '30', '31', '32', '40', '42', '43', '46', '48'];
const PRICE_BRACKETS: [number, number][] = [
  [0, 300],
  [300, 700],
  [700, 1500],
  [1500, 5000],
];

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function FilterSidebar({
  filters,
  onChange,
}: {
  filters: ShopFilters;
  onChange: (f: ShopFilters) => void;
}) {
  return (
    <div className="space-y-8">
      <FilterGroup title="Designer">
        {designers.map((d) => (
          <Checkbox
            key={d.slug}
            label={d.name}
            checked={filters.brands.includes(d.slug)}
            onChange={() => onChange({ ...filters, brands: toggleValue(filters.brands, d.slug) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Category">
        {ALL_CATEGORIES.map((c) => (
          <Checkbox
            key={c}
            label={c}
            checked={filters.categories.includes(c)}
            onChange={() => onChange({ ...filters, categories: toggleValue(filters.categories, c) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ ...filters, sizes: toggleValue(filters.sizes, s) })}
              className={cn(
                'border px-3 py-1.5 font-mono text-xs uppercase tracking-widest',
                filters.sizes.includes(s) ? 'border-black bg-black text-white' : 'border-black/20 hover:border-black'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Condition">
        {ALL_CONDITIONS.map((c) => (
          <Checkbox
            key={c}
            label={c}
            checked={filters.conditions.includes(c)}
            onChange={() => onChange({ ...filters, conditions: toggleValue(filters.conditions, c) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {PRICE_BRACKETS.map(([lo, hi]) => (
          <Checkbox
            key={`${lo}-${hi}`}
            label={`$${lo} — $${hi}`}
            checked={filters.price[0] === lo && filters.price[1] === hi}
            onChange={() =>
              onChange({
                ...filters,
                price: filters.price[0] === lo && filters.price[1] === hi ? [0, Infinity] : [lo, hi],
              })
            }
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        {(['ALL', 'AVAILABLE', 'SOLD'] as const).map((a) => (
          <Checkbox
            key={a}
            label={a}
            checked={filters.availability === a}
            onChange={() => onChange({ ...filters, availability: a })}
            radio
          />
        ))}
      </FilterGroup>

      <button
        type="button"
        onClick={() =>
          onChange({ brands: [], categories: [], sizes: [], conditions: [], availability: 'ALL', price: [0, Infinity] })
        }
        className="font-mono text-xs uppercase tracking-widest text-muted underline-anim"
      >
        Clear All
      </button>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-black/10 pb-6">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
  radio = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  radio?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 font-sans text-sm">
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center border border-black/30',
          radio && 'rounded-full',
          checked && 'border-black bg-black'
        )}
      >
        {checked && <span className={cn('h-1.5 w-1.5 bg-yellow', radio && 'rounded-full')} />}
      </span>
      <input type={radio ? 'radio' : 'checkbox'} checked={checked} onChange={onChange} className="sr-only" />
      <span className="uppercase tracking-wide">{label}</span>
    </label>
  );
}
