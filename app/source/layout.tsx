import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Source An Item',
  description: 'Looking for something specific? Tell us and we’ll keep an eye out as new inventory comes in.',
};

export default function SourceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
