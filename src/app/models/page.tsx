import { Metadata } from 'next';
import { ModelGrid } from '@/components/models/ModelCard';
import type { Model } from '@/types';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';
import { getAllModels } from '@/lib/edge-data';
import { GenderToggle } from '@/components/layout/GenderToggle';

export const revalidate = 60;

export const metadata: Metadata = generateSEO({
  title: 'Our models',
  description:
    'Discover our full roster of talented models at WhoKnows Models. Browse exceptional talent for fashion, editorial, and commercial bookings.',
  keywords: [
    'models',
    'fashion models',
    'editorial models',
    'runway models',
    'commercial models',
    'WhoKnows Models',
  ],
  canonical: '/models',
});

export default async function ModelsPage() {
  const allModels = await getAllModels();

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
            <div>
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
                Our Talent
              </p>
              <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight">
                All models
              </h1>
            </div>
            
            <div className="flex-shrink-0">
              <GenderToggle currentGender="all" />
            </div>
          </div>

          <ModelGrid models={allModels as unknown as Model[]} columns={4} forcePriority={true} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Models', url: '/models' },
            ])
          ),
        }}
      />
    </>
  );
}
