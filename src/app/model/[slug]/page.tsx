import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ModelSlideshow } from '@/components/models/ModelSlideshow';
import { getModelDetail, getSitemapSlugs } from '@/lib/edge-data';
import { generateSEO, generateBreadcrumbSchema, generatePersonSchema } from '@/lib/seo';
import { GenderToggle } from '@/components/layout/GenderToggle';

export const revalidate = 60;

interface ModelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getSitemapSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;

  const model = await getModelDetail(slug);

  if (!model) {
    return { title: 'Model Not Found' };
  }

  const primaryImage = model.images.find((img: any) => img.isPrimary) || model.images[0];

  return generateSEO({
    title: `${model.name} - Model Profile`,
    description: model.bio || `Discover ${model.name}, a ${model.gender} model represented by WhoKnows Models. ${model.height ? `Height: ${model.height}.` : ''} ${model.location ? `Based in ${model.location}.` : ''}`,
    keywords: [
      model.name,
      `${model.name} model`,
      'fashion model',
      'model profile',
      'WhoKnows Models',
    ],
    ogImage: primaryImage?.imageUrl,
    canonical: `/model/${model.slug}`,
  });
}

export default async function ModelProfilePage({ params }: ModelPageProps) {
  const { slug } = await params;

  const model = await getModelDetail(slug);

  if (!model) notFound();

  const measurements = [
    { label: 'Height', value: model.height },
    { label: 'Chest', value: model.chest },
    { label: 'Waist', value: model.waist },
    { label: 'Hips', value: model.hips },
    { label: 'Hair', value: model.hair },
    { label: 'Eyes', value: model.eyes },
    { label: 'Location', value: model.location },
  ].filter((m) => m.value);

  const sortedImages = [...model.images].sort((a: any, b: any) => a.order - b.order);

  return (
    <>
      <article className="pt-24 lg:pt-32 bg-white text-black min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-neutral-200 pb-6 no-print">
            <Link
              href={`/${model.gender}`}
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black group"
              aria-label={`Back to ${model.gender === 'women' ? 'Women' : 'Men'} models`}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              Back to {model.gender === 'women' ? 'Women' : 'Men'}
            </Link>

            <GenderToggle currentGender="all" />
          </div>

          {/* Model Slideshow and Attributes Panel */}
          {sortedImages.length > 0 ? (
            <ModelSlideshow
              images={sortedImages}
              modelName={model.name}
              measurements={measurements}
              bio={model.bio}
            />
          ) : (
            <div className="text-center py-20 text-neutral-500">No profile photos available.</div>
          )}
        </div>
      </article>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: model.gender === 'women' ? 'Women' : 'Men', url: `/${model.gender}` },
              { name: model.name, url: `/model/${model.slug}` },
            ]),
            generatePersonSchema(model),
          ]),
        }}
      />
    </>
  );
}
