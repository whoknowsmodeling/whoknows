import { supabaseAdmin } from "./supabase";

/**
 * Edge-native data fetching for the Admin Dashboard.
 * These functions use the Supabase SDK (HTTPS fetch) instead of Prisma (TCP)
 * to ensure 100% compatibility with the Cloudflare Worker runtime.
 */

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

export async function getApplicationsList() {
  const { data, error } = await supabaseAdmin
    .from("Application")
    .select(`
      *,
      photos:ApplicationPhoto(*)
    `)
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching applications:", error);
    return [];
  }

  return data || [];
}

export async function getContactSubmissions() {
  const { data, error } = await supabaseAdmin
    .from("ContactSubmission")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching contact submissions:", error);
    return [];
  }

  return data || [];
}

export async function getCampaignsList() {
  const { data, error } = await supabaseAdmin
    .from("Campaign")
    .select(`
      *,
      models:CampaignModel(
        model:Model(id, name)
      )
    `)
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }

  return data || [];
}

export async function getSimpleModelsList() {
  const { data, error } = await supabaseAdmin
    .from("Model")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching simple models list:", error);
    return [];
  }

  return data || [];
}

export async function getHeroSlides() {
  const { data, error } = await supabaseAdmin
    .from("HeroSlide")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }

  return data || [];
}

export async function getAdminLogs() {
  const { data, error } = await supabaseAdmin
    .from("AdminLog")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching admin logs:", error);
    return [];
  }

  return data || [];
}
