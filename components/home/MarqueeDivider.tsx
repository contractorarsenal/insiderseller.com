const TEXT = 'CHROME HEARTS / RICK OWENS / ACNE STUDIOS / ERD / MARGIELA / SAINT LAURENT / KAPITAL / ALYX / ';

export default function MarqueeDivider() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-black py-5">
      <div className="flex w-max shrink-0 animate-marquee">
        <span className="shrink-0 whitespace-nowrap pr-6 font-mono text-sm uppercase tracking-widest text-white md:text-base">
          {TEXT.repeat(4)}
        </span>
        <span className="shrink-0 whitespace-nowrap pr-6 font-mono text-sm uppercase tracking-widest text-white md:text-base" aria-hidden="true">
          {TEXT.repeat(4)}
        </span>
      </div>
    </div>
  );
}
