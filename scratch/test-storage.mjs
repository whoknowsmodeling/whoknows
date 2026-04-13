import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testStorage() {
  console.log("🚀 Testing Supabase Storage...");
  
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
      console.error("Could not list buckets:", bucketError);
      return;
  }
  
  console.log("Available buckets:", buckets.map(b => b.name));

  const targetBucket = "models";
  if (buckets.find(b => b.name === targetBucket)) {
      console.log(`✅ Bucket '${targetBucket}' exists. Testing a dummy image upload...`);
      const buffer = Buffer.from("fake-image-binary-content");
      const { data, error } = await supabase.storage
        .from(targetBucket)
        .upload("test-" + Date.now() + ".webp", buffer, {
          contentType: "image/webp",
        });
      
      if (error) console.error("❌ Upload failed:", error);
      else console.log("✅ Upload successful!", data);
  } else {
      console.error(`❌ Bucket '${targetBucket}' NOT FOUND.`);
  }
}

testStorage();
