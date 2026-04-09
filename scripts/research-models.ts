import { supabaseAdmin } from './src/lib/supabase';
import dotenv from 'dotenv';
dotenv.config();

/**
 * 🛠️ Master Image Hardening Script
 * 1. Renames all folders to lowercase/slugified versions.
 * 2. Cleans filenames (URL-safe).
 * 3. Syncs the database to these new paths.
 */
async function hard() {
    const { data: models } = await supabaseAdmin.from('Model').select('id, name, slug, gender');
    console.log('--- Models in Database ---');
    console.log(JSON.stringify(models, null, 2));
}

hard().catch(console.error);
