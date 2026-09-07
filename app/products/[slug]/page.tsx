import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import MobileBuyBar from '@/components/product/MobileBuyBar';
import YouKnowWhatElse from '@/components/product/YouKnowWhatElse';
import RecentlyViewed from '@/components/product/RecentlyViewed';
import RecentlyViewedTracker from '@/components/product/RecentlyViewedTracker';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.brand} — ${product.name}`,
    description: `${product.brand} ${product.name}, size ${product.size}, ${product.condition.toLowerCase()} condition. ${formatPrice(product.price)}. ${product.status === 'SOLD' ? 'Sold — browsable archive piece.' : 'One of one, available now.'}`,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="pb-16 lg:pb-24">
      <RecentlyViewedTracker productId={product.id} />

      <div className="px-4 pt-6 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-widest text-muted">
          <Link href="/shop" className="underline-anim">
            Shop
          </Link>
          {' / '}
          <Link href={`/designers/${product.brandSlug}`} className="underline-anim">
            {product.brand}
          </Link>
          {' / '}
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[60%_40%] lg:gap-12">
        <ProductGallery product={product} />
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <ProductInfo product={product} />
        </div>
      </div>

      <MobileBuyBar product={product} />

      <YouKnowWhatElse product={product} />
      <RecentlyViewed excludeId={product.id} />
    </div>
  );
}
