import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { processImageToWebP, processVideoToWebm, isVideoFile } from "./media-processor";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase storage credentials missing. Local uploads will fail.");
}

const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseServiceKey || "placeholder"
);

/**
 * 🏎️ High-Performance Media Hosting
 * Uploads images (auto-converted to WebP) or videos (auto-transcoded to Webm).
 */
export async function uploadMedia(file: Buffer, path: string, originalName: string, bucket: string = "models") {
  try {
    let finalBuffer = file;
    let extension = ".webp";
    let contentType = "image/webp";

    if (isVideoFile(originalName)) {
      console.log(`🎬 Transcoding video: ${originalName}`);
      finalBuffer = await processVideoToWebm(file);
      extension = ".webm";
      contentType = "video/webm";
    } else {
      console.log(`🖼️ Converting image to WebP: ${originalName}`);
      finalBuffer = await processImageToWebP(file);
    }

    const fullPath = `${path}/${uuidv4()}${extension}`;

    const { error } = await supabase.storage
      .from(bucket) 
      .upload(fullPath, finalBuffer, {
        contentType,
        cacheControl: "31536000",
        upsert: true,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

// Keep legacy uploadImage for compatibility, but map it to new logic
export async function uploadImage(file: Buffer, path: string, filename: string) {
  return uploadMedia(file, path, filename);
}

export async function deleteImage(url: string) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    // Supabase URLs: /storage/v1/object/public/BUCKET/PATH
    // index 4 is the bucket name
    const bucket = pathParts[4];
    const path = pathParts.slice(5).join("/"); 

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error(`Delete error for ${url}:`, error);
  }
}
