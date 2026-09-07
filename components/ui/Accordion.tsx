'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-sans text-sm uppercase tracking-wide">{title}</span>
        <span className={cn('font-mono text-base transition-transform duration-200', open && 'rotate-45')}>+</span>
      </button>
      <div id={id} className={cn('grid transition-all duration-200', open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <div className="font-sans text-sm leading-relaxed text-black/75">{children}</div>
        </div>
      </div>
    </div>
  );
}
