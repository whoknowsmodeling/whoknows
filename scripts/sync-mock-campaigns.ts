import { supabaseAdmin } from '../src/lib/supabase';
import { mockCampaigns } from '../src/lib/data';
import { v4 as uuidv4 } from 'uuid';

/**
 * 🚜 Mock Campaign Synchronizer
 * Moves static mock jobs into the permanent Supabase database
 * to enable administrative management and visibility controls.
 */
async function sync() {
  console.log('🚀 Starting Mock Campaign Synchronization...');

  // 1. Fetch current models and campaigns to avoid duplicates/errors
  const { data: dbModels } = await supabaseAdmin.from('Model').select('id, name');
  const { data: dbCampaigns } = await supabaseAdmin.from('Campaign').select('slug');
  
  const existingSlugs = new Set((dbCampaigns || []).map(c => c.slug));
  const nameToId = new Map((dbModels || []).map(m => [m.name, m.id]));

  console.log(`📊 Found ${dbModels?.length || 0} models and ${dbCampaigns?.length || 0} existing campaigns in DB.`);

  for (const mock of mockCampaigns) {
    if (existingSlugs.has(mock.slug)) {
      console.log(`⏭️ Skipping "${mock.title}" (Already exists)`);
      continue;
    }

    console.log(`📦 Syncing "${mock.title}"...`);

    const campaignId = uuidv4();

    // A. Insert Campaign
    const { error: campaignError } = await supabaseAdmin
      .from('Campaign')
      .insert({
        id: campaignId,
        title: mock.title,
        slug: mock.slug,
        description: mock.description,
        client: mock.client,
        year: mock.year,
        coverImage: mock.coverImage,
        active: true,
        featured: true, // Auto-feature the initial batch as requested
        order: mock.order,
        updatedAt: new Date().toISOString()
      });

    if (campaignError) {
      console.error(`❌ Failed to insert campaign ${mock.title}:`, campaignError);
      continue;
    }

    // B. Link Models (Junction Table)
    if (mock.models && mock.models.length > 0) {
      const junctionData = [];
      for (const m of mock.models) {
        const modelId = nameToId.get(m.model.name);
        if (modelId) {
          junctionData.push({
            campaignId: campaignId,
            modelId: modelId
          });
        }
      }

      if (junctionData.length > 0) {
        const { error: junctionError } = await supabaseAdmin
          .from('CampaignModel')
          .insert(junctionData);
        if (junctionError) console.error(`⚠️ Junction error for ${mock.title}:`, junctionError);
      }
    }

    // C. Insert Gallery Images
    if (mock.images && mock.images.length > 0) {
      const imageData = mock.images.map((img, idx) => ({
        id: uuidv4(),
        campaignId: campaignId,
        imageUrl: img.imageUrl,
        alt: img.alt,
        order: idx
      }));

      const { error: imageError } = await supabaseAdmin
        .from('CampaignImage')
        .insert(imageData);
      if (imageError) console.error(`⚠️ Image sync error for ${mock.title}:`, imageError);
    }

    console.log(`✅ Successfully synced "${mock.title}"`);
  }

  console.log('🏁 Synchronization Complete!');
}

sync().catch(console.error);
