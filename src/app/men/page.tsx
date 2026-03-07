import { Metadata } from 'next';
import { ModelGrid } from '@/components/models/ModelCard';
import { mockModels } from '@/lib/data';
import { db } from '@/lib/db';
import type { Model } from '@/types';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 3600;

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
  ],
  canonical: '/men',
});

async function getMenModels(): Promise<Model[]> {
  try {
    const models = await db.model.findMany({
      where: { gender: 'men' },
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: { order: 'asc' },
    });
    return models.length > 0
      ? (models as unknown as Model[])
      : mockModels.filter((m) => m.gender === 'men');
  } catch {
    return mockModels.filter((m) => m.gender === 'men');
  }
}

export default async function MenPage() {
  const menModels = await getMenModels();

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 lg:mb-16">
            <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
              Our Talent
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight">
              Men
            </h1>
          </div>

          <ModelGrid models={menModels} columns={4} />
        </div>
      </section>

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
