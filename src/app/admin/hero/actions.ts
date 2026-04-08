"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadImage, deleteImage } from "@/lib/storage";

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
    await db.heroSlide.update({
      where: { id },
      data: { title, subtitle, link, imageUrl, active },
    });
  } else {
    const lastSlide = await db.heroSlide.findFirst({
      orderBy: { order: "desc" },
    });
    const order = lastSlide ? lastSlide.order + 1 : 0;
    
    await db.heroSlide.create({
      data: { title, subtitle, link, imageUrl, active, order },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function deleteHeroSlide(id: string) {
  const slide = await db.heroSlide.findUnique({
    where: { id },
  });

  if (slide) {
    await deleteImage(slide.imageUrl);
    await db.heroSlide.delete({
      where: { id },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
}

export async function updateHeroSlideOrder(slides: { id: string, order: number }[]) {
  for (const slide of slides) {
    await db.heroSlide.update({
      where: { id: slide.id },
      data: { order: slide.order },
    });
  }
  revalidatePath("/");
}
