import Link from 'next/link';
import Plate from '@/components/ui/Plate';

const CATEGORIES = [
  { label: 'NEW ARRIVALS', href: '/shop?sort=newest' },
  { label: 'ALL', href: '/shop' },
  { label: 'OUTERWEAR', href: '/shop?category=OUTERWEAR' },
  { label: 'TOPS', href: '/shop?category=TOPS' },
  { label: 'BOTTOMS', href: '/shop?category=BOTTOMS' },
  { label: 'FOOTWEAR', href: '/shop?category=FOOTWEAR' },
  { label: 'ACCESSORIES', href: '/shop?category=ACCESSORIES' },
  { label: 'JEWELRY', href: '/shop?category=JEWELRY' },
];

const FEATURED = [
  { label: 'CHROME HEARTS', href: '/designers/chrome-hearts' },
  { label: 'RICK OWENS', href: '/designers/rick-owens' },
  { label: 'ACNE STUDIOS', href: '/designers/acne-studios' },
  { label: 'ERD', href: '/designers/erd' },
  { label: 'MARGIELA', href: '/designers/maison-margiela' },
];

export default function MegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-full z-30 hidden animate-fade-in border-t border-black/10 bg-edwhite lg:block">
      <div className="mx-auto grid max-w-[1728px] grid-cols-12 gap-8 px-8 py-10">
        <div className="col-span-3">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">Shop</p>
          <ul className="space-y-3">
            {CATEGORIES.map((c) => (
              <li key={c.label}>
                <Link href={c.href} onClick={onNavigate} className="font-sans text-lg uppercase tracking-wide underline-anim">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted">Featured</p>
          <ul className="space-y-3">
            {FEATURED.map((f) => (
              <li key={f.label}>
                <Link href={f.href} onClick={onNavigate} className="font-sans text-lg uppercase tracking-wide underline-anim">
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/designers"
            onClick={onNavigate}
            className="mt-6 inline-block font-mono text-xs uppercase tracking-widest underline-anim"
          >
            View All Designers →
          </Link>
        </div>
        <div className="col-span-6">
          <Link href="/shop?sort=newest" onClick={onNavigate} className="block h-[280px] w-full">
            <Plate seed="megamenu-editorial" tone="dark" watermark="JUST IN" label="EDITORIAL" />
          </Link>
        </div>
      </div>
    </div>
  );
}
