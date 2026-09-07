'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SourceForm() {
  const searchParams = useSearchParams();
  const [designer, setDesigner] = useState(searchParams.get('designer') ?? '');
  const [item, setItem] = useState(searchParams.get('item') ?? '');
  const [size, setSize] = useState(searchParams.get('size') ?? '');
  const [budget, setBudget] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
          We&rsquo;ll keep an eye out.
        </h1>
        <p className="max-w-md font-sans text-sm text-black/70">
          If something matching your request comes through, we&rsquo;ll reach out directly.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 md:px-8">
      <h1 className="mb-3 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">Source An Item</h1>
      <p className="mb-10 font-sans text-sm text-black/70">
        Looking for something specific? Tell us what, and we&rsquo;ll keep an eye out as new inventory comes in.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Designer" value={designer} onChange={setDesigner} required />
        <Field label="Item" value={item} onChange={setItem} required />
        <Field label="Size" value={size} onChange={setSize} />
        <Field label="Budget" value={budget} onChange={setBudget} placeholder="E.G. $500 – $1,500" />
        <Field label="Email" value={email} onChange={setEmail} type="email" required />
        <Field label="Phone (Optional)" value={phone} onChange={setPhone} type="tel" />
        <button
          type="submit"
          className="w-full bg-yellow py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-yellow"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">
        {label}
        {required && ' *'}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-black/20 bg-transparent px-4 py-3 font-sans text-sm placeholder:text-black/30 focus:border-black focus:outline-none"
      />
    </label>
  );
}

export default function SourcePage() {
  return (
    <Suspense fallback={null}>
      <SourceForm />
    </Suspense>
  );
}
