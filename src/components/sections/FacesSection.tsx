'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight } from 'lucide-react';
import type { Model } from '@/types';

interface FacesSectionProps {
  models: (Model & { faceImage?: any })[];
}

export function FacesSection({ models = [] }: FacesSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  // MacBook Trackpad / Wheel Support
  React.useEffect(() => {
    if (!emblaApi) return;
    
    const emblaNode = emblaApi.rootNode();
    const onWheel = (e: WheelEvent) => {
      // If the swipe is primarily horizontal
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Horizontal swiping for trackpad
        const engine = emblaApi.internalEngine();
        
        // Move the carousel by the delta amount
        engine.location.add(-e.deltaX);
        engine.target.set(engine.location);
        
        // Trigger the animation to update the view
        engine.animation.start();
        
        // If we want to prevent the browser's back/forward gesture during swipe:
        // e.preventDefault(); 
      }
    };

    emblaNode.addEventListener('wheel', onWheel as any, { passive: true });
    return () => emblaNode.removeEventListener('wheel', onWheel as any);
  }, [emblaApi]);

  if (!models || models.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="px-4 lg:px-8 mb-6 flex items-center justify-between">
          <span className="font-sans text-3xl font-bold tracking-tight">FACES</span>
          <Link href="/models" className="hidden sm:flex items-center gap-1 font-sans text-xs uppercase tracking-[0.1em] hover:opacity-60 transition-opacity">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="px-4 lg:px-8">
          <div className="grid grid-cols-4 gap-1 h-64 bg-neutral-50" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white" aria-label="Faces">
      {/* Header */}
      <div className="px-4 lg:px-8 mb-5 flex items-center justify-between">
        <span className="font-sans text-5xl lg:text-5xl font-black tracking-tighter">FACES</span>
        <Link
          href="/models"
          className="hidden sm:flex items-center gap-1 font-sans text-xs uppercase tracking-[0.1em] hover:opacity-60 transition-opacity"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {models.map((model, index) => {
            const img = model.faceImage || model.images?.[0];
            return (
              <div
                key={model.id}
                className="flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pr-2 lg:pr-4"
              >
                <Link href={`/model/${model.slug}`} className="group block">
                  <div className="aspect-square relative overflow-hidden bg-neutral-100">
                    <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
                    {img && (
                      <Image
                        src={img.imageUrl}
                        alt={img.alt || model.name}
                        fill
                        quality={75}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-top"
                        priority={index < 4}
                        loading={index < 4 ? 'eager' : 'lazy'}
                        fetchPriority={index < 4 ? 'high' : 'auto'}
                        placeholder="blur"
                        blurDataURL="data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAQCdASoIAAUAAUAmJaQAA3AA/u66AAA="
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <p className="mt-2 px-1 font-sans text-[11px] uppercase tracking-[-0.02em] truncate">
                    {model.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View All */}
      <div className="px-4 mt-6 sm:hidden">
        <Link
          href="/models"
          className="flex items-center gap-1 font-sans text-xs uppercase tracking-[0.1em] hover:opacity-60 transition-opacity"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
}
