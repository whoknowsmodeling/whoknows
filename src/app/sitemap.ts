import { MetadataRoute } from 'next';
import { mockModels, mockCampaigns } from '@/lib/data';
import { db } from '@/lib/db';

export const revalidate = 86400; // revalidate sitemap daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://whoknowsmodels.com';

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

  // Fetch dynamic model slugs from DB, fall back to mock
  let modelSlugs: string[] = [];
  try {
    const models = await db.model.findMany({ select: { slug: true }, orderBy: { order: 'asc' } });
    modelSlugs = models.length > 0 ? models.map((m) => m.slug) : mockModels.map((m) => m.slug);
  } catch {
    modelSlugs = mockModels.map((m) => m.slug);
  }

  const modelPages: MetadataRoute.Sitemap = modelSlugs.map((slug) => ({
    url: `${baseUrl}/model/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Fetch dynamic campaign slugs from DB, fall back to mock
  let campaignSlugs: string[] = [];
  try {
    const campaigns = await db.campaign.findMany({ select: { slug: true }, orderBy: { order: 'asc' } });
    campaignSlugs = campaigns.length > 0 ? campaigns.map((c) => c.slug) : mockCampaigns.map((c) => c.slug);
  } catch {
    campaignSlugs = mockCampaigns.map((c) => c.slug);
  }

  const campaignPages: MetadataRoute.Sitemap = campaignSlugs.map((slug) => ({
    url: `${baseUrl}/jobs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...modelPages, ...campaignPages];
}
