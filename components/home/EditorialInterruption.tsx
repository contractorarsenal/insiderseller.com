import Link from 'next/link';
import Plate from '@/components/ui/Plate';
import Reveal from '@/components/ui/Reveal';
import ParallaxLayer from '@/components/ui/ParallaxLayer';

export default function EditorialInterruption() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-black text-white md:min-h-screen">
      <ParallaxLayer>
        <Plate seed="editorial-heavy-metal" tone="dark" watermark="CHROME" />
      </ParallaxLayer>

      <Reveal className="relative z-10 flex h-full min-h-[85vh] flex-col justify-end px-4 pb-14 md:min-h-screen md:px-8 md:pb-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-white/60">Curated Series / 001</p>
        <h2 className="max-w-4xl font-display text-section font-black uppercase leading-[0.85] tracking-tight">
          Heavy
          <br />
          Metal.
        </h2>
        <p className="mt-6 max-w-sm font-sans text-sm text-white/70">
          Chrome Hearts. Silver hardware. Leather. Pieces that don&rsquo;t need explaining.
        </p>
        <Link
          href="/designers/chrome-hearts"
          className="arrow-cta mt-7 inline-block font-mono text-sm uppercase tracking-widest text-yellow underline-anim"
        >
          Shop Chrome Hearts <span className="arrow-cta-glyph inline-block">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
