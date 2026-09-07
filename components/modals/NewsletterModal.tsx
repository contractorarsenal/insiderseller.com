'use client';

import { useEffect, useState } from 'react';
import Plate from '@/components/ui/Plate';

const STORAGE_KEY = 'insider-newsletter-dismissed';

export default function NewsletterModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 15000);

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight > 0 && scrolled / docHeight > 0.55) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* no-op */
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* no-op */
    }
    setTimeout(() => setVisible(false), 1800);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 animate-fade-in-fast">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Insider access signup"
        className="relative grid w-full max-w-3xl grid-cols-1 bg-edwhite md:grid-cols-2"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 font-mono text-[11px] uppercase tracking-widest text-black/60 hover:text-black md:text-white/70 md:hover:text-white"
        >
          Close ✕
        </button>

        <div className="hidden md:block">
          <Plate seed="newsletter-modal" tone="dark" watermark="ACCESS" />
        </div>

        <div className="flex flex-col justify-center px-6 py-10 md:px-10">
          {submitted ? (
            <>
              <p className="mb-2 font-sans text-2xl uppercase tracking-tight">You&rsquo;re in.</p>
              <p className="font-mono text-xs text-muted">Watch your inbox for what comes next.</p>
            </>
          ) : (
            <>
              <h2 className="mb-3 font-sans text-3xl font-medium uppercase leading-[0.95] tracking-tight md:text-4xl">
                Get Inside.
              </h2>
              <p className="mb-6 font-sans text-sm text-black/70">
                First access to new drops, rare arrivals and private sourcing.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  aria-label="Email address"
                  className="border border-black/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-widest placeholder:text-black/30 focus:border-black focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-yellow py-3 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-yellow"
                >
                  Get Access
                </button>
              </form>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
                No discounts. No spam. Just access.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
