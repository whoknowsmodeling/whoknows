'use client';
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ModelCard } from './ModelCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Model } from '@/types';

interface ModelCarouselProps {
  models: Model[];
}

export function ModelCarousel({ models = [] }: ModelCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
    duration: 30, // Smooth transition
    skipSnaps: true // Fluid swiping
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: any) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  if (!models || models.length === 0) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-96 animate-pulse bg-neutral-100 rounded flex items-center justify-center">
        <p className="text-neutral-400">Loading models...</p>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div 
        className="overflow-hidden px-4 lg:px-0 touch-pan-y" 
        ref={emblaRef}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="flex -ml-4 lg:-ml-6 select-none">
          {models.map((model, index) => (
            <div
              key={model.id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_33.333%] lg:flex-[0_0_20%] xl:flex-[0_0_16.666%] pl-4 lg:pl-6"
            >
              <ModelCard model={model} index={index} variant="passport" forcePriority={index < 5} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-full bg-white/80 backdrop-blur-sm border-neutral-200 shadow-sm pointer-events-auto hover:bg-white"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous models"
        >
          <ArrowLeft className="size-5" />
        </Button>
      </div>

      <div className="absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-full bg-white/80 backdrop-blur-sm border-neutral-200 shadow-sm pointer-events-auto hover:bg-white"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next models"
        >
          <ArrowRight className="size-5" />
        </Button>
      </div>
      
      {/* Removed scroll indicators for cleaner design */}
    </div>
  );
}
