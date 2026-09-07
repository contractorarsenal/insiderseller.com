import Image from 'next/image';
import { cn } from '@/lib/utils';

// Real source file is 1374×1145 (a circular badge with a few px of
// transparent padding baked into the export). We size a wrapper to that
// exact ratio and render the image with `fill` + `object-contain`, so the
// badge can NEVER be stretched into an oval no matter what height class a
// caller applies — object-contain guarantees uniform scaling only.
const RATIO = '1374/1145';

export default function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn('relative inline-block', className)} style={{ aspectRatio: RATIO }}>
      <Image
        src="/insider-sellers-logo.png"
        alt="Insider Sellers"
        fill
        priority={priority}
        sizes="160px"
        className="object-contain"
      />
    </span>
  );
}
