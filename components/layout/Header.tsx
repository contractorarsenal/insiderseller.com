'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';
import MegaMenu from './MegaMenu';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const cartCount = useCartStore((s) => s.productIds.length);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full bg-edwhite transition-[border-color] duration-300',
        'border-b',
        scrolled ? 'border-black/10' : 'border-transparent'
      )}
      onMouseLeave={() => setShopOpen(false)}
    >
      <div className="relative flex h-[58px] items-center justify-between px-4 md:h-20 md:px-8">
        {/* Left / Mobile menu button */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            className="flex items-center font-mono text-xs uppercase tracking-widest lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            <div onMouseEnter={() => setShopOpen(true)}>
              <button
                type="button"
                className="font-sans text-sm uppercase tracking-wide underline-anim"
                aria-expanded={shopOpen}
              >
                Shop
              </button>
            </div>
            <Link href="/designers" className="font-sans text-sm uppercase tracking-wide underline-anim">
              Designers
            </Link>
            <Link href="/archive" className="font-sans text-sm uppercase tracking-wide underline-anim">
              Archive
            </Link>
          </nav>
        </div>

        {/* Center logo */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-base font-medium uppercase tracking-widest md:text-lg"
        >
          Insider Sellers
        </Link>

        {/* Right */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="font-mono text-xs uppercase tracking-widest underline-anim hidden sm:inline"
          >
            Search
          </button>
          <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search" className="sm:hidden">
            <SearchIcon />
          </button>
          <Link href="/sell" className="hidden font-mono text-xs uppercase tracking-widest underline-anim lg:inline">
            Sell
          </Link>
          <Link href="/account" className="hidden font-mono text-xs uppercase tracking-widest underline-anim lg:inline">
            Account
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Cart, ${cartCount} items`}
            className="font-mono text-xs uppercase tracking-widest"
          >
            <span className="hidden sm:inline">Cart ({cartCount})</span>
            <span className="sm:hidden">Bag ({cartCount})</span>
          </button>
        </div>
      </div>

      {shopOpen && (
        <div onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
          <MegaMenu onNavigate={() => setShopOpen(false)} />
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
      <line x1="12.6" y1="12.6" x2="17" y2="17" stroke="currentColor" />
    </svg>
  );
}
