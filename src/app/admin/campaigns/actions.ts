"use server";

import { revalidatePath } from "next/cache";
import { uploadMedia, deleteImage } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";
import { logAdminAction } from "@/lib/edge-data";
import { supabaseAdmin } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function createCampaign(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = slugify(title);
  const id = uuidv4(); // Explicitly generate UUID for Supabase insert compatibility
  
  const coverImageFile = formData.get("coverImage") as File;
  let coverImageUrl = "";
  let coverVideoUrl = "";

  if (coverImageFile && coverImageFile.size > 0) {
    const buffer = Buffer.from(await coverImageFile.arrayBuffer());
    const publicUrl = await uploadMedia(buffer, "campaigns", coverImageFile.name);
    
    if (coverImageFile.name.match(/\.(mp4|mov|avi|mkv|webm)$/i)) {
      coverVideoUrl = publicUrl;
    } else {
      coverImageUrl = publicUrl;
    }
  }

  const active = formData.get("active") === "on";
  const featured = formData.get("featured") === "on";

  const { data: campaign, error: campaignError } = await supabaseAdmin
    .from("Campaign")
    .insert({
      id,
      title,
      slug,
      description: formData.get("description") as string,
      client: formData.get("client") as string,
      year: formData.get("year") as string,
      coverImage: coverImageUrl || null,
      videoUrl: coverVideoUrl || null,
      active,
      featured,
    })
    .select()
    .single();

  if (campaignError) {
    console.error("Create campaign error:", campaignError);
    throw new Error(`Failed to create campaign: ${campaignError.message}`);
  }

  // Handle models relationship
  const modelIds = formData.getAll("modelIds") as string[];
  if (modelIds.length > 0) {
    const junctionData = modelIds.map(modelId => ({
      campaignId: campaign.id,
      modelId,
    }));
    await supabaseAdmin.from("CampaignModel").insert(junctionData);
  }

  // Handle gallery items (Images or Videos)
  const files = formData.getAll("images") as File[];
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const publicUrl = await uploadMedia(buffer, `campaigns/${campaign.id}`, file.name);
      
      const isVideo = file.name.match(/\.(mp4|mov|avi|mkv|webm)$/i);
      
      await supabaseAdmin.from("CampaignImage").insert({
        id: uuidv4(),
        campaignId: campaign.id,
        imageUrl: isVideo ? null : publicUrl,
        videoUrl: isVideo ? publicUrl : null,
        order: i,
      });
    }
  }

  await logAdminAction("create", "campaign", campaign.id, `Created campaign: ${title}`);

  revalidatePath("/admin/campaigns");
  revalidatePath("/jobs");
  redirect("/admin/campaigns");
}

export async function updateCampaign(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing campaign ID for update");

  const title = formData.get("title") as string;
  const active = formData.get("active") === "on";
  const featured = formData.get("featured") === "on";

  // 1. Basic Update
  const { error: updateError } = await supabaseAdmin
    .from("Campaign")
    .update({
      title,
      description: formData.get("description") as string,
      client: formData.get("client") as string,
      year: formData.get("year") as string,
      active,
      featured,
    })
    .eq("id", id);

  if (updateError) throw new Error(`Update failed: ${updateError.message}`);

  // 2. Refresh relationships
  const modelIds = formData.getAll("modelIds") as string[];
  await supabaseAdmin.from("CampaignModel").delete().eq("campaignId", id);
  if (modelIds.length > 0) {
    const junctionData = modelIds.map(modelId => ({ campaignId: id, modelId }));
    await supabaseAdmin.from("CampaignModel").insert(junctionData);
  }

  await logAdminAction("update", "campaign", id, `Updated campaign: ${title}`);
  
  revalidatePath("/admin/campaigns");
  revalidatePath("/jobs");
  return { success: true };
}

export async function deleteCampaign(id: string) {
  const { data: campaign } = await supabaseAdmin
    .from("Campaign")
    .select(`*, images:CampaignImage(*)`)
    .eq("id", id)
    .single();

  if (campaign) {
    // Delete files from storage
    if (campaign.coverImage) await deleteImage(campaign.coverImage);
    if (campaign.videoUrl) await deleteImage(campaign.videoUrl);
    
    if (campaign.images) {
      for (const img of campaign.images) {
        if (img.imageUrl) await deleteImage(img.imageUrl);
        if (img.videoUrl) await deleteImage(img.videoUrl);
      }
    }
    
    const { error: deleteError } = await supabaseAdmin
      .from("Campaign")
      .delete()
      .eq("id", id);
    
    if (deleteError) throw new Error("Failed to delete campaign");

    await logAdminAction("delete", "campaign", id, `Deleted campaign: ${campaign.title}`);
  }

  revalidatePath("/admin/campaigns");
  revalidatePath("/jobs");
}
