import Link from 'next/link';
import Plate from '@/components/ui/Plate';

const PANELS = [
  { label: 'Clothing', href: '/shop?category=TOPS', seed: 'cat-clothing' },
  { label: 'Footwear', href: '/shop?category=FOOTWEAR', seed: 'cat-footwear' },
  { label: 'Accessories', href: '/shop?category=ACCESSORIES', seed: 'cat-accessories' },
];

function Panel({ label, href, seed, className }: { label: string; href: string; seed: string; className?: string }) {
  return (
    <Link href={href} className={`group relative block aspect-[4/5] overflow-hidden bg-black md:aspect-auto md:h-full ${className ?? ''}`}>
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        <Plate seed={seed} tone="dark" />
      </div>
      <div className="absolute inset-0 flex flex-col items-start justify-end p-6 transition-transform duration-300 group-hover:-translate-y-1 md:p-8">
        <span className="font-display text-3xl font-black uppercase tracking-wide text-white md:text-5xl">{label}</span>
        <span className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Shop {label} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function Categories() {
  return (
    <section className="grid grid-cols-1 gap-px bg-black/10 md:h-[840px] md:grid-cols-12">
      <Panel {...PANELS[0]} className="md:col-span-7" />
      <div className="grid grid-rows-2 gap-px md:col-span-5">
        <Panel {...PANELS[1]} />
        <Panel {...PANELS[2]} />
      </div>
    </section>
  );
}
