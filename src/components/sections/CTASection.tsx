import Link from 'next/link';
import Image from 'next/image';

export function CTASection() {
  return (
    <section
      className="bg-black flex flex-col items-center justify-center min-h-screen"
      aria-label="Explore Roster"
    >
      {/* Two PNG image buttons side by side */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 lg:gap-24 w-full px-8">
        {/* MEN button */}
        <Link
          href="/men"
          className="group flex flex-col items-start hover:opacity-80 transition-opacity duration-300"
          aria-label="Men Models"
        >
          <Image
            src="/design/menwhite.webp"
            alt="MEN"
            width={380}
            height={220}
            className="h-10 lg:h-16 w-auto"
            loading="lazy"
          />
        </Link>

        {/* WOMEN button */}
        <Link
          href="/women"
          className="group flex flex-col items-start hover:opacity-80 transition-opacity duration-300"
          aria-label="Women Models"
        >
          <Image
            src="/design/womenwhite.webp"
            alt="WOMEN"
            width={560}
            height={220}
            className="h-10 lg:h-16 w-auto"
            loading="lazy"
          />
        </Link>
      </div>
    </section>
  );
}
