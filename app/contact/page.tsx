import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Insider Sellers.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 md:px-8">
      <h1 className="mb-10 font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">Contact</h1>
      <ContactForm />
    </div>
  );
}
