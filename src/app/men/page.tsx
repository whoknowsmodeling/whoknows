import { Metadata } from 'next';
import { RosterSection } from '@/components/sections/RosterSection';
import { getGenderRoster } from '@/lib/edge-data';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';
import type { Model } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = generateSEO({
  title: 'Men Models',
  description:
    'Discover our talented male models at WhoKnows Models. Browse our roster of exceptional men models for fashion, editorial, and commercial bookings.',
  keywords: [
    'male models',
    'men models',
    'fashion models',
    'editorial models',
    'runway models',
    'commercial models',
    'WhoKnows Models',
  ],
  canonical: '/men',
});

export default async function MenPage() {
  const models = await getGenderRoster('men');

  return (
    <>
      <RosterSection gender="men" models={models as unknown as Model[]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Men', url: '/men' },
            ])
          ),
        }}
      />
    </>
  );
}
