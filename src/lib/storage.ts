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

    // Industrial Flattening: We use uuid directly as filename within the provided path
    // Previous versions had redundant 'models/models' folders; now we keep it clean.
    const fullPath = `${path}/${uuidv4()}${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket) 
      .upload(fullPath, finalBuffer, {
        contentType,
        cacheControl: "31536000",
        upsert: true,
      });

    if (uploadError) throw new Error(`Supabase Storage Upload Error: ${uploadError.message}`);

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fullPath);

    if (!publicUrl) throw new Error("Failed to generate Public URL from storage provider.");

    console.log(`✅ Media successfully uploaded to bucket '${bucket}': ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error("Industrial Upload error:", error);
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
    // v35.3.4 Correction: index 5 is the bucket name, index 4 is 'public'
    const bucket = pathParts[5];
    const path = pathParts.slice(6).join("/"); 

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error(`Delete error for ${url}:`, error);
  }
}
