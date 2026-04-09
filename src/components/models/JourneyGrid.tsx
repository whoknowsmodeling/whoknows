'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Model } from '@/types';

interface JourneyGridProps {
  models: Model[];
}

export function JourneyGrid({ models }: JourneyGridProps) {
  if (!models || models.length === 0) return null;

  // For the journey section, we want a 'different' image than the primary one.
  // We'll pick the second image (index 1) if available, otherwise fallback.
  const journeyImages = models.map(model => {
    const secondaryImage = model.images.length > 1 ? model.images[1] : model.images[0];
    return {
      id: model.id,
      slug: model.slug,
      name: model.name,
      image: secondaryImage?.imageUrl || '',
    };
  }).filter(item => item.image);

  return (
    <div className="w-full h-fit py-8">
      {/* 
          Desktop: 4 layers (rows) using grid-rows-4
          Mobile: 2 layers (rows) using grid-rows-2
      */}
      <div className={cn(
        "grid gap-2 lg:gap-4 px-4 lg:px-8 auto-cols-max grid-flow-col",
        "grid-rows-2 lg:grid-rows-4 overflow-x-auto no-scrollbar touch-pan-x",
        "lg:justify-center" // Center the items on desktop
      )}>
        {journeyImages.map((item, idx) => (
          <motion.div
            key={`${item.id}-${idx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.02 }}
            className={cn(
              "relative group aspect-square select-none overflow-hidden bg-neutral-100",
              "w-40 sm:w-48 lg:w-64 h-40 sm:h-48 lg:h-64"
            )}
          >
            <Link href={`/model/${item.slug}`} className="block w-full h-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={idx < 4}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 flex items-center justify-center">
                <span className="text-white text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.name}
                </span >
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
