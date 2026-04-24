import Image from 'next/image';

interface Client {
  id: string;
  name: string;
  logoUrl: string;
  order: number;
  active: boolean;
}

interface BrandsSectionProps {
  clients: Client[];
}

function isImageUrl(url: string) {
  return /\.(webp|jpg|jpeg|png|svg)$/i.test(url);
}

export function BrandsSection({ clients = [] }: BrandsSectionProps) {
  const active = clients.filter((c) => c.active);
  if (active.length === 0) return null;

  return (
    <section className="bg-white py-12 lg:py-16 border-t border-neutral-100" aria-label="Brand Partners">
      <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-400 text-center mb-8">
        TRUSTED BY LEADING BRANDS
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 px-4 lg:px-8">
        {active.map((client) =>
          isImageUrl(client.logoUrl) ? (
            <div key={client.id} className="relative h-6 lg:h-8 w-24 lg:w-32 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
              <Image
                src={client.logoUrl}
                alt={client.name}
                fill
                className="object-contain"
                loading="lazy"
                sizes="128px"
              />
            </div>
          ) : (
            <span
              key={client.id}
              className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors duration-300"
            >
              {client.name}
            </span>
          )
        )}
      </div>
    </section>
  );
}
