"use server";

import { revalidatePath } from "next/cache";
import { uploadMedia, deleteImage } from "@/lib/storage";
import { logAdminAction } from "@/lib/edge-data";
import { supabaseAdmin } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const order = parseInt(formData.get("order") as string || "0");
  const active = formData.get("active") === "on";
  
  const logoFile = formData.get("logo") as File;
  let logoUrl = "";

  if (logoFile && logoFile.size > 0) {
    const buffer = Buffer.from(await logoFile.arrayBuffer());
    logoUrl = await uploadMedia(buffer, "logos", logoFile.name, "clients");
  }

  const { data: client, error } = await supabaseAdmin
    .from("Client")
    .insert({
      id: uuidv4(),
      name,
      logoUrl: logoUrl || null,
      order,
      active
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create client: ${error.message}`);

  await logAdminAction("create", "client", client.id, `Added brand partner: ${name}`);

  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

export async function updateClient(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing client ID");

  const name = formData.get("name") as string;
  const order = parseInt(formData.get("order") as string || "0");
  const active = formData.get("active") === "on";
  
  const logoFile = formData.get("logo") as File;
  let logoUrl = formData.get("existingLogoUrl") as string;

  if (logoFile && logoFile.size > 0) {
    const buffer = Buffer.from(await logoFile.arrayBuffer());
    logoUrl = await uploadMedia(buffer, "logos", logoFile.name, "clients");
  }

  const { error } = await supabaseAdmin
    .from("Client")
    .update({
      name,
      logoUrl,
      order,
      active
    })
    .eq("id", id);

  if (error) throw new Error(`Update failed: ${error.message}`);

  await logAdminAction("update", "client", id, `Updated brand partner: ${name}`);
  
  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

export async function deleteClient(id: string) {
  const { data: client } = await supabaseAdmin
    .from("Client")
    .select("*")
    .eq("id", id)
    .single();

  if (client) {
    if (client.logoUrl) await deleteImage(client.logoUrl);
    
    const { error } = await supabaseAdmin
      .from("Client")
      .delete()
      .eq("id", id);
    
    if (error) throw new Error("Failed to delete client");

    await logAdminAction("delete", "client", id, `Deleted brand partner: ${client.name}`);
  }

  revalidatePath("/admin/clients");
  revalidatePath("/");
}
