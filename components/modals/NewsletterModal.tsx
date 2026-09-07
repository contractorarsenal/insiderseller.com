'use client';

import { useEffect, useRef, useState } from 'react';
import Plate from '@/components/ui/Plate';
import Logo from '@/components/ui/Logo';
import { useInteractionStore } from '@/lib/store/interactions';
import { useModalA11y } from '@/lib/hooks/useModalA11y';

type PopupState = 'neverShown' | 'open' | 'submitted' | 'dismissed';

const DISMISSED_KEY = 'insider-access-dismissed';
const SUBMITTED_KEY = 'insider-access-submitted';

const DISMISS_SUPPRESS_DAYS = 7;
const TIMER_DELAY_MS = 18000; // within the 15-25s window
const SCROLL_DEPTH_THRESHOLD = 0.5;
const INTERACTION_THRESHOLD = 3;

export default function NewsletterModal() {
  const [state, setState] = useState<PopupState>('neverShown');
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');

  const stateRef = useRef<PopupState>('neverShown');
  const hasTriggeredRef = useRef(false);

  const interactionCount = useInteractionStore((s) => s.count);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  function openPopup() {
    // Synchronous, immediate guard — not dependent on React re-render timing,
    // so a stray late-firing listener can never reopen a popup that has
    // already been triggered, dismissed, or submitted.
    if (hasTriggeredRef.current) return;
    if (stateRef.current !== 'neverShown') return;
    hasTriggeredRef.current = true;
    setState('open');
    setVisible(true);
  }

  // Arm the auto-trigger exactly once per page load, and only if the popup
  // has never been submitted and isn't within its post-dismiss suppression
  // window. All listeners are torn down the instant any one of them fires,
  // so there is no path back to "open" afterward except a fresh page load.
  useEffect(() => {
    let submitted = false;
    let dismissedAt: number | null = null;
    try {
      submitted = localStorage.getItem(SUBMITTED_KEY) === '1';
      const raw = localStorage.getItem(DISMISSED_KEY);
      dismissedAt = raw ? Number(raw) : null;
    } catch {
      /* localStorage unavailable (private mode, etc) — treat as neverShown */
    }

    if (submitted) {
      setState('submitted');
      return;
    }

    if (dismissedAt && Date.now() - dismissedAt < DISMISS_SUPPRESS_DAYS * 86400000) {
      setState('dismissed');
      return;
    }

    const timer = setTimeout(openPopup, TIMER_DELAY_MS);

    const onScroll = () => {
      const doc = document.documentElement;
      const pct = doc.scrollHeight > 0 ? (window.scrollY + window.innerHeight) / doc.scrollHeight : 0;
      if (pct > SCROLL_DEPTH_THRESHOLD) openPopup();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Third OR-condition: enough product interactions elsewhere on the site.
  useEffect(() => {
    if (interactionCount >= INTERACTION_THRESHOLD) openPopup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactionCount]);

  const dialogRef = useModalA11y(visible, handleDismiss);

  function handleDismiss() {
    setVisible(false);
    setState('dismissed');
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
      /* no-op */
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('submitted');
    try {
      localStorage.setItem(SUBMITTED_KEY, '1');
    } catch {
      /* no-op */
    }
    setTimeout(() => setVisible(false), 1800);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 motion-safe:animate-fade-in-fast"
      onClick={handleDismiss}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Insider Access signup"
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-[880px] grid-cols-1 bg-edwhite shadow-none motion-safe:animate-modal-in md:grid-cols-2"
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 font-mono text-[11px] uppercase tracking-widest text-black/60 transition-colors hover:text-black md:text-white/70 md:hover:text-white"
        >
          Close ✕
        </button>

        <div className="hidden md:block">
          <Plate seed="newsletter-modal" tone="dark" watermark="ACCESS" />
        </div>

        <div className="flex flex-col justify-center px-8 py-14 md:px-12">
          <Logo className="mb-8 h-20 md:h-24" />
          {state === 'submitted' ? (
            <>
              <p className="mb-2 font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight">
                You&rsquo;re in.
              </p>
              <p className="font-mono text-xs text-muted">Watch your inbox for what comes next.</p>
            </>
          ) : (
            <>
              <h2 className="mb-4 font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-6xl">
                Get
                <br />
                Inside.
              </h2>
              <p className="mb-8 max-w-xs font-sans text-sm text-black/70">
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
                  className="border border-black/20 bg-transparent px-4 py-4 font-mono text-xs uppercase tracking-widest placeholder:text-black/30 focus:border-black focus:outline-none"
                />
                <button type="submit" className="wipe-btn bg-yellow py-4 font-sans text-sm uppercase tracking-widest text-black">
                  <span className="wipe-btn-fill" aria-hidden="true" />
                  <span className="wipe-btn-label">Get Access</span>
                </button>
              </form>
              <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-muted">
                No discounts.
                <br />
                No spam. Just access.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
