"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { redirect } from "next/navigation";
import { logAction } from "@/lib/logger";

export async function createCampaign(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = slugify(title);
  
  const coverImageFile = formData.get("coverImage") as File;
  let coverImageUrl = "";

  if (coverImageFile && coverImageFile.size > 0) {
    const buffer = Buffer.from(await coverImageFile.arrayBuffer());
    coverImageUrl = await uploadImage(buffer, "campaigns", `cover_${Date.now()}`);
  }

  const campaign = await db.campaign.create({
    data: {
      title,
      slug,
      description: formData.get("description") as string,
      client: formData.get("client") as string,
      year: formData.get("year") as string,
      coverImage: coverImageUrl,
    },
  });

  // Handle models relationship
  const modelIds = formData.getAll("modelIds") as string[];
  if (modelIds.length > 0) {
    await db.campaignModel.createMany({
      data: modelIds.map(modelId => ({
        campaignId: campaign.id,
        modelId,
      })),
    });
  }

  // Handle gallery images
  const images = formData.getAll("images") as File[];
  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadImage(buffer, `campaigns/${campaign.id}`, `image_${i}`);
      
      await db.campaignImage.create({
        data: {
          campaignId: campaign.id,
          imageUrl,
          order: i,
        },
      });
    }
  }

  await logAction("create", "campaign", campaign.id, `Created campaign: ${title}`);

  revalidatePath("/admin/campaigns");
  revalidatePath("/campaigns");
  redirect("/admin/campaigns");
}

export async function deleteCampaign(id: string) {
  const campaign = await db.campaign.findUnique({
    where: { id },
    include: { images: true },
  });

  if (campaign) {
    if (campaign.coverImage) {
      await deleteImage(campaign.coverImage);
    }
    for (const img of campaign.images) {
      await deleteImage(img.imageUrl);
    }
    await db.campaign.delete({
      where: { id },
    });
    await logAction("delete", "campaign", id, `Deleted campaign: ${campaign.title}`);
  }

  revalidatePath("/admin/campaigns");
  revalidatePath("/campaigns");
}
