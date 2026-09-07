'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function PhotoDropzone({
  label,
  onFile,
}: {
  label: string;
  onFile: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function setFile(file: File | null) {
    onFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0] ?? null;
        if (file) setFile(file);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      className={cn(
        'relative flex aspect-square cursor-pointer flex-col items-center justify-center border text-center transition-colors',
        dragging ? 'border-black bg-archive' : 'border-black/20 hover:border-black/50',
        preview && 'border-solid'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        aria-label={`Upload ${label} photo`}
      />
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt={`${label} preview`} className="h-full w-full object-cover" />
      ) : (
        <>
          <span className="mb-1 font-mono text-[10px] uppercase tracking-widest">{label}</span>
          <span className="font-mono text-[10px] text-muted">Drop / Click</span>
        </>
      )}
    </div>
  );
}
