'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';

export default function InsiderAccess() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStep(2);
  }

  function submitPhone(e: React.FormEvent) {
    e.preventDefault();
    setStep(3);
  }

  return (
    <section id="insider-access" className="min-h-[75vh] bg-black px-4 py-24 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-section font-black uppercase leading-[0.85] tracking-tight">
            Know before
            <br />
            everyone else.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-10 max-w-lg md:mt-14">
          <p className="mb-8 font-sans text-sm text-white/70">
            New pieces don&rsquo;t wait around. Get first access to drops, private sourcing and archive arrivals.
          </p>

          {step === 1 && (
            <form onSubmit={submitEmail} className="border-b border-white/30 pb-4">
              <div className="flex items-end gap-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  aria-label="Email address"
                  className="flex-1 bg-transparent font-display text-2xl uppercase tracking-tight text-white placeholder:text-white/25 focus:outline-none md:text-3xl"
                />
                <button type="submit" className="arrow-cta shrink-0 pb-2 font-mono text-xs uppercase tracking-widest text-yellow">
                  Get Access <span className="arrow-cta-glyph inline-block">→</span>
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submitPhone} className="border-b border-white/30 pb-4">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/50">
                Optional — text alerts for drops
              </p>
              <div className="flex items-end gap-4">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="PHONE NUMBER"
                  aria-label="Phone number"
                  className="flex-1 bg-transparent font-display text-2xl uppercase tracking-tight text-white placeholder:text-white/25 focus:outline-none md:text-3xl"
                />
                <button type="submit" className="arrow-cta shrink-0 pb-2 font-mono text-xs uppercase tracking-widest text-yellow">
                  Continue <span className="arrow-cta-glyph inline-block">→</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <p className="border-b border-white/30 pb-4 font-display text-2xl font-bold uppercase tracking-tight text-yellow md:text-3xl">
              You&rsquo;re in.
            </p>
          )}

          <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-white/40">
            No discounts.
            <br />
            No spam. Just access.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
