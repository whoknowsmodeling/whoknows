import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testPermissions() {
  console.log("🚀 Testing Service Role permissions on 'Model' table...");
  const { data, error } = await supabase.from("Model").select("*").limit(1);
  
  if (error) {
    console.error("❌ Permission Error:", error);
    if (error.code === '42501') {
        console.log("SUGGESTION: The service_role might need its permissions restored to the 'public' schema.");
    }
  } else {
    console.log("✅ Success! Service role can read public schema.");
  }
}

testPermissions();
