export const dynamicParams = false;
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { ImageGallery } from '@/components/models/ImageGallery';
import { mockModels } from '@/lib/data';
import { db } from '@/lib/db';
import { generateSEO, generateBreadcrumbSchema, generatePersonSchema } from '@/lib/seo';
import { Button } from '@/components/ui/button';

export const revalidate = 60;

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

  const groupedImages = model.images.reduce((acc: any, img: any) => {
    const concept = img.concept || 'Portfolio';
    if (!acc[concept]) acc[concept] = [];
    acc[concept].push(img);
    return acc;
  }, {});

  const concepts = Object.keys(groupedImages).sort((a, b) => {
    if (a === 'Portfolio') return -1;
    if (b === 'Portfolio') return 1;
    return a.localeCompare(b);
  });

  return (
    <>
      <article className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Link */}
          <Link
            href={`/${model.gender}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black mb-12 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black group"
            aria-label={`Back to ${model.gender === 'women' ? 'Women' : 'Men'} models`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to {model.gender === 'women' ? 'Women' : 'Men'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Gallery Section */}
            <div className="lg:col-span-8 space-y-16">
              {concepts.map((concept) => (
                <div key={concept} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="font-serif text-2xl lowercase tracking-tight opacity-50 italic">{concept}</h2>
                    <div className="h-px flex-1 bg-neutral-100" />
                  </div>
                  <ImageGallery images={groupedImages[concept]} columns={2} />
                </div>
              ))}
            </div>

            {/* Model Info Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tighter mb-6 uppercase">
                    {model.name}
                  </h1>
                  {model.bio && (
                    <p className="text-neutral-500 leading-relaxed font-light">{model.bio}</p>
                  )}
                </div>

                {/* Measurements */}
                <div className="space-y-6">
                  <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
                    Attributes
                  </h2>
                  <dl className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-neutral-100 pt-6">
                    {measurements.map(({ label, value }) => (
                      <div key={label} className="space-y-1">
                        <dt className="text-[10px] uppercase tracking-widest text-neutral-400">{label}</dt>
                        <dd className="font-medium text-sm">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 pt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-500">Available for Booking</span>
                </div>

                {/* Booking Button */}
                <Button
                  asChild
                  className="w-full bg-black hover:bg-neutral-800 text-white py-8 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <a
                    href={`mailto:contact@whoknows.pages.dev?subject=Booking Inquiry: ${encodeURIComponent(model.name)}`}
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
