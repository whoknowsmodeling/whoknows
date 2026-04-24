import { Metadata } from 'next';
import { RosterSection } from '@/components/sections/RosterSection';
import { getGenderRoster } from '@/lib/edge-data';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';
import type { Model } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = generateSEO({
  title: 'Women Models',
  description:
    'Discover our talented female models at WhoKnows Models. Browse our roster of exceptional women models for fashion, editorial, and commercial bookings.',
  keywords: [
    'female models',
    'women models',
    'fashion models',
    'editorial models',
    'runway models',
    'commercial models',
    'WhoKnows Models',
  ],
  canonical: '/women',
});

export default async function WomenPage() {
  const models = await getGenderRoster('women');

  return (
    <>
      <RosterSection gender="women" models={models as unknown as Model[]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Women', url: '/women' },
            ])
          ),
        }}
      />
    </>
  );
}
