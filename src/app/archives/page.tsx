import { Metadata } from 'next';
import { SectionMiniNav } from '@/components/sections/SectionMiniNav';
import { ArchivesSection } from '@/components/sections/ArchivesSection';
import { getAllModels } from '@/lib/edge-data';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';
import type { Model } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = generateSEO({
  title: 'Archives — All Models',
  description:
    'Browse the full WhoKnows Models archive. All talent — women and men — in one place.',
  keywords: [
    'model archives',
    'all models',
    'fashion models',
    'WhoKnows Models',
  ],
  canonical: '/archives',
});

export default async function ArchivesPage() {
  const allModels = await getAllModels();

  return (
    <>
      <SectionMiniNav />
      <ArchivesSection models={allModels as unknown as Model[]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Archives', url: '/archives' },
            ])
          ),
        }}
      />
    </>
  );
}
