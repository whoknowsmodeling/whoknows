import { supabaseAdmin } from "./supabase";

/**
 * Edge-native data layer for WhoKnows Models.
 * Provides 100% compatibility with the Cloudflare Worker runtime.
 */

// --- ADMIN FETCHERS ---

export async function getDashboardStats() {
  try {
    const [
      { count: menCount },
      { count: womenCount },
      { count: campaignCount },
      { count: applicationCount }
    ] = await Promise.all([
      supabaseAdmin.from("Model").select("*", { count: 'exact', head: true }).eq("gender", "men"),
      supabaseAdmin.from("Model").select("*", { count: 'exact', head: true }).eq("gender", "women"),
      supabaseAdmin.from("Campaign").select("*", { count: 'exact', head: true }),
      supabaseAdmin.from("Application").select("*", { count: 'exact', head: true }).eq("status", "pending")
    ]);

    return {
      men: menCount || 0,
      women: womenCount || 0,
      campaigns: campaignCount || 0,
      pendingApps: applicationCount || 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { men: 0, women: 0, campaigns: 0, pendingApps: 0 };
  }
}

export async function getModelsList(gender: string) {
  const { data, error } = await supabaseAdmin
    .from("Model")
    .select(`
      *,
      images:ModelImage(*)
    `)
    .eq("gender", gender)
    .order("order", { ascending: true });

  if (error) {
    console.error(`Error fetching ${gender} models:`, error);
    return [];
  }

  return (data || []).map(model => ({
    ...model,
    images: model.images || []
  }));
}

// --- PUBLIC FETCHERS ---

export async function getPublicHomeData() {
  try {
    const [
      { data: models },
      { data: campaigns },
      { data: heroSlides },
      { data: clients }
    ] = await Promise.all([
      supabaseAdmin.from("Model").select(`*, images:ModelImage(*)`).eq("featured", true).order("order", { ascending: true }),
      supabaseAdmin.from("Campaign").select(`*, images:CampaignImage(*), models:CampaignModel(model:Model(*, images:ModelImage(*)))`).order("order", { ascending: true }).limit(2),
      supabaseAdmin.from("HeroSlide").select("*").eq("active", true).order("order", { ascending: true }),
      supabaseAdmin.from("Client").select("*").eq("active", true).order("order", { ascending: true })
    ]);

    return {
      featuredModels: models || [],
      campaigns: campaigns || [],
      heroSlides: heroSlides || [],
      clients: clients || [],
      galleryModels: (models || []).slice(0, 18)
    };
  } catch (error) {
    console.error("Error fetching public home data:", error);
    return null;
  }
}

export async function getGenderRoster(gender: string) {
  const { data, error } = await supabaseAdmin
    .from("Model")
    .select(`
      *,
      images:ModelImage(*)
    `)
    .eq("gender", gender)
    .order("order", { ascending: true });

  if (error) {
    console.error(`Error fetching ${gender} roster:`, error);
    return [];
  }

  return data || [];
}

export async function getModelDetail(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("Model")
    .select(`
      *,
      images:ModelImage(*)
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching model detail:", error);
    return null;
  }

  return data;
}

export async function getSitemapSlugs() {
  const { data, error } = await supabaseAdmin
    .from("Model")
    .select("slug");

  if (error) return [];
  return data.map(m => m.slug);
}

// Legacy Admin Helpers (re-exported/continued)
export async function getApplicationsList() {
  const { data, error } = await supabaseAdmin.from("Application").select(`*, photos:ApplicationPhoto(*)`).order("createdAt", { ascending: false });
  return data || [];
}

export async function getContactSubmissions() {
  const { data, error } = await supabaseAdmin.from("ContactSubmission").select("*").order("createdAt", { ascending: false });
  return data || [];
}

export async function getCampaignsList() {
  const { data, error } = await supabaseAdmin.from("Campaign").select(`*, models:CampaignModel(model:Model(id, name))`).order("createdAt", { ascending: false });
  return data || [];
}

export async function getSimpleModelsList() {
  const { data, error } = await supabaseAdmin.from("Model").select("id, name").order("name", { ascending: true });
  return data || [];
}

export async function getAdminLogs() {
  const { data, error } = await supabaseAdmin.from("AdminLog").select("*").order("createdAt", { ascending: false }).limit(100);
  return data || [];
}

export async function getHeroSlides() {
  const { data, error } = await supabaseAdmin.from("HeroSlide").select("*").order("order", { ascending: true });
  return data || [];
}
