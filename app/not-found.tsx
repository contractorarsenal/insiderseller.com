import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">404</p>
      <h1 className="mb-6 font-sans text-4xl font-medium uppercase tracking-tight md:text-5xl">Gone, not found.</h1>
      <Link href="/" className="border border-black px-6 py-3 font-mono text-xs uppercase tracking-widest underline-anim">
        Back To Insider Sellers
      </Link>
    </div>
  );
}
