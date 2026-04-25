import Link from 'next/link';
import Image from 'next/image';
import { SectionMiniNav } from './SectionMiniNav';
import type { Model } from '@/types';

interface RosterSectionProps {
  gender: 'men' | 'women';
  models: Model[];
  showSubtitle?: boolean;
}

const CONFIG = {
  men: {
    headingSrc: '/design/menblack.webp',
    headingAlt: 'MEN',
    href: '/men',
  },
  women: {
    headingSrc: '/design/womenblack.webp',
    headingAlt: 'WOMEN',
    href: '/women',
  },
};

export function RosterSection({ gender, models = [], showSubtitle = true }: RosterSectionProps) {
  const cfg = CONFIG[gender];

  return (
    <section
      className="bg-white"
      aria-label={gender === 'men' ? 'Men Models' : 'Women Models'}
    >
      {/* ── Mini navbar (logo + nav + search + hamburger) ── */}
      <SectionMiniNav />

      {/* ── Heading ── */}
      <div className="px-4 lg:px-8 pt-8 pb-2">
        <Link href={cfg.href} className="inline-block hover:opacity-80 transition-opacity">
          <Image
            src={cfg.headingSrc}
            alt={cfg.headingAlt}
            width={400}
            height={180}
            className="h-10 lg:h-14 w-auto"
            loading="lazy"
          />
        </Link>
        {showSubtitle && (
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-400 mt-1">
            WHOKNOWS&nbsp;&nbsp;++&nbsp;&nbsp;MODELS
          </p>
        )}
      </div>

      {/* ── 3-column passport grid ── */}
      {models.length > 0 ? (
        <div className="grid grid-cols-3 gap-[1px] bg-neutral-100 mt-4">
          {models.map((model) => {
            const img =
              model.images?.find((i) => i.isPrimary) ?? model.images?.[0];
            return (
              <Link
                key={model.id}
                href={`/model/${model.slug}`}
                className="group block bg-white"
              >
                <div className="aspect-square relative overflow-hidden bg-neutral-100">
                  {img && (
                    <Image
                      src={img.imageUrl}
                      alt={img.alt || model.name}
                      fill
                      quality={65}
                      sizes="(max-width: 1024px) 33vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAQCdASoIAAUAAUAmJaQAA3AA/u66AAA="
                    />
                  )}
                </div>
                <div className="py-2 px-1 bg-white">
                  <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-center truncate">
                    {model.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="px-4 lg:px-0 mt-4">
          <div className="grid grid-cols-3 gap-[1px] bg-neutral-100">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-50 animate-pulse" />
            ))}
          </div>
        </div>
      )}

      <div className="pb-12" />
    </section>
  );
}
