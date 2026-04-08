"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage, deleteImage } from "@/lib/storage";
import { slugify } from "@/lib/utils";

export async function createModel(formData: FormData) {
  const name = formData.get("name") as string;
  const gender = formData.get("gender") as string;
  const slug = slugify(name);

  const model = await db.model.create({
    data: {
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
    },
  });

  // Handle image uploads if any
  const images = formData.getAll("images") as File[];
  const primaryIndex = parseInt(formData.get("primaryImageIndex") as string || "0");

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadImage(buffer, `models/${model.id}`, `image_${i}`);
      
      await db.modelImage.create({
        data: {
          modelId: model.id,
          imageUrl,
          isPrimary: i === primaryIndex,
          order: i,
        },
      });
    }
  }

  revalidatePath(`/admin/models/${gender}`);
  revalidatePath(`/${gender}`);
  redirect(`/admin/models/${gender}`);
}

export async function updateModel(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const gender = formData.get("gender") as string;
  const slug = slugify(name);

  await db.model.update({
    where: { id },
    data: {
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
    },
  });

  // Handle new images
  const images = formData.getAll("newImages") as File[];
  if (images && images.length > 0) {
    const currentImagesCount = await db.modelImage.count({ where: { modelId: id } });
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      if (file.size === 0) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const imageUrl = await uploadImage(buffer, `models/${id}`, `image_update_${Date.now()}_${i}`);
      
      await db.modelImage.create({
        data: {
          modelId: id,
          imageUrl,
          isPrimary: false, // New images are not primary by default in update
          order: currentImagesCount + i,
        },
      });
    }
  }

  revalidatePath(`/admin/models/${gender}`);
  revalidatePath(`/${gender}`);
  revalidatePath(`/model/${slug}`);
  redirect(`/admin/models/${gender}`);
}

export async function deleteModel(id: string, gender: string) {
  // Get all images first to delete from storage
  const images = await db.modelImage.findMany({
    where: { modelId: id },
  });

  for (const img of images) {
    await deleteImage(img.imageUrl);
  }

  await db.model.delete({
    where: { id },
  });

  revalidatePath(`/admin/models/${gender}`);
  revalidatePath(`/${gender}`);
}

export async function deleteModelImage(imageId: string) {
  const image = await db.modelImage.findUnique({
    where: { id: imageId },
  });

  if (image) {
    await deleteImage(image.imageUrl);
    await db.modelImage.delete({
      where: { id: imageId },
    });
  }
}

export async function setPrimaryImage(modelId: string, imageId: string) {
  await db.modelImage.updateMany({
    where: { modelId },
    data: { isPrimary: false },
  });

  await db.modelImage.update({
    where: { id: imageId },
    data: { isPrimary: true },
  });
}
