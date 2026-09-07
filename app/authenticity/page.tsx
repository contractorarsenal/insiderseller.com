import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authenticity',
  description: 'How Insider Sellers sources, inspects and documents every piece before it is listed.',
};

const STEPS = [
  { n: '01', label: 'Source', copy: 'Every piece starts with sourcing — from consignors, private sellers and our own network.' },
  { n: '02', label: 'Inspect', copy: 'Each item is examined in person before it is listed for sale.' },
  { n: '03', label: 'Verify', copy: 'Details are checked against what we know of the piece — construction, hardware, tagging.' },
  { n: '04', label: 'Document', copy: 'Condition, flaws and measurements are recorded and shown as part of the listing.' },
  { n: '05', label: 'List', copy: 'Only after inspection does a piece go live.' },
];

export default function AuthenticityPage() {
  return (
    <div>
      <section className="bg-black px-4 py-24 text-white md:px-8 md:py-32">
        <h1 className="max-w-2xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
          No question
          <br />
          about it.
        </h1>
      </section>

      <section className="px-4 py-16 md:px-8">
        <p className="max-w-xl font-sans text-lg text-black/75">
          Every item listed on Insider Sellers is inspected before it goes live. If an item is ever determined not to
          be authentic, you receive a full refund.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-10 border-t border-black/10 px-4 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-5">
        {STEPS.map((s) => (
          <div key={s.n}>
            <p className="mb-3 font-mono text-2xl text-muted">{s.n}</p>
            <p className="mb-2 font-sans text-lg uppercase tracking-wide">{s.label}</p>
            <p className="font-sans text-sm text-black/65">{s.copy}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-black/10 bg-archive px-4 py-16 md:px-8">
        <p className="max-w-xl font-mono text-xs uppercase tracking-widest text-muted">
          Specific inspection methods, tooling and any third-party partnerships will be detailed here as our
          operational process is finalized.
        </p>
      </section>
    </div>
  );
}
