import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkImageUrls() {
  console.log("🚀 Checking specific Image URLs in ModelImage table...");
  const { data: images, error } = await supabase
    .from("ModelImage")
    .select("imageUrl, modelId")
    .limit(10);
  
  if (error) {
    console.error("❌ Error fetching images:", error);
  } else {
    console.log(`Found ${images.length} image records:`);
    images.forEach(img => console.log(`- ModelID ${img.modelId}: ${img.imageUrl}`));
  }
}

checkImageUrls();
