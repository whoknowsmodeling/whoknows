import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAnyHttpUrls() {
  console.log("🚀 Searching for ANY http/https URLs in ModelImage table...");
  const { data: images, error } = await supabase
    .from("ModelImage")
    .select("imageUrl, modelId, createdAt")
    .ilike("imageUrl", "http%")
    .order("createdAt", { ascending: false })
    .limit(10);
  
  if (error) {
    console.error("❌ Error fetching images:", error);
  } else if (images && images.length > 0) {
    console.log(`Found ${images.length} http/https image records:`);
    images.forEach(img => console.log(`- [${img.createdAt}] ModelID ${img.modelId}: ${img.imageUrl}`));
  } else {
    console.log("No http/https URLs found in ModelImage table.");
    
    console.log("Listing ALL images for one specific model to see the format:");
    const { data: oneModel } = await supabase.from("Model").select("id, name").order("name").limit(1).single();
    if (oneModel) {
        console.log(`Checking images for model: ${oneModel.name} (${oneModel.id})`);
        const { data: modelImages } = await supabase.from("ModelImage").select("*").eq("modelId", oneModel.id);
        modelImages?.forEach(img => console.log(`  - ${img.imageUrl}`));
    }
  }
}

checkAnyHttpUrls();
