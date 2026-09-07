'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="font-sans text-lg uppercase tracking-wide">Message sent. We&rsquo;ll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">Name</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-black/20 bg-transparent px-4 py-3 font-sans text-sm focus:border-black focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-black/20 bg-transparent px-4 py-3 font-sans text-sm focus:border-black focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">Message</span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-black/20 bg-transparent px-4 py-3 font-sans text-sm focus:border-black focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="bg-yellow px-7 py-4 font-sans text-sm uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-yellow"
      >
        Send
      </button>
    </form>
  );
}
