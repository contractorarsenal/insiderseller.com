'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';
import MegaMenu from './MegaMenu';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const cartCount = useCartStore((s) => s.productIds.length);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 w-full bg-yellow text-black"
      onMouseLeave={() => setShopOpen(false)}
    >
      <div
        className={cn(
          'relative mx-auto flex max-w-[1728px] items-center justify-between px-4 transition-[height] duration-300 md:px-8',
          scrolled ? 'h-[60px] md:h-[68px]' : 'h-[64px] md:h-[80px]'
        )}
      >
        {/* Left / Mobile menu button */}
        <div className="flex items-center gap-9">
          <button
            type="button"
            className="flex items-center font-mono text-xs uppercase tracking-widest lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>

          <nav className="hidden items-center gap-9 lg:flex">
            <div onMouseEnter={() => setShopOpen(true)}>
              <button
                type="button"
                className="font-sans text-[13px] font-medium uppercase tracking-wide underline-anim"
                aria-expanded={shopOpen}
              >
                Shop
              </button>
            </div>
            <Link href="/designers" className="font-sans text-[13px] font-medium uppercase tracking-wide underline-anim">
              Designers
            </Link>
            <Link href="/archive" className="font-sans text-[13px] font-medium uppercase tracking-wide underline-anim">
              Archive
            </Link>
            <Link href="/sell" className="font-sans text-[13px] font-medium uppercase tracking-wide underline-anim">
              Sell
            </Link>
            <Link href="/about" className="font-sans text-[13px] font-medium uppercase tracking-wide underline-anim">
              About
            </Link>
          </nav>
        </div>

        {/* Center logo — allowed to overlap the yellow bar's bottom edge */}
        <Link
          href="/"
          aria-label="Insider Sellers — home"
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-[42%]"
        >
          <Logo
            priority
            className={cn('transition-[height] duration-300', scrolled ? 'h-[52px] md:h-[64px]' : 'h-[60px] md:h-[76px]')}
          />
        </Link>

        {/* Right */}
        <div className="flex items-center gap-5 md:gap-7">
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
