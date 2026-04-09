import { Metadata } from 'next';
import { ModelGrid } from '@/components/models/ModelCard';
import { mockModels } from '@/lib/data';
import type { Model } from '@/types';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';
import { getGenderRoster } from '@/lib/edge-data';

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

async function getWomenModels(): Promise<Model[]> {
  const models = await getGenderRoster('women');
  
  return models.length > 0
    ? (models as unknown as Model[])
    : mockModels.filter((m) => m.gender === 'women');
}

export default async function WomenPage() {
  const womenModels = await getWomenModels();

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 lg:mb-16">
            <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
              Our Talent
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight">
              Women
            </h1>
          </div>

          <ModelGrid models={womenModels} columns={4} />
        </div>
      </section>

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
