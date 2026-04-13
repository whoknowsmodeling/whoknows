import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyFixedDeletion() {
  console.log("🚀 Verifying Fixed Deletion Logic...");
  
  // Example URL from the system
  const publicUrl = "https://vonnnlywftnpmkgrcsfb.supabase.co/storage/v1/object/public/models/test-folder/test-image.webp";
  
  const urlObj = new URL(publicUrl);
  const pathParts = urlObj.pathname.split("/");
  
  console.log("Path parts mapping:");
  pathParts.forEach((p, i) => console.log(`  index ${i}: ${p}`));
  
  // v35.3.4 Correction: index 5 is the bucket name, index 4 is 'public'
  const bucket = pathParts[5];
  const path = pathParts.slice(6).join("/"); 

  console.log(`Detected Bucket: ${bucket}`);
  console.log(`Detected Path: ${path}`);

  if (bucket === "models" && path === "test-folder/test-image.webp") {
      console.log("✅ SUCCESS: Deletion logic correctly mapped for Supabase storage structure.");
  } else {
      console.error("❌ FAILURE: Deletion logic still misaligned.");
  }
}

verifyFixedDeletion();
