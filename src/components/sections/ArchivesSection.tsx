'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import type { Model } from '@/types';

// ─── Per-model card carousel ──────────────────────────────────────────────────

function ModelArchiveCard({ model }: { model: Model }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [current, setCurrent] = React.useState(0);

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

  const images = model.images ?? [];
  if (images.length === 0) return null;

  return (
    <div className="group">
      <Link href={`/model/${model.slug}`} className="block">
        {/* Image carousel */}
        <div className="relative overflow-hidden aspect-[3/4] bg-neutral-100">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((img) => (
                <div key={img.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                  <Image
                    src={img.imageUrl}
                    alt={img.alt || model.name}
                    fill
                    quality={65}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAQCdASoIAAUAAUAmJaQAA3AA/u66AAA="
                  />
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
    <div className="px-4 lg:px-6 pt-4 pb-4">
      <div className="aspect-[3/4] bg-neutral-100 animate-pulse" />
      <div className="mt-2 h-3 w-24 bg-neutral-100 animate-pulse rounded" />
      <div className="mt-1 h-2 w-16 bg-neutral-50 animate-pulse rounded" />
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

      {/* 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-neutral-100 border-t border-neutral-100">
        {models.length > 0
          ? models.map((model) => (
              <div key={model.id} className="bg-white px-4 lg:px-6 pt-4">
                <ModelArchiveCard model={model} />
              </div>
            ))
          : [...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </section>
  );
}
