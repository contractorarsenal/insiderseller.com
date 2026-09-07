import type { Metadata } from 'next';
import Accordion from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers on authenticity, condition grading, shipping, returns and selling to Insider Sellers.',
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <h1 className="mb-12 font-sans text-4xl font-medium uppercase tracking-tight md:text-6xl">FAQ</h1>

      <Accordion title="How do you grade condition?" defaultOpen>
        <p>
          We use four grades — Pristine, Excellent, Good and Archival Wear — with specific notes and photos for every
          piece, so you know exactly what you&rsquo;re buying before you buy it.
        </p>
      </Accordion>
      <Accordion title="Is everything one of one?">
        <p>Most inventory is a single, unique piece. If a listing is one of one, it&rsquo;s marked clearly on the product page.</p>
      </Accordion>
      <div id="shipping">
        <Accordion title="Shipping">
          <p>Shipping details, carriers and timelines are confirmed at checkout.</p>
        </Accordion>
      </div>
      <div id="returns">
        <Accordion title="Returns">
          <p>Return eligibility is confirmed at checkout and varies by item and condition.</p>
        </Accordion>
      </div>
      <Accordion title="How does selling work?">
        <p>
          Submit your item through the Sell To Us flow. Our team reviews submissions and follows up with an offer if
          it&rsquo;s a fit.
        </p>
      </Accordion>
    </div>
  );
}
