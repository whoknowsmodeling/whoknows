import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testNestedUpload() {
  console.log("🚀 Testing Nested Upload to 'models' bucket...");
  const buffer = Buffer.from("fake-image-binary-content");
  
  // Reproducing the logic in actions.ts: Path starts with 'models/'
  const path = "models/test-id"; 
  const fullPath = `${path}/test-${Date.now()}.webp`;
  
  console.log(`Uploading to: ${fullPath} in 'models' bucket`);

  const { data, error } = await supabase.storage
    .from("models")
    .upload(fullPath, buffer, {
      contentType: "image/webp",
    });

  if (error) {
    console.error("❌ Upload failed:", error);
  } else {
    console.log("✅ Upload successful!", data);
    const { data: { publicUrl } } = supabase.storage.from("models").getPublicUrl(fullPath);
    console.log("🔗 Public URL:", publicUrl);
    
    // Test extraction logic from storage.ts (the one I suspect is buggy)
    const urlObj = new URL(publicUrl);
    const pathParts = urlObj.pathname.split("/");
    console.log("Path parts mapping:");
    pathParts.forEach((p, i) => console.log(`  index ${i}: ${p}`));
    console.log(`Current code says bucket is at index 4: ${pathParts[4]}`);
    console.log(`Actual bucket is likely at index 5: ${pathParts[5]}`);
  }
}

testNestedUpload();
