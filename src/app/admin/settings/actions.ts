"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@/auth";
import { logAdminAction } from "@/lib/edge-data";
import { uploadMedia } from "@/lib/storage";
import { processImageToWebP } from "@/lib/media-processor";

export async function updateGeneralSettings(formData: FormData) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  try {
    const maintenance_enabled = formData.get("maintenance_enabled") === "on";
    const allow_admin_password = formData.get("allow_admin_password") === "on";
    const maintenance_title = formData.get("maintenance_title") as string;
    const maintenance_subtitle = formData.get("maintenance_subtitle") as string;
    const maintenance_description = formData.get("maintenance_description") as string;
    const button_text = formData.get("button_text") as string;
    const password_placeholder = formData.get("password_placeholder") as string;
    const footer_text = formData.get("footer_text") as string;
    const contact_email = formData.get("contact_email") as string;

    const logoFile = formData.get("logo") as File;
    const bgFile = formData.get("background_image") as File;

    const updatePayload: any = {
      maintenance_enabled,
      allow_admin_password,
      maintenance_title,
      maintenance_subtitle,
      maintenance_description,
      button_text,
      password_placeholder,
      footer_text,
      contact_email,
      updated_by: session.user?.email,
    };

    // Handle logo upload
    if (logoFile && logoFile.size > 0) {
      let buffer: any = Buffer.from(await logoFile.arrayBuffer());
      let fileName = logoFile.name;
      
      const processedBuffer = await processImageToWebP(buffer);
      if (processedBuffer.length !== buffer.length) {
        buffer = processedBuffer;
        const baseName = logoFile.name.substring(0, logoFile.name.lastIndexOf('.')) || logoFile.name;
        fileName = `${baseName}.webp`;
      }

      const publicUrl = await uploadMedia(buffer, "settings", fileName, "campaigns");
      updatePayload.logo = publicUrl;
    } else if (formData.get("logo_deleted") === "true") {
      updatePayload.logo = null;
    }

    // Handle bg image upload
    if (bgFile && bgFile.size > 0) {
      let buffer: any = Buffer.from(await bgFile.arrayBuffer());
      let fileName = bgFile.name;
      
      const processedBuffer = await processImageToWebP(buffer);
      if (processedBuffer.length !== buffer.length) {
        buffer = processedBuffer;
        const baseName = bgFile.name.substring(0, bgFile.name.lastIndexOf('.')) || bgFile.name;
        fileName = `${baseName}.webp`;
      }

      const publicUrl = await uploadMedia(buffer, "settings", fileName, "campaigns");
      updatePayload.background_image = publicUrl;
    } else if (formData.get("background_deleted") === "true") {
      updatePayload.background_image = null;
    }

    const { error } = await supabaseAdmin
      .from("website_settings")
      .update(updatePayload)
      .eq("id", "default");

    if (error) {
      console.error("Update settings error:", error);
      return { success: false, error: "Gagal menyimpan pengaturan." };
    }

    await logAdminAction("update", "website_settings", "default", "Updated website general/maintenance settings", session.user?.email || "admin");
    
    revalidatePath("/maintenance");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Update general settings error:", err);
    return { success: false, error: err.message || "Terjadi kesalahan." };
  }
}

export async function updateWebsitePassword(password: string) {
  const session = await auth();
  if (!session || (session.user as any)?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  if (!password) {
    return { success: false, error: "Password tidak boleh kosong." };
  }

  try {
    const { hash } = await import("bcrypt-ts");
    const website_password_hash = await hash(password, 10);

    const { error } = await supabaseAdmin
      .from("website_settings")
      .update({ website_password_hash })
      .eq("id", "default");

    if (error) {
      console.error("Update website password error:", error);
      return { success: false, error: "Gagal memperbarui password akses." };
    }

    await logAdminAction("update", "website_settings", "default", "Updated website access password", session.user?.email || "admin");
    return { success: true };
  } catch (err: any) {
    console.error("Update website password error:", err);
    return { success: false, error: "Terjadi kesalahan." };
  }
}

export async function updateAdminPassword(currentPass: string, newPass: string) {
  const session = await auth();
  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Fetch current admin details
    const { data: admin, error: fetchError } = await supabaseAdmin
      .from("AdminUser")
      .select("password")
      .eq("email", session.user.email)
      .single();

    if (fetchError || !admin) {
      return { success: false, error: "Akun admin tidak ditemukan." };
    }

    // 2. Compare current password
    const { compare, hash } = await import("bcrypt-ts");
    const isValid = await compare(currentPass, admin.password);
    if (!isValid) {
      return { success: false, error: "Password saat ini salah." };
    }

    // 3. Hash and save new password
    const hashedNewPass = await hash(newPass, 10);
    const { error: updateError } = await supabaseAdmin
      .from("AdminUser")
      .update({ password: hashedNewPass })
      .eq("email", session.user.email);

    if (updateError) {
      console.error("Update admin password error:", updateError);
      return { success: false, error: "Gagal memperbarui password admin." };
    }

    await logAdminAction("update", "AdminUser", session.user.id, "Updated admin password", session.user.email);
    return { success: true };
  } catch (err: any) {
    console.error("Update admin password error:", err);
    return { success: false, error: "Terjadi kesalahan." };
  }
}
