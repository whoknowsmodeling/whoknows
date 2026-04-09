import { createClient } from "@supabase/supabase-js";

/**
 * Public Supabase Client (Browser Safe).
 * Uses the Anon Key which is safe for client-side operations.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Public Supabase credentials missing. Client-side fetching will fail.");
}

export const supabasePublic = createClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseAnonKey || "placeholder"
);
