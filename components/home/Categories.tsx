import Link from 'next/link';
import Plate from '@/components/ui/Plate';

const CATEGORIES = [
  { label: 'Clothing', href: '/shop?category=TOPS', seed: 'cat-clothing' },
  { label: 'Footwear', href: '/shop?category=FOOTWEAR', seed: 'cat-footwear' },
  { label: 'Accessories', href: '/shop?category=ACCESSORIES', seed: 'cat-accessories' },
];

export default function Categories() {
  return (
    <section className="grid grid-cols-1 gap-px bg-black/10 sm:grid-cols-3">
      {CATEGORIES.map((c) => (
        <Link key={c.label} href={c.href} className="group relative block aspect-[4/5] overflow-hidden bg-black">
          <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            <Plate seed={c.seed} tone="dark" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
            {c.label}
          </span>
        </Link>
      ))}
    </section>
  );
}
