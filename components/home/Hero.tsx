import Link from 'next/link';
import Plate from '@/components/ui/Plate';
import ParallaxLayer from '@/components/ui/ParallaxLayer';

const LINES = ['The', 'inside', 'isn’t for', 'everyone.'];

export default function Hero() {
  return (
    <section className="relative flex h-[calc(100svh-94px)] w-full overflow-hidden bg-black text-white md:h-[calc(100vh-110px)]">
      <ParallaxLayer>
        <Plate seed="hero-drop-001" tone="dark" />
      </ParallaxLayer>

      {/* Scattered technical metadata */}
      <p className="animate-fade-in absolute left-4 top-6 font-mono text-[11px] uppercase tracking-widest text-white/60 md:left-8 md:top-8" style={{ animationDelay: '700ms' }}>
        Archive / Luxury / Culture
      </p>
      <p className="animate-fade-in absolute right-4 top-6 font-mono text-[11px] uppercase tracking-widest text-white/60 md:right-8 md:top-8" style={{ animationDelay: '800ms' }}>
        Curated 2026
      </p>
      <p className="animate-fade-in absolute bottom-6 right-4 font-mono text-[11px] uppercase tracking-widest text-white/40 md:right-8" style={{ animationDelay: '900ms' }}>
        01 / 04
      </p>

      <div className="relative z-10 flex w-full flex-1 flex-col justify-end gap-7 px-4 pb-12 md:px-8 md:pb-16">
        <p
          className="animate-fade-in font-mono text-xs uppercase tracking-widest text-white/70"
          style={{ animationDelay: '500ms' }}
        >
          Drop 001 / 2026
        </p>
        <h1 className="max-w-4xl font-display text-hero font-black uppercase tracking-tight">
          {LINES.map((line, i) => (
            <span key={line} className="line-mask">
              <span className="line-inner" style={{ ['--line-delay' as string]: `${i * 110}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="animate-fade-in" style={{ animationDelay: '750ms' }}>
          <Link
            href="/shop?sort=newest"
            className="wipe-btn inline-flex bg-yellow px-8 py-4 font-sans text-sm uppercase tracking-widest text-black"
          >
            <span className="wipe-btn-fill" aria-hidden="true" />
            <span className="wipe-btn-label">Shop The Drop →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
