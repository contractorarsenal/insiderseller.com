import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Orders, saved items, alerts and selling history.',
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
