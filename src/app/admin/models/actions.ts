"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage, deleteImage } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { logAdminAction, deleteModelEdge, deleteModelImageEdge, setPrimaryImageEdge } from "@/lib/edge-data";
import { supabaseAdmin } from "@/lib/supabase";

export async function createModel(formData: FormData) {
  const name = formData.get("name") as string;
  const gender = formData.get("gender") as string;
  const slug = slugify(name);

  // Use Supabase directly for the create so we get the ID back immediately
  const { data: model, error: modelError } = await supabaseAdmin
    .from("Model")
    .insert({
      name,
      slug,
      gender,
      height: formData.get("height") as string,
      chest: formData.get("chest") as string,
      waist: formData.get("waist") as string,
      hips: formData.get("hips") as string,
      hair: formData.get("hair") as string,
      eyes: formData.get("eyes") as string,
      location: formData.get("location") as string,
      bio: formData.get("bio") as string,
      featured: formData.get("featured") === "on",
    })
    .select()
    .single();

  if (modelError) {
    console.error("Create model error:", modelError);
    throw new Error("Failed to create model");
  }

  // Handle image uploads if any
  const images = formData.getAll("images") as File[];
  const primaryIndex = parseInt(formData.get("primaryImageIndex") as string || "0");

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadImage(buffer, `models/${model.id}`, `image_${i}`);
      
      await supabaseAdmin.from("ModelImage").insert({
        modelId: model.id,
        imageUrl,
        isPrimary: i === primaryIndex,
        order: i,
      });
    }
  }

  await logAdminAction("create", "model", model.id, `Created model: ${name}`);

  revalidatePath(`/admin/models/${gender}`);
  revalidatePath(`/${gender}`);
  redirect(`/admin/models/${gender}`);
}

export async function updateModel(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const gender = formData.get("gender") as string;
  const slug = slugify(name);

  const { error: updateError } = await supabaseAdmin
    .from("Model")
    .update({
      name,
      slug,
      gender,
      height: formData.get("height") as string,
      chest: formData.get("chest") as string,
      waist: formData.get("waist") as string,
      hips: formData.get("hips") as string,
      hair: formData.get("hair") as string,
      eyes: formData.get("eyes") as string,
      location: formData.get("location") as string,
      bio: formData.get("bio") as string,
      featured: formData.get("featured") === "on",
    })
    .eq("id", id);

  if (updateError) {
    console.error("Update model error:", updateError);
    throw new Error("Failed to update model");
  }

  // Handle new images
  const images = formData.getAll("newImages") as File[];
  if (images && images.length > 0) {
    const { count: currentImagesCount } = await supabaseAdmin
      .from("ModelImage")
      .select("*", { count: 'exact', head: true })
      .eq("modelId", id);

    const baseCount = currentImagesCount || 0;

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadImage(buffer, `models/${id}`, `image_update_${Date.now()}_${i}`);
      
      await supabaseAdmin.from("ModelImage").insert({
        modelId: id,
        imageUrl,
        isPrimary: false,
        order: baseCount + i,
      });
    }
  }

  await logAdminAction("update", "model", id, `Updated model: ${name}`);

  revalidatePath(`/admin/models/${gender}`);
  revalidatePath(`/${gender}`);
  revalidatePath(`/model/${slug}`);
  redirect(`/admin/models/${gender}`);
}

export async function deleteModel(id: string, gender: string) {
  // Get all images first to delete from storage
  const { data: images } = await supabaseAdmin
    .from("ModelImage")
    .select("imageUrl")
    .eq("modelId", id);

  if (images) {
    for (const img of images) {
      await deleteImage(img.imageUrl);
    }
  }

  await deleteModelEdge(id);

  revalidatePath(`/admin/models/${gender}`);
  revalidatePath(`/${gender}`);
}

export async function deleteModelImage(imageId: string) {
  const { data: image } = await supabaseAdmin
    .from("ModelImage")
    .select("imageUrl")
    .eq("id", imageId)
    .single();

  if (image) {
    await deleteImage(image.imageUrl);
    await deleteModelImageEdge(imageId);
  }
}

export async function setPrimaryImage(modelId: string, imageId: string) {
  await setPrimaryImageEdge(modelId, imageId);
  revalidatePath(`/admin/models/men`); // simplistic revalidate for now
  revalidatePath(`/admin/models/women`);
}
