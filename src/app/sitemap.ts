import { MetadataRoute } from 'next';
import { mockModels, mockCampaigns } from '@/lib/data';
import { getSitemapSlugs, getCampaignsList } from '@/lib/edge-data';

export const revalidate = 86400; // revalidate sitemap daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://whoknows.pages.dev';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/women`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/men`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Fetch dynamic model slugs from Edge Layer, fall back to mock
  let modelSlugs = await getSitemapSlugs();
  if (modelSlugs.length === 0) {
    modelSlugs = mockModels.map((m) => m.slug);
  }

  const modelPages: MetadataRoute.Sitemap = modelSlugs.map((slug) => ({
    url: `${baseUrl}/model/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Fetch dynamic campaign slugs from Edge Layer, fall back to mock
  const campaigns: any[] = await getCampaignsList();
  let campaignSlugs = campaigns.length > 0 ? campaigns.map((c: any) => c.slug) : mockCampaigns.map((c: any) => c.slug);

  const campaignPages: MetadataRoute.Sitemap = campaignSlugs.map((slug) => ({
    url: `${baseUrl}/jobs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...modelPages, ...campaignPages];
}
