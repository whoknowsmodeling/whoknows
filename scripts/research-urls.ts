import { supabaseAdmin } from './src/lib/supabase';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  const { data: models } = await supabaseAdmin.from('ModelImage').select('imageUrl').limit(5);
  const { data: campaigns } = await supabaseAdmin.from('Campaign').select('coverImage').limit(5);
  const { data: campaignImages } = await supabaseAdmin.from('CampaignImage').select('imageUrl').limit(5);

  console.log('--- Model Images ---');
  models?.forEach(i => console.log(i.imageUrl));
  
  console.log('\n--- Campaign Covers ---');
  campaigns?.forEach(i => console.log(i.coverImage));

  console.log('\n--- Campaign Gallery ---');
  campaignImages?.forEach(i => console.log(i.imageUrl));
}

check();
