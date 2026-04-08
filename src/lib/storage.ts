import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Must be Service Role for uploads

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function uploadImage(file: Buffer, path: string, filename: string) {
  try {
    // Convert to target webp format (Advanced quality)
    const optimizedBuffer = await sharp(file)
      .webp({ 
        quality: 85, 
        effort: 6, // Higher effort for better compression
        lossless: false,
        smartSubsample: true
      })
      .toBuffer();

    const fullPath = `${path}/${filename}_${uuidv4()}.webp`;

    const { data, error } = await supabase.storage
      .from("models") // Default bucket name
      .upload(fullPath, optimizedBuffer, {
        contentType: "image/webp",
        cacheControl: "31536000",
        upsert: true,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from("models")
      .getPublicUrl(fullPath);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

export async function deleteImage(url: string) {
  try {
    // Extract path from public URL
    const urlObj = new URL(url);
    const path = urlObj.pathname.split("/").slice(3).join("/"); // Adjust based on Supabase URL structure

    const { error } = await supabase.storage
      .from("models")
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error("Delete error:", error);
  }
}
