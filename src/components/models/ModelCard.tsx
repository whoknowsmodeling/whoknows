'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Model, ModelImage } from '@/types';

interface ModelCardProps {
  model: Model;
  index?: number;
  variant?: 'default' | 'passport';
}

export function ModelCard({ model, index = 0, variant = 'default' }: ModelCardProps) {
  const primaryImage = model.images.find((img) => img.isPrimary) || model.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/model/${model.slug}`} className="group block">
        <div className={cn(
          "relative overflow-hidden bg-neutral-100",
          variant === 'passport' ? "aspect-[4/5]" : "aspect-[3/4]"
        )}>
          {primaryImage && (
            <Image
              src={primaryImage.imageUrl}
              alt={primaryImage.alt || `${model.name} - Model`}
              fill
              quality={60}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-all duration-700 group-hover:scale-105"
              priority={index < 8}
              loading={index < 8 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAQCdASoIAAUAAUAmJaQAA3AA/u66AAA="
            />
          )}
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
          
          {/* Hover Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white">
              <p className="font-serif text-lg font-medium tracking-tight mb-1">{model.name}</p>
              <p className="text-xs uppercase tracking-wider">View Profile</p>
            </div>
          </div>
        </div>

        {/* Model Info - Hidden in Passport Variant */}
        {variant !== 'passport' && (
          <div className="mt-3 lg:mt-4 space-y-1">
            <h3 className="font-serif text-lg font-medium text-black tracking-tight">
              {model.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              {model.height && (
                <>
                  <span>{model.height}</span>
                  {model.location && <span>•</span>}
                </>
              )}
              {model.location && <span>{model.location}</span>}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

interface ModelGridProps {
  models: Model[];
  columns?: 2 | 3 | 4;
}

export function ModelGrid({ models, columns = 4 }: ModelGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 lg:gap-6`}>
      {models.map((model, index) => (
        <ModelCard key={model.id} model={model} index={index} />
      ))}
    </div>
  );
}
