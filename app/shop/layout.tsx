import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse authenticated designer, archive and streetwear pieces. Filter by designer, size, condition and price.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
