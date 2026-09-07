const TEXT = 'CURATED / AUTHENTICATED / ONE OF ONE / DESIGNER ARCHIVE / INSIDER SELLERS / ';

export default function MarqueeDivider() {
  return (
    <div className="overflow-hidden border-y border-black/10 bg-edwhite py-4">
      <div className="flex w-max shrink-0 animate-marquee">
        <span className="shrink-0 whitespace-nowrap pr-6 font-mono text-sm uppercase tracking-widest md:text-base">
          {TEXT.repeat(4)}
        </span>
        <span className="shrink-0 whitespace-nowrap pr-6 font-mono text-sm uppercase tracking-widest md:text-base" aria-hidden="true">
          {TEXT.repeat(4)}
        </span>
      </div>
    </div>
  );
}
