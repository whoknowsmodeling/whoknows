import { MetadataRoute } from "next";
import { supabaseAdmin } from "@/lib/supabase"; // Using existing admin client for simplicity and reliability in sitemap generation

export const revalidate = 86400; // 24 hours

/**
 * Dynamic Sitemap Generator (Prompt 3 Implementation)
 * Orchestrates a large-scale indexing map for four distinct database layers.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whoknows.beauty";

  // --- Static Core Routes (Priority 1.0) ---
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/models`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/apply`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/women`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/men`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    // --- Parallel Data Fetching (Prompt 3 Requirement 6) ---
    const [modelsRes, campaignsRes, blogsRes, clustersRes] = await Promise.all([
      supabaseAdmin.from("Model").select("slug"),
      supabaseAdmin.from("Campaign").select("slug"),
      supabaseAdmin.from("Blog").select("slug").eq("status", "PUBLISHED"),
      supabaseAdmin.from("ClusterPages").select("slug, clusterSlug").eq("status", "PUBLISHED"),
    ]);

    // --- dynamic Route Mapping ---

    // ClusterPages (Priority 0.9, weekly)
    const clusterRoutes: MetadataRoute.Sitemap = (clustersRes.data || []).map((page) => ({
      url: `${baseUrl}/services/${page.clusterSlug}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    // Model Profiles (Priority 0.8, weekly)
    const modelRoutes: MetadataRoute.Sitemap = (modelsRes.data || []).map((model) => ({
      url: `${baseUrl}/model/${model.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Campaign/Jobs (Priority 0.7, monthly)
    const campaignRoutes: MetadataRoute.Sitemap = (campaignsRes.data || []).map((camp) => ({
      url: `${baseUrl}/jobs/${camp.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    // Blog Posts (Priority 0.7, monthly)
    const blogRoutes: MetadataRoute.Sitemap = (blogsRes.data || []).map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [
      ...staticRoutes,
      ...clusterRoutes,
      ...modelRoutes,
      ...campaignRoutes,
      ...blogRoutes,
    ];
  } catch (error) {
    console.error("Sitemap generation error, falling back to static routes:", error);
    return staticRoutes;
  }
}
