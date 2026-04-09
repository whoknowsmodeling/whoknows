import { supabaseAdmin } from '../src/lib/supabase';
import dotenv from 'dotenv';
dotenv.config();

async function setup() {
  console.log('🚀 Setting up Supabase Storage Buckets...');
  
  const bucketsToCreate = ['applications', 'campaigns', 'clients'];
  
  const { data: existingBuckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) return console.error('❌ Error listing buckets:', listError);

  for (const bucketName of bucketsToCreate) {
    const exists = existingBuckets.find(b => b.name === bucketName);
    if (!exists) {
      const { data: bucket, error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
      });
      if (createError) console.error(`❌ Error creating bucket ${bucketName}:`, createError);
      else console.log(`✅ Created "${bucketName}" bucket.`);
    } else {
      console.log(`✅ "${bucketName}" bucket already exists.`);
    }
  }
}

setup().catch(console.error);
