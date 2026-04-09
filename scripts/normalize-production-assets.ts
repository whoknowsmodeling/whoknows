import { supabaseAdmin } from '../src/lib/supabase';
import dotenv from 'dotenv';
dotenv.config();

/**
 * 🛡️ Image Path Normalization Hardening Script
 * Ensures all production asset URLs comply with the 'all-models' industrial architecture.
 * This fixes the 'undisplayed' images on the live whoknows.beauty website.
 */
async function normalize() {
  console.log('🚀 Starting Industrial Image Path Normalization...');

  // 1. Model Images
  const { data: modelImages } = await supabaseAdmin
    .from('ModelImage')
    .select('id, imageUrl');
  
  if (modelImages) {
    console.log(`📸 Processing ${modelImages.length} Model Images...`);
    for (const img of modelImages) {
      if (img.imageUrl.includes('ALL%20MODELS') || img.imageUrl.includes('ALL MODELS')) {
        const newUrl = img.imageUrl
          .replace(/ALL%20MODELS/g, 'all-models')
          .replace(/ALL MODELS/g, 'all-models');
        
        await supabaseAdmin
          .from('ModelImage')
          .update({ imageUrl: newUrl })
          .eq('id', img.id);
        
        console.log(`✅ Updated Model Image: ${img.id}`);
      }
    }
  }

  // 2. Campaign Covers
  const { data: campaigns } = await supabaseAdmin
    .from('Campaign')
    .select('id, coverImage');
  
  if (campaigns) {
    console.log(`📦 Processing ${campaigns.length} Campaign Covers...`);
    for (const c of campaigns) {
      if (c.coverImage && (c.coverImage.includes('ALL%20MODELS') || c.coverImage.includes('ALL MODELS'))) {
        const newUrl = c.coverImage
          .replace(/ALL%20MODELS/g, 'all-models')
          .replace(/ALL MODELS/g, 'all-models');
        
        await supabaseAdmin
          .from('Campaign')
          .update({ coverImage: newUrl })
          .eq('id', c.id);
          
        console.log(`✅ Updated Campaign Cover: ${c.id}`);
      }
    }
  }

  // 3. Campaign Gallery
  const { data: campaignImages } = await supabaseAdmin
    .from('CampaignImage')
    .select('id, imageUrl');
  
  if (campaignImages) {
    console.log(`Gallery: Processing ${campaignImages.length} items...`);
    for (const img of campaignImages) {
      if (img.imageUrl && (img.imageUrl.includes('ALL%20MODELS') || img.imageUrl.includes('ALL MODELS'))) {
        const newUrl = img.imageUrl
          .replace(/ALL%20MODELS/g, 'all-models')
          .replace(/ALL MODELS/g, 'all-models');
        
        await supabaseAdmin
          .from('CampaignImage')
          .update({ imageUrl: newUrl })
          .eq('id', img.id);
          
        console.log(`✅ Updated Campaign Image: ${img.id}`);
      }
    }
  }

  console.log('🏁 Asset Normalization Complete! Images should now restore online.');
}

normalize().catch(console.error);
