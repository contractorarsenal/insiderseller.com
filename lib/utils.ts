export function formatPrice(value: number): string {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

export function cn(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(' ');
}

export function brandInitials(brand: string): string {
  const words = brand.replace(/[^A-Za-z\s]/g, '').split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.map((w) => w[0]).join('').slice(0, 3).toUpperCase();
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/\//g, '.');
}
