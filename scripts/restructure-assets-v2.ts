import { supabaseAdmin } from '../src/lib/supabase';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

/**
 * 🛠️ Master Asset RESTORATION Script (v2.0)
 * - Reads from public/temp-models/
 * - Writes to public/all-models/ (Strict lowercase & Sanitized)
 * - Synchronizes DB with these new production-grade paths.
 */

const SOURCE_DIR = path.join(process.cwd(), 'public', 'temp-models');
const TARGET_BASE = path.join(process.cwd(), 'public', 'all-models');

function sanitize(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-\.]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  console.log('🚀 Starting Case-Sensitive Industrial Restoration...');

  if (!fs.existsSync(SOURCE_DIR)) {
    return console.error('❌ Source directory public/temp-models does not exist!');
  }

  // Ensure target base exists
  if (!fs.existsSync(TARGET_BASE)) {
    fs.mkdirSync(TARGET_BASE, { recursive: true });
  }

  // 1. Get Models from DB
  const { data: models, error: fetchError } = await supabaseAdmin.from('Model').select('id, name, slug, gender');
  if (fetchError || !models) {
    return console.error('❌ Error fetching models:', fetchError);
  }

  const modelMap = new Map();
  models.forEach(m => {
    modelMap.set(m.slug.toLowerCase(), m);
    modelMap.set(sanitize(m.name), m);
  });

  // 2. Iterate through temp-models
  const genderFolders = fs.readdirSync(SOURCE_DIR);
  
  for (const genderFolder of genderFolders) {
    if (genderFolder === '.DS_Store') continue;
    const genderPath = path.join(SOURCE_DIR, genderFolder);
    if (!fs.statSync(genderPath).isDirectory()) continue;

    const modelFolders = fs.readdirSync(genderPath);
    for (const folder of modelFolders) {
      if (folder === '.DS_Store') continue;
      const folderPath = path.join(genderPath, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const slug = sanitize(folder);
      const model = modelMap.get(slug);

      if (!model) {
        console.warn(`⚠️ No DB match for temp folder: ${folder} (slug: ${slug})`);
        continue;
      }

      console.log(`📦 Restoring Model: ${model.name}`);

      const targetGender = model.gender.toLowerCase();
      const targetSlug = model.slug.toLowerCase();
      const targetDir = path.join(TARGET_BASE, targetGender, targetSlug);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Collect all images recursively
      const allFiles: string[] = [];
      const walk = (dir: string) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
          } else if (file.match(/\.(webp|jpg|jpeg|png)$/i)) {
            allFiles.push(filePath);
          }
        });
      };
      walk(folderPath);

      // Copy and Clean to new structure
      for (const oldFilePath of allFiles) {
        const fileName = path.basename(oldFilePath);
        const cleanedName = sanitize(fileName);
        const newFilePath = path.join(targetDir, cleanedName);

        // Copy instead of rename to preserve temp-models in case of crash
        fs.copyFileSync(oldFilePath, newFilePath);
      }
    }
  }

  // 3. DATABASE SYNC
  console.log('🔄 Synchronizing Hardened Database...');
  
  for (const model of models) {
     const slug = model.slug.toLowerCase();
     const gender = model.gender.toLowerCase();
     const modelDir = path.join(TARGET_BASE, gender, slug);

     if (!fs.existsSync(modelDir)) continue;

     const files = fs.readdirSync(modelDir).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
     
     await supabaseAdmin.from('ModelImage').delete().eq('modelId', model.id);

     const records = files.map((f, index) => ({
        id: `img-${model.slug}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        modelId: model.id,
        imageUrl: `/all-models/${gender}/${slug}/${f}`,
        isPrimary: index === 0 || f.includes('cover'),
        order: index
     }));

     if (records.length > 0) {
        const { error } = await supabaseAdmin.from('ModelImage').insert(records);
        if (error) console.error(`❌ Error syncing ${model.name}:`, error);
        else console.log(`✅ Fully restored ${records.length} images for ${model.name}`);

        const primaryImg = records.find(r => r.isPrimary) || records[0];
        await supabaseAdmin.from('Model').update({ coverImage: primaryImg.imageUrl }).eq('id', model.id);
     }
  }

  console.log('🏁 Case-Sensitive Restoration Complete! Verify and Push.');
}

run().catch(console.error);
