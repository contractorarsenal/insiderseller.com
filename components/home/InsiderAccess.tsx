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
    <section id="insider-access" className="bg-black px-4 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <h2 className="mb-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl">
            Know before
            <br />
            everyone else.
          </h2>
          <p className="mb-10 font-sans text-sm text-white/70">
            New pieces don&rsquo;t wait around. Get first access to drops, private sourcing and archive arrivals.
          </p>
        </Reveal>

        {step === 1 && (
          <form onSubmit={submitEmail} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              aria-label="Email address"
              className="flex-1 border border-white/25 bg-transparent px-4 py-4 text-center font-mono text-xs uppercase tracking-widest text-white placeholder:text-white/30 focus:border-white focus:outline-none sm:text-left"
            />
            <button
              type="submit"
              className="whitespace-nowrap bg-yellow px-6 py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors duration-200 hover:bg-black hover:text-yellow"
            >
              Get Access
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitPhone} className="mx-auto flex max-w-md flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/50">
              Optional — text alerts for drops
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="PHONE NUMBER (OPTIONAL)"
                aria-label="Phone number"
                className="flex-1 border border-white/25 bg-transparent px-4 py-4 text-center font-mono text-xs uppercase tracking-widest text-white placeholder:text-white/30 focus:border-white focus:outline-none sm:text-left"
              />
              <button
                type="submit"
                className="whitespace-nowrap bg-yellow px-6 py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors duration-200 hover:bg-black hover:text-yellow"
              >
                Continue
              </button>
            </div>
          </form>
        )}

        {step === 3 && <p className="font-sans text-lg uppercase tracking-wide text-yellow">You&rsquo;re in.</p>}

        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/40">
          No spam. Only when it matters.
        </p>
      </div>
    </section>
  );
}
