import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  try {
    const { count, error } = await supabase
      .from('ClusterPages')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Total ClusterPages:", count);
    }

    const { data: published, error: pubError } = await supabase
      .from('ClusterPages')
      .select('slug, clusterSlug')
      .eq('status', 'PUBLISHED');
    
    if (pubError) {
      console.error("Pub Error:", pubError);
    } else {
      console.log("Published Count:", published?.length || 0);
      published?.forEach(p => console.log(` - /services/${p.clusterSlug}/${p.slug}`));
    }
  } catch (err) {
    console.error("Fatal Error:", err);
  }
}

check();
