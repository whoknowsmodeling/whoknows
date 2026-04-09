import { supabaseAdmin } from '../src/lib/supabase';
import dotenv from 'dotenv';
dotenv.config();

async function setup() {
  console.log('🚀 Setting up Supabase Storage for Applications...');
  
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) return console.error('❌ Error listing buckets:', listError);

  const exists = buckets.find(b => b.name === 'applications');
  if (!exists) {
    const { data: bucket, error: createError } = await supabaseAdmin.storage.createBucket('applications', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    });
    if (createError) console.error('❌ Error creating bucket:', createError);
    else console.log('✅ Created "applications" bucket.');
  } else {
    console.log('✅ "applications" bucket already exists.');
  }
}

setup().catch(console.error);
