import type { Metadata } from 'next';
import Link from 'next/link';
import { designers } from '@/lib/data/designers';
import SellWizard from '@/components/sell/SellWizard';

export const metadata: Metadata = {
  title: 'Sell To Us',
  description: 'We buy and consign select designer, archive and streetwear. Chrome Hearts, Rick Owens, Margiela, ERD and more.',
};

const WANTED = ['Chrome Hearts', 'Rick Owens', 'ERD', 'Margiela', 'Acne Studios', 'Saint Laurent', 'Kapital', 'Select Archive'];

const STEPS = [
  { n: '01', label: 'Submit' },
  { n: '02', label: 'We Review' },
  { n: '03', label: 'Get An Offer' },
  { n: '04', label: 'Get Paid' },
];

export default function SellPage() {
  return (
    <div>
      <section className="bg-yellow px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-tight text-black sm:text-6xl md:text-8xl">
            Sell us
            <br />
            what&rsquo;s worth
            <br />
            finding.
          </h1>
          <p className="mb-8 max-w-md font-sans text-sm text-black/80 md:text-base">
            We buy and consign select designer, archive and streetwear.
          </p>
          <Link
            href="#submit"
            className="inline-block bg-black px-7 py-4 font-sans text-sm uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            Start Submission →
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted">What We Want</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {WANTED.map((w) => (
            <span key={w} className="font-sans text-2xl uppercase tracking-tight md:text-3xl">
              {w}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-6 border-t border-black/10 px-4 py-16 md:grid-cols-4 md:px-8">
        {STEPS.map((s) => (
          <div key={s.n}>
            <p className="mb-2 font-mono text-2xl text-muted">{s.n}</p>
            <p className="font-sans text-lg uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </section>

      <div className="border-t border-black/10">
        <SellWizard />
      </div>
    </div>
  );
}
