import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { designers, getDesignerBySlug } from '@/lib/data/designers';
import { getProductsByBrandSlug } from '@/lib/data/products';
import Plate from '@/components/ui/Plate';
import ProductGrid from '@/components/product/ProductGrid';
import DesignerAlertForm from '@/components/designer/DesignerAlertForm';

export function generateStaticParams() {
  return designers.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const designer = getDesignerBySlug(slug);
  if (!designer) return {};
  return {
    title: designer.name,
    description: `${designer.name}, ${designer.location}. ${designer.description}`,
  };
}

export default async function DesignerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const designer = getDesignerBySlug(slug);
  if (!designer) notFound();

  const items = getProductsByBrandSlug(designer.slug);
  const available = items.filter((p) => p.status === 'AVAILABLE');
  const sold = items.filter((p) => p.status === 'SOLD');

  return (
    <div>
      <div className="relative flex h-[50svh] items-end bg-black text-white md:h-[60vh]">
        <div className="absolute inset-0">
          <Plate seed={`designer-hero-${designer.slug}`} tone="dark" watermark={designer.name} />
        </div>
        <div className="relative z-10 px-4 pb-10 md:px-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/70">{designer.location}</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-none tracking-tight md:text-7xl">
            {designer.name}
          </h1>
        </div>
      </div>

      <div className="px-4 py-10 md:px-8">
        <p className="max-w-2xl font-sans text-lg text-black/75">{designer.description}</p>
      </div>

      <section className="px-4 py-10 md:px-8">
        <h2 className="mb-10 font-sans text-2xl font-medium uppercase tracking-tight md:text-3xl">
          Available ({available.length})
        </h2>
        <ProductGrid products={available} columns={4} />
      </section>

      <section className="border-t border-black/10 bg-archive px-4 py-10 md:px-8">
        <DesignerAlertForm designer={designer.name} />
      </section>

      {sold.length > 0 && (
        <section className="px-4 py-16 md:px-8">
          <h2 className="mb-2 font-sans text-2xl font-medium uppercase tracking-tight md:text-3xl">
            Sold Archive ({sold.length})
          </h2>
          <p className="mb-10 font-mono text-xs uppercase tracking-widest text-muted">Gone, not forgotten.</p>
          <ProductGrid products={sold} columns={4} />
        </section>
      )}
    </div>
  );
}
