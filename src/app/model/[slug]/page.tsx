import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { ImageGallery } from '@/components/models/ImageGallery';
import { mockModels } from '@/lib/data';
import { db } from '@/lib/db';
import { generateSEO, generateBreadcrumbSchema, generatePersonSchema } from '@/lib/seo';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;

interface ModelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const models = await db.model.findMany({ select: { slug: true } });
    if (models.length > 0) {
      return models.map((model) => ({ slug: model.slug }));
    }
  } catch {
    // Fall back to mock data slugs
  }
  return mockModels.map((model) => ({ slug: model.slug }));
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try DB first
  let model: { name: string; bio?: string | null; gender: string; height?: string | null; location?: string | null; images: { imageUrl: string; isPrimary: boolean }[]; slug: string } | null = null;
  try {
    model = await db.model.findUnique({
      where: { slug },
      include: { images: { orderBy: { order: 'asc' } } },
    });
  } catch {
    // ignore
  }

  // Fall back to mock data
  if (!model) {
    model = mockModels.find((m) => m.slug === slug) ?? null;
  }

  if (!model) {
    return { title: 'Model Not Found' };
  }

  const primaryImage = model.images.find((img) => img.isPrimary) || model.images[0];

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

  // Try DB first
  let model: {
    id: string;
    name: string;
    slug: string;
    gender: string;
    height?: string | null;
    chest?: string | null;
    waist?: string | null;
    hips?: string | null;
    hair?: string | null;
    eyes?: string | null;
    location?: string | null;
    bio?: string | null;
    featured: boolean;
    order: number;
    images: { id: string; modelId: string; imageUrl: string; alt?: string | null; order: number; isPrimary: boolean }[];
  } | null = null;

  try {
    model = await db.model.findUnique({
      where: { slug },
      include: { images: { orderBy: { order: 'asc' } } },
    });
  } catch {
    // fall back
  }

  if (!model) {
    const mockModel = mockModels.find((m) => m.slug === slug);
    if (!mockModel) notFound();
    model = {
      ...mockModel,
      images: mockModel.images.map((img) => ({
        ...img,
        alt: img.alt ?? null,
      })),
    };
  }

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

  return (
    <>
      <article className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Link */}
          <Link
            href={`/${model.gender}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black mb-8 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            aria-label={`Back to ${model.gender === 'women' ? 'Women' : 'Men'} models`}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to {model.gender === 'women' ? 'Women' : 'Men'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="lg:col-span-2">
              <ImageGallery images={model.images} columns={2} />
            </div>

            {/* Model Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h1 className="font-serif text-3xl lg:text-4xl font-medium tracking-tight mb-4">
                  {model.name}
                </h1>

                {model.bio && (
                  <p className="text-neutral-600 leading-relaxed mb-8">{model.bio}</p>
                )}

                {/* Measurements */}
                <div className="mb-8">
                  <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">
                    Measurements
                  </h2>
                  <dl className="space-y-3">
                    {measurements.map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <dt className="text-neutral-500">{label}</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Booking Button */}
                <Button
                  asChild
                  className="w-full bg-black hover:bg-neutral-800 text-white"
                >
                  <a
                    href={`mailto:contact@whoknowsmodels.com?subject=Booking Inquiry: ${encodeURIComponent(model.name)}`}
                    aria-label={`Book ${model.name.split(' ')[0]} via email`}
                  >
                    <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                    Book {model.name.split(' ')[0]}
                  </a>
                </Button>
              </div>
            </div>
          </div>
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
