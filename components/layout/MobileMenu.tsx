'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useUIStore } from '@/lib/store/ui';
import { cn } from '@/lib/utils';

const PRIMARY = [
  { label: 'SHOP', href: '/shop' },
  { label: 'DESIGNERS', href: '/designers' },
  { label: 'ARCHIVE', href: '/archive' },
  { label: 'SELL TO US', href: '/sell', accent: true },
];

const SECONDARY = [
  { label: 'Account', href: '/account' },
  { label: 'About', href: '/about' },
  { label: 'Authenticity', href: '/authenticity' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileMenu() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, setOpen]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-black text-white transition-transform duration-300 ease-out lg:hidden',
        open ? 'translate-x-0' : '-translate-x-full pointer-events-none'
      )}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="flex h-[58px] items-center justify-between px-4">
        <span className="font-sans text-sm uppercase tracking-widest">Insider Sellers</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="font-mono text-xs uppercase tracking-widest text-white/70"
        >
          Close
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
        {PRIMARY.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              'py-2 font-sans text-[13vw] font-medium uppercase leading-[1.02] tracking-tight xs:text-5xl',
              item.accent ? 'text-yellow' : 'text-white'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 px-6 py-8">
        {SECONDARY.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            className="font-mono text-xs uppercase tracking-widest text-white/60"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
