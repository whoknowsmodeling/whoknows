import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findNeigeyou() {
  console.log("🚀 Searching for 'Neigeyou' in Model table...");
  const { data: models, error } = await supabase
    .from("Model")
    .select("id, name, slug, gender")
    .ilike("name", "%Neigeyou%");
  
  if (error) {
    console.error("❌ Error fetching model:", error);
  } else if (models && models.length > 0) {
    console.log(`Found ${models.length} matching models:`);
    for (const m of models) {
        console.log(`- ID: ${m.id}, Name: ${m.name}, Slug: ${m.slug}`);
        const { data: images } = await supabase.from("ModelImage").select("*").eq("modelId", m.id);
        console.log(`  Uploaded Images: ${images?.length || 0}`);
        images?.forEach(img => console.log(`    - [${img.isPrimary ? 'P' : ' '}] ${img.imageUrl}`));
    }
  } else {
    console.log("No model named 'Neigeyou' found in database.");
  }
}

findNeigeyou();
