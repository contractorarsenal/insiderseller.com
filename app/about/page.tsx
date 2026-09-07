import type { Metadata } from 'next';
import Plate from '@/components/ui/Plate';

export const metadata: Metadata = {
  title: 'About',
  description: 'Insider Sellers is a curated destination for designer, archive and culturally relevant fashion.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="px-4 py-24 md:px-8 md:py-32">
        <h1 className="max-w-2xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
          We find
          <br />
          what others
          <br />
          don&rsquo;t.
        </h1>
      </section>

      <section className="grid grid-cols-1 gap-10 px-4 pb-16 md:grid-cols-2 md:px-8">
        <div className="aspect-[4/5] w-full">
          <Plate seed="about-editorial" tone="dark" />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <p className="font-sans text-lg text-black/80">
            Insider Sellers is a curated destination for designer, archive and culturally relevant fashion.
          </p>
          <p className="font-sans text-lg text-black/80">
            We source the pieces worth knowing about and make them available to the people looking for them.
          </p>
        </div>
      </section>
    </div>
  );
}
