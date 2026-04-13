import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkModels() {
  console.log("🚀 Checking Models...");
  const { data: models, error } = await supabase.from("Model").select("id, name, gender, slug").limit(5);
  
  if (error) {
    console.error("❌ Error fetching models:", error);
  } else {
    console.log(`Found ${models.length} models:`);
    models.forEach(m => console.log(`- ${m.name} (${m.gender}): ${m.slug}`));
  }
}

checkModels();
