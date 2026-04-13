import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkNewImageUrls() {
  console.log("🚀 Checking for Supabase URLs in ModelImage table...");
  const { data: images, error } = await supabase
    .from("ModelImage")
    .select("imageUrl, modelId")
    .ilike("imageUrl", "%supabase%")
    .limit(10);
  
  if (error) {
    console.error("❌ Error fetching images:", error);
  } else {
    console.log(`Found ${images.length} Supabase-styled image records:`);
    images.forEach(img => console.log(`- ModelID ${img.modelId}: ${img.imageUrl}`));
    
    if (images.length === 0) {
        console.log("No Supabase URLs found. Listing last 10 images added:");
        const { data: lastImages } = await supabase.from("ModelImage").select("imageUrl, created_at").order("created_at", { ascending: false }).limit(10);
        lastImages.forEach(img => console.log(`- [${img.created_at}] ${img.imageUrl}`));
    }
  }
}

checkNewImageUrls();
