"use server";

import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";
import { logAdminAction } from "@/lib/edge-data";
import { supabaseAdmin } from "@/lib/supabase";

export async function createCampaign(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = slugify(title);
  
  const coverImageFile = formData.get("coverImage") as File;
  let coverImageUrl = "";

  if (coverImageFile && coverImageFile.size > 0) {
    const buffer = Buffer.from(await coverImageFile.arrayBuffer());
    coverImageUrl = await uploadImage(buffer, "campaigns", `cover_${Date.now()}`);
  }

  const { data: campaign, error: campaignError } = await supabaseAdmin
    .from("Campaign")
    .insert({
      title,
      slug,
      description: formData.get("description") as string,
      client: formData.get("client") as string,
      year: formData.get("year") as string,
      coverImage: coverImageUrl,
    })
    .select()
    .single();

  if (campaignError) {
    console.error("Create campaign error:", campaignError);
    throw new Error("Failed to create campaign");
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

  // Handle gallery images
  const images = formData.getAll("images") as File[];
  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadImage(buffer, `campaigns/${campaign.id}`, `image_${i}`);
      
      await supabaseAdmin.from("CampaignImage").insert({
        campaignId: campaign.id,
        imageUrl,
        order: i,
      });
    }
  }

  await logAdminAction("create", "campaign", campaign.id, `Created campaign: ${title}`);

  revalidatePath("/admin/campaigns");
  revalidatePath("/jobs");
  redirect("/admin/campaigns");
}

export async function deleteCampaign(id: string) {
  const { data: campaign } = await supabaseAdmin
    .from("Campaign")
    .select(`*, images:CampaignImage(*)`)
    .eq("id", id)
    .single();

  if (campaign) {
    if (campaign.coverImage) {
      await deleteImage(campaign.coverImage);
    }
    if (campaign.images) {
      for (const img of campaign.images) {
        await deleteImage(img.imageUrl);
      }
    }
    
    const { error: deleteError } = await supabaseAdmin
      .from("Campaign")
      .delete()
      .eq("id", id);
    
    if (deleteError) {
      console.error("Delete campaign error:", deleteError);
      throw new Error("Failed to delete campaign");
    }

    await logAdminAction("delete", "campaign", id, `Deleted campaign: ${campaign.title}`);
  }

  revalidatePath("/admin/campaigns");
  revalidatePath("/jobs");
}
