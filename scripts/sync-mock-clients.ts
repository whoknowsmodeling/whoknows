import { supabaseAdmin } from '../src/lib/supabase';
import { mockClients } from '../src/lib/data';
import { v4 as uuidv4 } from 'uuid';

/**
 * 🚜 Mock Client Synchronizer
 * Moves static brand logos into the permanent Supabase database
 * to restore the 'Trusted by Leading Brands' section on the landing page.
 */
async function sync() {
  console.log('🚀 Starting Mock Brand Client Synchronization...');

  // 1. Fetch current clients to avoid duplicates
  const { data: dbClients } = await supabaseAdmin.from('Client').select('name');
  const existingNames = new Set((dbClients || []).map(c => c.name));

  console.log(`📊 Found ${dbClients?.length || 0} clients in DB.`);

  for (const mock of mockClients) {
    if (existingNames.has(mock.name)) {
      console.log(`⏭️ Skipping "${mock.name}" (Already exists)`);
      continue;
    }

    console.log(`📦 Syncing "${mock.name}" logo...`);

    const { error } = await supabaseAdmin
      .from('Client')
      .insert({
        id: uuidv4(),
        name: mock.name,
        logoUrl: mock.logoUrl,
        order: mock.order,
        active: true,
      });

    if (error) {
      console.error(`❌ Failed to insert brand ${mock.name}:`, error);
      continue;
    }

    console.log(`✅ Successfully synced "${mock.name}"`);
  }

  console.log('🏁 Synchronization Complete!');
}

sync().catch(console.error);
