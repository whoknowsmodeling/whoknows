import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testPublicUrl() {
  const bucket = "models";
  const fullPath = "test-folder/test.webp";
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fullPath);
    
  console.log("Generated Public URL:", publicUrl);
  
  if (!publicUrl.includes("/public/")) {
      console.error("❌ CRITICAL: Generated URL is missing '/public/'. This will fail to render!");
  } else {
      console.log("✅ URL contains '/public/'.");
  }
}

testPublicUrl();
