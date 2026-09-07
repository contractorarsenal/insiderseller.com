import Link from 'next/link';
import Plate from '@/components/ui/Plate';
import Reveal from '@/components/ui/Reveal';

export default function EditorialInterruption() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="aspect-[4/5] w-full md:aspect-auto">
        <Plate seed="editorial-heavy-metal" tone="dark" watermark="CHROME" />
      </div>
      <Reveal className="flex flex-col justify-center bg-black px-6 py-16 text-white md:px-14">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/50">Curated Series / 001</p>
        <h2 className="mb-6 font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight md:text-6xl">
          Heavy
          <br />
          Metal
        </h2>
        <p className="mb-8 max-w-sm font-sans text-sm text-white/70">
          Chrome Hearts, silver hardware, leather and the pieces that never stay available for long.
        </p>
        <Link href="/designers/chrome-hearts" className="font-mono text-sm uppercase tracking-widest text-yellow underline-anim">
          Shop Chrome Hearts →
        </Link>
      </Reveal>
    </section>
  );
}
