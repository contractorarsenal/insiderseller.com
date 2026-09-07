import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

const WANTED = ['Chrome Hearts', 'Rick Owens', 'ERD', 'Margiela', 'Archive Designer', 'Streetwear'];

export default function SellToUsPromo() {
  return (
    <section className="flex min-h-[90vh] items-center bg-yellow px-4 py-24 md:px-8">
      <Reveal className="mx-auto w-full max-w-6xl">
        <h2 className="mb-8 font-display text-hero font-black uppercase leading-[0.85] tracking-tight text-black">
          Sell us
          <br />
          what&rsquo;s worth
          <br />
          finding.
        </h2>
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
          {WANTED.map((w) => (
            <span key={w} className="font-mono text-xs uppercase tracking-widest text-black/70">
              {w}
            </span>
          ))}
        </div>
        <Link
          href="/sell"
          className="wipe-btn wipe-btn--dark inline-flex bg-black px-8 py-5 font-sans text-sm uppercase tracking-widest text-white"
        >
          <span className="wipe-btn-fill" aria-hidden="true" />
          <span className="wipe-btn-label">Sell To Insiders →</span>
        </Link>
      </Reveal>
    </section>
  );
}
