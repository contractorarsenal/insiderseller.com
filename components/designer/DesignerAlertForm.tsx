'use client';

import { useState } from 'react';
import { useAlertsStore } from '@/lib/store/alerts';

export default function DesignerAlertForm({ designer }: { designer: string }) {
  const add = useAlertsStore((s) => s.add);
  const [size, setSize] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    add({ designer, size: size || undefined });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="font-sans text-sm uppercase tracking-wide text-black">
        You&rsquo;ll be alerted when new {designer} arrives.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder="SIZE (OPTIONAL)"
        aria-label="Preferred size"
        className="flex-1 border border-black/20 bg-transparent px-4 py-3 font-mono text-xs uppercase tracking-widest placeholder:text-black/30 focus:border-black focus:outline-none"
      />
      <button
        type="submit"
        className="whitespace-nowrap bg-black px-6 py-3 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:bg-charcoal"
      >
        Alert Me When New {designer} Arrives
      </button>
    </form>
  );
}
