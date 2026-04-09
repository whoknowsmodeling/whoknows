import { supabaseAdmin } from "./supabase";
import { supabasePublic } from "./supabase-public";
import { auth } from "@/auth";

// Helper to get the correct client based on environment (Server vs Browser)
const getSupabase = () => {
  const isBrowser = typeof window !== 'undefined';
  return isBrowser ? supabasePublic : supabaseAdmin;
};

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
      supabaseAdmin.from("Model").select(`*, images:ModelImage(*)`).eq("featured", true).order("gender", { ascending: false }).order("order", { ascending: true }),
      supabaseAdmin.from("Campaign").select(`*, images:CampaignImage(*), models:CampaignModel(model:Model(*, images:ModelImage(*)))`).eq("featured", true).eq("active", true).order("createdAt", { ascending: false }).limit(2),
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

export async function getAllModels() {
  const { data, error } = await getSupabase()
    .from("Model")
    .select(`
      *,
      images:ModelImage(*)
    `)
    .order("gender", { ascending: false }) // Women first usually
    .order("order", { ascending: true });

  if (error) {
    console.error(`Error fetching all models:`, error);
    return [];
  }

  const allModels = data || [];
  const women = allModels.filter(m => m.gender === 'women');
  const men = allModels.filter(m => m.gender === 'men');
  
  const interleaved: any[] = [];
  const maxLength = Math.max(women.length, men.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (women[i]) interleaved.push(women[i]);
    if (men[i]) interleaved.push(men[i]);
  }

  return interleaved;
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

export async function getModelById(id: string) {
  const { data, error } = await supabaseAdmin
    .from("Model")
    .select(`
      *,
      images:ModelImage(*)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching model by id:", error);
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

// --- ADMIN MUTATIONS (EDGE-SAFE) ---

export async function logAdminAction(
  action: string,
  entity: string,
  entityId?: string,
  details?: string,
  adminEmail: string = 'system@whoknows.pages.dev'
) {
  const { error } = await supabaseAdmin.from("AdminLog").insert({
    action,
    entity,
    entityId,
    details,
    adminEmail,
  });
  if (error) console.error("AdminLog error:", error);
}

export async function deleteModelEdge(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized: Admin session required.");
  
  // Supabase takes care of cascade if configured, but let's be explicit if needed
  const { error } = await supabaseAdmin.from("Model").delete().eq("id", id);
  if (error) throw error;
  await logAdminAction("delete", "model", id, `Deleted model ${id} via Edge Action`, session.user?.email || 'system');
}

export async function deleteModelImageEdge(imageId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  
  const { error } = await supabaseAdmin.from("ModelImage").delete().eq("id", imageId);
  if (error) throw error;
}

export async function setPrimaryImageEdge(modelId: string, imageId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  // Reset all
  await supabaseAdmin.from("ModelImage").update({ isPrimary: false }).eq("modelId", modelId);
  // Set one
  await supabaseAdmin.from("ModelImage").update({ isPrimary: true }).eq("id", imageId);
}

export async function createContactSubmissionEdge(data: any) {
  const { data: submission, error } = await supabaseAdmin
    .from("ContactSubmission")
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return submission;
}

// Legacy Admin Helpers (now using supabaseAdmin)
export async function getApplicationsList(limit: number = 20, offset: number = 0) {
  const { data, error } = await supabaseAdmin
    .from("Application")
    .select(`*, photos:ApplicationPhoto(*)`)
    .order("createdAt", { ascending: false })
    .range(offset, offset + limit - 1);
  return data || [];
}

export async function getContactSubmissions(limit: number = 20, offset: number = 0) {
  const { data, error } = await supabaseAdmin
    .from("ContactSubmission")
    .select("*")
    .order("createdAt", { ascending: true })
    .range(offset, offset + limit - 1);
  return data || [];
}

export async function getCampaignsList(onlyActive: boolean = false) {
  let query = supabaseAdmin.from("Campaign").select(`*, images:CampaignImage(*), models:CampaignModel(model:Model(id, name))`);
  
  if (onlyActive) {
    query = query.eq("active", true);
  }
  
  const { data, error } = await query.order("createdAt", { ascending: false });
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
