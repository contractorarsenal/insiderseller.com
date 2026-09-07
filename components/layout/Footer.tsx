import Image from 'next/image';
import Link from 'next/link';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/shop?sort=newest' },
      { label: 'Designers', href: '/designers' },
      { label: 'Archive', href: '/archive' },
      { label: 'Clothing', href: '/shop?category=TOPS' },
      { label: 'Footwear', href: '/shop?category=FOOTWEAR' },
      { label: 'Accessories', href: '/shop?category=ACCESSORIES' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Sell To Us', href: '/sell' },
      { label: 'Source An Item', href: '/source' },
      { label: 'Authenticity', href: '/authenticity' },
      { label: 'Shipping', href: '/faq#shipping' },
      { label: 'Returns', href: '/faq#returns' },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Instagram', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1728px] px-4 py-16 md:px-8">
        <div className="mb-14 flex items-center gap-4 md:gap-6">
          <Image
            src="/insider-sellers-logo.png"
            alt="Insider Sellers"
            width={90}
            height={75}
            className="h-10 w-auto shrink-0 md:h-14"
          />
          <div className="font-display text-[11vw] font-black uppercase leading-none tracking-tight sm:text-6xl md:text-7xl">
            Insider Sellers
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-white/50">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="font-sans text-sm uppercase tracking-wide underline-anim">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-white/50">Insider Access</p>
            <p className="mb-4 font-sans text-sm text-white/70">First access to drops and archive arrivals.</p>
            <Link
              href="/#insider-access"
              className="inline-block border border-white/40 px-4 py-2 font-mono text-xs uppercase tracking-widest underline-anim"
            >
              Get Access
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-[1728px] flex-col gap-4 font-mono text-[11px] uppercase tracking-widest text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Insider Sellers</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="underline-anim">
              Privacy
            </Link>
            <Link href="/terms" className="underline-anim">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
