import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are loaded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase credentials missing. Edge runtime might fail if these are required for the current request.");
}

// This client uses the Service Role key for administrative operations
// and works perfectly on the Cloudflare Edge runtime (Web APIs only).
export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseServiceKey || "placeholder", 
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
