import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkFullStats() {
  console.log("🚀 Deep Database Dive...");
  
  const { data: images, error } = await supabase
    .from("ModelImage")
    .select("imageUrl, id, modelId, createdAt")
    .order("createdAt", { ascending: false })
    .limit(20);
  
  if (error) {
    console.error("❌ Error fetching images:", error);
    return;
  }

  console.log(`Analyzing last ${images.length} image records:`);
  let httpCount = 0;
  let localCount = 0;
  
  images.forEach(img => {
    if (img.imageUrl.startsWith("http")) {
        httpCount++;
        console.log(`- [HTTP] ${img.imageUrl} (id: ${img.id})`);
    } else if (img.imageUrl.startsWith("/all-models")) {
        localCount++;
        // console.log(`- [LOCAL] ${img.imageUrl}`);
    } else {
        console.log(`- [OTHER] ${img.imageUrl}`);
    }
  });
  
  console.log(`Summary: HTTP: ${httpCount}, Local: ${localCount}, Other: ${images.length - httpCount - localCount}`);
}

checkFullStats();
