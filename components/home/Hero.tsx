import Link from 'next/link';
import Plate from '@/components/ui/Plate';

const LINES = ['The inside', 'isn’t for', 'everyone.'];

export default function Hero() {
  return (
    <section className="relative flex h-[80svh] w-full items-end overflow-hidden bg-black text-white md:h-[calc(100vh-80px-30px)]">
      <div className="absolute inset-0">
        <Plate seed="hero-drop-001" tone="dark" />
      </div>

      <div className="relative z-10 flex w-full flex-col gap-6 px-4 pb-10 md:px-8 md:pb-16">
        <p
          className="animate-fade-in font-mono text-xs uppercase tracking-widest text-white/70"
          style={{ animationDelay: '500ms' }}
        >
          Drop 001 / 2026
        </p>
        <h1 className="max-w-3xl font-display text-[13vw] font-bold uppercase leading-[0.92] tracking-tight md:text-[6.5vw]">
          {LINES.map((line, i) => (
            <span key={line} className="line-mask">
              <span className="line-inner" style={{ ['--line-delay' as string]: `${i * 120}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="animate-fade-in" style={{ animationDelay: '650ms' }}>
          <Link
            href="/shop?sort=newest"
            className="inline-block bg-yellow px-7 py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors duration-200 hover:bg-black hover:text-yellow"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
