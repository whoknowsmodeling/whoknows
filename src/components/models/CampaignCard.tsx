'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Campaign } from '@/types';

interface CampaignCardProps {
  campaign: Campaign;
  index?: number;
}

export function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/jobs/${campaign.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          {campaign.coverImage && (
            <Image
              src={campaign.coverImage}
              alt={campaign.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30" />
        </div>

        <div className="mt-4 lg:mt-6 space-y-2">
          <h3 className="font-serif text-xl lg:text-2xl font-medium text-black tracking-tight group-hover:text-neutral-600 transition-colors">
            {campaign.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            {campaign.client && (
              <>
                <span>{campaign.client}</span>
                <span>•</span>
              </>
            )}
            {campaign.year && <span>{campaign.year}</span>}
          </div>
          {campaign.models && campaign.models.length > 0 && (
            <p className="text-sm text-neutral-500">
              Featuring: {campaign.models.map((m) => m.model.name).join(', ')}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

interface CampaignGridProps {
  campaigns: Campaign[];
}

export function CampaignGrid({ campaigns }: CampaignGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {campaigns.map((campaign, index) => (
        <CampaignCard key={campaign.id} campaign={campaign} index={index} />
      ))}
    </div>
  );
}
