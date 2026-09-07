import Link from 'next/link';

export default function SellToUsPromo() {
  return (
    <section className="bg-yellow px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-6 font-sans text-[13vw] font-medium uppercase leading-[0.9] tracking-tight text-black sm:text-6xl md:text-8xl">
          Your closet
          <br />
          is our
          <br />
          inventory.
        </h2>
        <p className="mb-8 max-w-md font-sans text-sm text-black/80 md:text-base">
          Chrome Hearts. Rick Owens. Margiela. ERD. Acne Studios. And the pieces people actually want.
        </p>
        <Link
          href="/sell"
          className="inline-block bg-black px-7 py-4 font-sans text-sm uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
        >
          Sell To Insiders →
        </Link>
      </div>
    </section>
  );
}
