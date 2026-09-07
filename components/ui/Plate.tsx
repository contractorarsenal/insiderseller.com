import { hashString } from '@/lib/hash';
import { cn } from '@/lib/utils';

interface PlateProps {
  seed: string;
  tone?: 'product' | 'dark';
  label?: string;
  watermark?: string;
  sub?: string;
  className?: string;
}

/**
 * Deterministic "archive plate" visual used in place of real photography.
 * Renders a grain-textured backdrop with technical corner labels — designed
 * to read as intentional archival documentation, not a broken image.
 * Swap for real photography by adding a `url` field to ProductImage later.
 */
export default function Plate({ seed, tone = 'product', label, watermark, sub, className }: PlateProps) {
  const id = `g${hashString(seed)}`;
  const angle = hashString(seed + 'a') % 180;
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden',
        dark ? 'bg-charcoal' : 'bg-archive',
        className
      )}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.9" numOctaves="2" seed={hashString(seed) % 100} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${id})`}
          opacity={dark ? 0.14 : 0.05}
          style={{ mixBlendMode: dark ? 'overlay' : 'multiply' }}
        />
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          stroke={dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}
          strokeWidth="1"
          transform={`rotate(${angle % 8} 50 50)`}
        />
      </svg>

      {watermark && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <span
            className={cn(
              'select-none text-center font-sans font-medium uppercase leading-[0.9] tracking-tight',
              dark ? 'text-white/[0.08]' : 'text-black/[0.06]'
            )}
            style={{ fontSize: 'clamp(1.5rem, 9vw, 6rem)' }}
          >
            {watermark}
          </span>
        </div>
      )}

      {label && (
        <span
          className={cn(
            'absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest',
            dark ? 'text-white/70' : 'text-black/60'
          )}
        >
          [{label}]
        </span>
      )}

      {sub && (
        <span
          className={cn(
            'absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest',
            dark ? 'text-white/40' : 'text-black/30'
          )}
        >
          {sub}
        </span>
      )}
    </div>
  );
}
