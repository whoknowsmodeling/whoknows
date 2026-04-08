export const runtime = 'edge';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ImageGallery } from '@/components/models/ImageGallery';
import { ModelCard } from '@/components/models/ModelCard';
import { mockCampaigns } from '@/lib/data';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';

interface CampaignPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockCampaigns.map((campaign) => ({
    slug: campaign.slug,
  }));
}

export async function generateMetadata({ params }: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = mockCampaigns.find((c) => c.slug === slug);

  if (!campaign) {
    return {
      title: 'Campaign Not Found',
    };
  }

  return generateSEO({
    title: `${campaign.title} - Campaign`,
    description: campaign.description || `${campaign.title} campaign featuring WhoKnows Models talent. ${campaign.client ? `Client: ${campaign.client}.` : ''} ${campaign.year ? `Year: ${campaign.year}.` : ''}`,
    keywords: [
      campaign.title,
      'fashion campaign',
      'editorial',
      campaign.client || '',
      'WhoKnows Models',
    ],
    ogImage: campaign.coverImage || undefined,
    canonical: `/jobs/${campaign.slug}`,
  });
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  const campaign = mockCampaigns.find((c) => c.slug === slug);

  if (!campaign) {
    notFound();
  }

  return (
    <>
      <article className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Link */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs & Campaigns
          </Link>

          <div className="mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              {campaign.title}
            </h1>
            <div className="flex items-center gap-4 text-neutral-500">
              {campaign.client && <span>{campaign.client}</span>}
              {campaign.client && campaign.year && <span>•</span>}
              {campaign.year && <span>{campaign.year}</span>}
            </div>
          </div>

          {campaign.description && (
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mb-12">
              {campaign.description}
            </p>
          )}

          {/* Campaign Images */}
          {campaign.images && campaign.images.length > 0 && (
            <div className="mb-16">
              <ImageGallery images={campaign.images} columns={3} />
            </div>
          )}

          {/* Featured Models */}
          {campaign.models && campaign.models.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-medium tracking-tight mb-8">
                Featured Models
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaign.models
                  .filter(m => m.model)
                  .map(({ model }, index) => (
                    <ModelCard key={model.id} model={model} index={index} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Jobs & Campaigns', url: '/jobs' },
              { name: campaign.title, url: `/jobs/${campaign.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}
