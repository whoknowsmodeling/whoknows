'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ModelCard } from './ModelCard';
import type { Model } from '@/types';

interface ModelTickerProps {
  models: Model[];
  direction?: 'left' | 'right';
  speed?: number;
}

export function ModelTicker({ models, direction = 'left', speed = 40 }: ModelTickerProps) {
  // Multiply models to ensure the ticker has enough content to be truly infinite
  const duplicatedModels = [...models, ...models, ...models, ...models];

  if (!models || models.length === 0) {
    return (
      <div className="w-full h-96 animate-pulse bg-neutral-100 flex items-center justify-center">
        <p className="text-neutral-400">Loading talent...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-white py-4">
      <motion.div
        className="flex gap-4 lg:gap-6 w-max"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {duplicatedModels.map((model, index) => (
          <div
            key={`${model.id}-${index}`}
            className="w-[280px] sm:w-[320px] lg:w-[380px] flex-shrink-0"
          >
            <ModelCard 
              model={model} 
              index={index} 
              variant="passport" 
            />
          </div>
        ))}
      </motion.div>
      
      {/* Decorative gradients for smooth entrance/exit */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
    </div>
  );
}
