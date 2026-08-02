'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import type { Model } from '@/types';

// ─── Per-model card carousel ──────────────────────────────────────────────────

const DEFAULT_ASPECT = 3 / 4;

function ModelArchiveCard({ model }: { model: Model }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [current, setCurrent] = React.useState(0);
  const [dims, setDims] = React.useState<Record<string, number>>({});
  const [erroredIds, setErroredIds] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  const prev = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const next = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Photos without a usable URL are dropped up front — this is what was
  // rendering as the browser's broken-image icon.
  const images = (model.images ?? []).filter((img) => !!img.imageUrl);
  if (images.length === 0) return null;

  const currentImage = images[current] ?? images[0];
  const currentAspect = dims[currentImage.id] ?? DEFAULT_ASPECT;

  return (
    <div className="break-inside-avoid mb-4 lg:mb-6 group">
      <Link href={`/model/${model.slug}`} className="block">
        {/* Image carousel — height follows the natural aspect ratio of
            whichever photo is currently showing, so landscape and portrait
            sets both display at their own proportions instead of a forced crop. */}
        <div
          className="relative overflow-hidden bg-neutral-50 transition-[aspect-ratio] duration-300 ease-out"
          style={{ aspectRatio: currentAspect }}
        >
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((img) => (
                <div key={img.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                  {erroredIds[img.id] ? (
                    // Neutral, non-alarming placeholder instead of a broken-image icon
                    <div className="w-full h-full bg-white" />
                  ) : (
                    <Image
                      src={img.imageUrl}
                      alt={img.alt || model.name}
                      fill
                      quality={65}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="
                      onLoad={(e) => {
                        const t = e.currentTarget;
                        if (t.naturalWidth && t.naturalHeight) {
                          setDims((prev) => ({ ...prev, [img.id]: t.naturalWidth / t.naturalHeight }));
                        }
                      }}
                      onError={() => setErroredIds((prev) => ({ ...prev, [img.id]: true }))}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center bg-white/80 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-base leading-none"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center bg-white/80 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-base leading-none"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 pointer-events-none">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1 h-1 rounded-full transition-colors duration-200 ${
                    idx === current ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="pt-2 pb-4 text-center">
          <p className="font-sans text-xs font-black uppercase tracking-tight leading-none">
            {model.name}
          </p>
          <p className="font-sans text-[10px] font-light tracking-wider text-neutral-400 mt-0.5 uppercase">
            WHOKNOWS MODELS
          </p>
        </div>
      </Link>
    </div>
  );
}

// ─── Skeleton card placeholder ────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="break-inside-avoid mb-4 lg:mb-6">
      <div className="aspect-[3/4] bg-neutral-100 animate-pulse" />
      <div className="mt-2 h-3 w-24 mx-auto bg-neutral-100 animate-pulse rounded" />
      <div className="mt-1 h-2 w-16 mx-auto bg-neutral-50 animate-pulse rounded" />
    </div>
  );
}

// ─── Archives Section ─────────────────────────────────────────────────────────

interface ArchivesSectionProps {
  models: Model[];
}

export function ArchivesSection({ models = [] }: ArchivesSectionProps) {
  return (
    <section className="bg-white py-12 lg:py-16" aria-label="Archives">
      {/* ARCHIVES heading — WebP */}
      <div className="flex flex-col items-center mb-8 pt-6 lg:pt-10">
        <Image
          src="/design/archives.webp"
          alt="ARCHIVES — WHOKNOWS ++ MODELS"
          width={800}
          height={120}
          className="w-auto max-w-[240px] lg:max-w-[380px] h-auto"
          loading="lazy"
        />
      </div>

      {/* Auto-fit masonry — each card sized to its own photo's aspect ratio,
          no forced crop. */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 lg:gap-6 px-4 lg:px-6 border-t border-neutral-100 pt-4">
        {models.length > 0
          ? models.map((model) => <ModelArchiveCard key={model.id} model={model} />)
          : [...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </section>
  );
}
