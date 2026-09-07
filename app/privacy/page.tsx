import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <h1 className="mb-8 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">Privacy Policy</h1>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Placeholder — full privacy policy to be provided prior to launch.
      </p>
    </div>
  );
}
