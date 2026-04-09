import { Metadata } from 'next';
import { CampaignGrid } from '@/components/models/CampaignCard';
import { mockCampaigns } from '@/lib/data';
import type { Campaign } from '@/types';
import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo';
import { getCampaignsList } from '@/lib/edge-data';

export const revalidate = 3600;

export const metadata: Metadata = generateSEO({
  title: 'Jobs & Campaigns',
  description:
    'Explore the latest campaigns and modelling jobs at WhoKnows Models. See our models in action across fashion editorials, runway shows, and commercial campaigns.',
  keywords: [
    'modelling jobs',
    'fashion campaigns',
    'editorial work',
    'runway shows',
    'fashion photography',
    'model portfolios',
    'WhoKnows Models',
  ],
  canonical: '/jobs',
});

async function getCampaigns(): Promise<Campaign[]> {
  const campaigns = await getCampaignsList();
  
  return campaigns.length > 0
    ? (campaigns as unknown as Campaign[])
    : (mockCampaigns as unknown as Campaign[]);
}

export default async function JobsPage() {
  const campaigns = await getCampaigns();

  return (
    <>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 lg:mb-16">
            <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
              Our Work
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight">
              Jobs &amp; Campaigns
            </h1>
          </div>

          <CampaignGrid campaigns={campaigns} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Jobs & Campaigns', url: '/jobs' },
            ])
          ),
        }}
      />
    </>
  );
}
