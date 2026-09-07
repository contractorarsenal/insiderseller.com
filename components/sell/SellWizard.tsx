'use client';

import { useState } from 'react';
import { designers } from '@/lib/data/designers';
import { cn } from '@/lib/utils';
import PhotoDropzone from './PhotoDropzone';

const CATEGORIES = ['OUTERWEAR', 'TOP', 'BOTTOM', 'FOOTWEAR', 'JEWELRY', 'ACCESSORY', 'OTHER'];
const CONDITIONS = ['PRISTINE', 'EXCELLENT', 'GOOD', 'ARCHIVAL WEAR'];
const PHOTO_LABELS = ['FRONT', 'BACK', 'TAG', 'DETAILS', 'FLAWS'];
const TOTAL_STEPS = 7;

interface FormState {
  designer: string;
  category: string;
  condition: string;
  photos: Record<string, File | null>;
  itemName: string;
  size: string;
  year: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
  payout: 'CASH' | 'STORE CREDIT' | '';
}

const initialState: FormState = {
  designer: '',
  category: '',
  condition: '',
  photos: {},
  itemName: '',
  size: '',
  year: '',
  notes: '',
  name: '',
  email: '',
  phone: '',
  payout: '',
};

export default function SellWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return form.designer.trim().length > 0;
      case 2:
        return form.category.length > 0;
      case 3:
        return form.condition.length > 0;
      case 5:
        return form.itemName.trim().length > 0 && form.size.trim().length > 0;
      case 6:
        return form.name.trim().length > 0 && form.email.includes('@') && form.payout.length > 0;
      default:
        return true;
    }
  }

  function next() {
    if (!canAdvance()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  if (submitted) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-4 font-sans text-3xl font-medium uppercase tracking-tight md:text-4xl">
          We&rsquo;ll take it from here.
        </h2>
        <p className="max-w-md font-sans text-sm text-black/70">
          Our team will review your submission and contact you with next steps.
        </p>
      </div>
    );
  }

  return (
    <div id="submit" className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted">
        Step {String(step).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
      </p>

      {step === 1 && (
        <Step title="What are you selling?">
          <input
            list="designer-list"
            value={form.designer}
            onChange={(e) => update('designer', e.target.value)}
            placeholder="SEARCH DESIGNER"
            className="w-full border border-black/20 bg-transparent px-4 py-3 font-mono text-sm uppercase tracking-widest placeholder:text-black/30 focus:border-black focus:outline-none"
          />
          <datalist id="designer-list">
            {designers.map((d) => (
              <option key={d.slug} value={d.name} />
            ))}
          </datalist>
          <div className="mt-4 flex flex-wrap gap-2">
            {designers.slice(0, 8).map((d) => (
              <button
                key={d.slug}
                type="button"
                onClick={() => update('designer', d.name)}
                className={cn(
                  'border px-3 py-1.5 font-mono text-xs uppercase tracking-widest',
                  form.designer === d.name ? 'border-black bg-black text-white' : 'border-black/20 hover:border-black'
                )}
              >
                {d.name}
              </button>
            ))}
          </div>
        </Step>
      )}

      {step === 2 && (
        <Step title="Category">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CATEGORIES.map((c) => (
              <OptionButton key={c} active={form.category === c} onClick={() => update('category', c)}>
                {c}
              </OptionButton>
            ))}
          </div>
        </Step>
      )}

      {step === 3 && (
        <Step title="Condition">
          <div className="grid grid-cols-2 gap-3">
            {CONDITIONS.map((c) => (
              <OptionButton key={c} active={form.condition === c} onClick={() => update('condition', c)}>
                {c}
              </OptionButton>
            ))}
          </div>
        </Step>
      )}

      {step === 4 && (
        <Step title="Photos">
          <p className="mb-5 font-sans text-sm text-black/60">
            Front, back, tag, close-up details, and any flaws. Clear photos move faster.
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {PHOTO_LABELS.map((label) => (
              <PhotoDropzone
                key={label}
                label={label}
                onFile={(file) => update('photos', { ...form.photos, [label]: file })}
              />
            ))}
          </div>
        </Step>
      )}

      {step === 5 && (
        <Step title="Details">
          <div className="space-y-4">
            <TextField label="Item Name" value={form.itemName} onChange={(v) => update('itemName', v)} required />
            <TextField label="Size" value={form.size} onChange={(v) => update('size', v)} required />
            <TextField label="Year (If Known)" value={form.year} onChange={(v) => update('year', v)} />
            <TextArea label="Notes" value={form.notes} onChange={(v) => update('notes', v)} />
          </div>
        </Step>
      )}

      {step === 6 && (
        <Step title="Your Info">
          <div className="space-y-4">
            <TextField label="Name" value={form.name} onChange={(v) => update('name', v)} required />
            <TextField label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required />
            <TextField label="Phone" type="tel" value={form.phone} onChange={(v) => update('phone', v)} />
            <div>
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">
                Payout Preference *
              </span>
              <div className="grid grid-cols-2 gap-3">
                {(['CASH', 'STORE CREDIT'] as const).map((p) => (
                  <OptionButton key={p} active={form.payout === p} onClick={() => update('payout', p)}>
                    {p}
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        </Step>
      )}

      {step === 7 && (
        <Step title="Review">
          <dl className="divide-y divide-black/10 border-y border-black/10">
            {[
              ['Designer', form.designer],
              ['Category', form.category],
              ['Condition', form.condition],
              ['Item', form.itemName],
              ['Size', form.size],
              ['Year', form.year || '—'],
              ['Name', form.name],
              ['Email', form.email],
              ['Phone', form.phone || '—'],
              ['Payout', form.payout],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3">
                <dt className="font-mono text-xs uppercase tracking-widest text-muted">{k}</dt>
                <dd className="font-sans text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </Step>
      )}

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="font-mono text-xs uppercase tracking-widest underline-anim disabled:opacity-30"
        >
          ← Back
        </button>
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance()}
            className="bg-black px-7 py-3 font-sans text-sm uppercase tracking-widest text-white transition-colors hover:bg-charcoal disabled:opacity-30"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="bg-yellow px-7 py-3 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-yellow"
          >
            Submit To Insiders
          </button>
        )}
      </div>
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-6 font-sans text-2xl font-medium uppercase tracking-tight md:text-3xl">{title}</h2>
      {children}
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'border px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors',
        active ? 'border-black bg-black text-white' : 'border-black/20 hover:border-black'
      )}
    >
      {children}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
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
        className="w-full border border-black/20 bg-transparent px-4 py-3 font-sans text-sm focus:border-black focus:outline-none"
      />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full border border-black/20 bg-transparent px-4 py-3 font-sans text-sm focus:border-black focus:outline-none"
      />
    </label>
  );
}
