import dotenv from 'dotenv';
dotenv.config();

import { supabaseAdmin } from '../src/lib/supabase';
import fs from 'fs';
import path from 'path';

/**
 * 🛠️ Master Asset Restructuring & Hardening Script
 * - Cleans all filenames (lowercases, removes spaces/symbols)
 * - Flattens structure to all-models/[gender]/[slug]/[filename]
 * - Syncs database to new paths
 */

const BASE_DIR = path.join(process.cwd(), 'public', 'all-models');

function sanitize(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')           // Spaces to hyphens
    .replace(/[^a-z0-9\-\.]/g, '')  // Remove non-alphanumeric except hyphens and dots
    .replace(/-+/g, '-')            // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '');        // Trim hyphens
}

async function run() {
  console.log('🚀 Starting Global Image Hardening...');

  // 1. Get Models for mapping
  const { data: models, error: fetchError } = await supabaseAdmin.from('Model').select('id, name, slug, gender');
  if (fetchError) {
    console.error('❌ Error fetching models:', fetchError);
    return;
  }
  if (!models) return console.error('❌ Could not fetch models.');

  const modelMap = new Map();
  models.forEach(m => {
    modelMap.set(m.slug.toLowerCase(), m);
    // Also map by name just in case
    modelMap.set(sanitize(m.name), m);
  });

  // 2. Walk the directory tree
  const genders = ['MEN', 'WOMEN', 'men', 'women'];
  
  for (const gender of genders) {
    const genderPath = path.join(BASE_DIR, gender);
    if (!fs.existsSync(genderPath)) continue;

    const modelFolders = fs.readdirSync(genderPath);
    
    for (const folder of modelFolders) {
      if (folder === '.DS_Store') continue;
      
      const folderPath = path.join(genderPath, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      // Find matching model
      const slug = sanitize(folder);
      const model = modelMap.get(slug);

      if (!model) {
        console.warn(`⚠️ No DB match for folder: ${folder} (slug: ${slug})`);
        continue;
      }

      console.log(`📦 Processing Model: ${model.name} (${model.id})`);

      // Target Dir
      const targetGender = model.gender.toLowerCase();
      const targetSlug = model.slug.toLowerCase();
      const targetDir = path.join(BASE_DIR, targetGender, targetSlug);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Collect all images recursively in this model folder
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

      // Move and Clean each file
      for (const oldFilePath of allFiles) {
        const fileName = path.basename(oldFilePath);
        const cleanedName = sanitize(fileName);
        const newFilePath = path.join(targetDir, cleanedName);

        if (oldFilePath !== newFilePath) {
          // If the file is already in a subdirectory we're about to delete, it might move
          if (!fs.existsSync(newFilePath)) {
             fs.renameSync(oldFilePath, newFilePath);
          } else {
             // If collision (e.g. "image.webp" vs "IMAGE.webp"), just delete the old one or append
             if (oldFilePath.toLowerCase() !== newFilePath.toLowerCase()) {
                fs.unlinkSync(oldFilePath);
             }
          }
        }
      }
    }
  }

  // 3. DATABASE SYNC - Re-scan the final directory and update DB
  console.log('🔄 Synchronizing Database...');
  
  // Clear old Image records (optional but safer to repopulate if we want perfection)
  // For now, let's just update based on what's physically there.
  
  for (const model of models) {
     const slug = model.slug.toLowerCase();
     const gender = model.gender.toLowerCase();
     const modelDir = path.join(BASE_DIR, gender, slug);

     if (!fs.existsSync(modelDir)) continue;

     const files = fs.readdirSync(modelDir).filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));
     
     // 1. Delete all current ModelImage records for this model to avoid duplicates/orphans
     await supabaseAdmin.from('ModelImage').delete().eq('modelId', model.id);

     // 2. Insert new cleaned records
     const records = files.map((f, index) => ({
        id: `img-${model.slug}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        modelId: model.id,
        imageUrl: `/all-models/${gender}/${slug}/${f}`,
        isPrimary: index === 0, // Mark first as primary for now
        order: index
     }));

     if (records.length > 0) {
        const { error } = await supabaseAdmin.from('ModelImage').insert(records);
        if (error) console.error(`❌ Error syncing ${model.name}:`, error);
        else console.log(`✅ Synced ${records.length} images for ${model.name}`);

        // Update Model coverImage
        await supabaseAdmin.from('Model').update({ coverImage: records[0].imageUrl }).eq('id', model.id);
     }
  }

  console.log('🏁 Hardening Complete! Run npm run build and push.');
}

run().catch(console.error);
