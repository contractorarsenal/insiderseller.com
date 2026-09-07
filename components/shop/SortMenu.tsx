'use client';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'designer';

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low – High' },
  { value: 'price-desc', label: 'Price: High – Low' },
  { value: 'designer', label: 'Designer' },
];

export default function SortMenu({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  return (
    <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
      <span className="text-muted">Sort</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border-b border-black/30 bg-transparent py-1 font-mono text-xs uppercase tracking-widest focus:border-black focus:outline-none"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
