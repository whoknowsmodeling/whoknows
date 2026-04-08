const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) throw error;
    console.log('Buckets:', data.map(b => b.name));
  } catch (e) {
    console.error('Supabase connection failed:', e.message);
  }
}

main();
