"use server";

import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/storage";
import { supabaseAdmin } from "@/lib/supabase";

export async function upsertHeroSlide(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const link = formData.get("link") as string;
  const active = formData.get("active") === "on";
  
  const imageFile = formData.get("image") as File;
  let imageUrl = formData.get("currentImageUrl") as string;

  if (imageFile && imageFile.size > 0) {
    // Delete old image if updating
    if (imageUrl) {
      await deleteImage(imageUrl);
    }
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    imageUrl = await uploadImage(buffer, "hero-slides", `hero_${Date.now()}`);
  }

  if (id) {
    await supabaseAdmin
      .from("HeroSlide")
      .update({ title, subtitle, link, imageUrl, active })
      .eq("id", id);
  } else {
    const { data: lastSlides } = await supabaseAdmin
      .from("HeroSlide")
      .select("order")
      .order("order", { ascending: false })
      .limit(1);

    const order = lastSlides && lastSlides.length > 0 ? (lastSlides[0].order || 0) + 1 : 0;
    
    await supabaseAdmin
      .from("HeroSlide")
      .insert({ title, subtitle, link, imageUrl, active, order });
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function deleteHeroSlide(id: string) {
  const { data: slide } = await supabaseAdmin
    .from("HeroSlide")
    .select("imageUrl")
    .eq("id", id)
    .single();

  if (slide) {
    await deleteImage(slide.imageUrl);
    await supabaseAdmin
      .from("HeroSlide")
      .delete()
      .eq("id", id);
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function updateHeroSlideOrder(slides: { id: string, order: number }[]) {
  // Supabase doesn't have a direct batch update-by-matching-id in one Go easily without RPC or loop
  // For small hero counts, loop is fine
  for (const slide of slides) {
    await supabaseAdmin
      .from("HeroSlide")
      .update({ order: slide.order })
      .eq("id", slide.id);
  }
  revalidatePath("/");
}
