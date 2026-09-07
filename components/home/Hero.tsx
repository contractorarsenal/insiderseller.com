import Link from 'next/link';
import Plate from '@/components/ui/Plate';

export default function Hero() {
  return (
    <section className="relative flex h-[80svh] w-full items-end overflow-hidden bg-black text-white md:h-[calc(100vh-80px-30px)]">
      <div className="absolute inset-0">
        <Plate seed="hero-drop-001" tone="dark" />
      </div>

      <div className="relative z-10 flex w-full flex-col gap-6 px-4 pb-10 md:px-8 md:pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-white/70">Drop 001 / 2026</p>
        <h1 className="max-w-3xl font-sans text-[13vw] font-medium uppercase leading-[0.92] tracking-tight md:text-[6.5vw]">
          The inside isn&rsquo;t for everyone.
        </h1>
        <div>
          <Link
            href="/shop?sort=newest"
            className="inline-block bg-yellow px-7 py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-white"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
