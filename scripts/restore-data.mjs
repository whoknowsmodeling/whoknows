#!/usr/bin/env node
/**
 * WhoKnows Models — Database Restore Script
 * Restores all 18 models and their images from /public/all-models/
 *
 * Run: node scripts/restore-data.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SUPABASE_URL = 'https://vonnnlywftnpmkgrcsfb.supabase.co';
const SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvbm5ubHl3ZnRucG1rZ3Jjc2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTM5MTU1NSwiZXhwIjoyMDkwOTY3NTU1fQ.CfyRT_KLRE5QSs4ywebiRdb-MXJoIgUMoeOfCurQI5k';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ─── MODEL DEFINITIONS ──────────────────────────────────────────────────────

const MODELS = [
  // WOMEN
  { name: 'Athina',   slug: 'athina',    gender: 'women', order: 1,  featured: true,  isPrimeWomen: true  },
  { name: 'Candice',  slug: 'candice',   gender: 'women', order: 2,  featured: true  },
  { name: 'Celine',   slug: 'celine',    gender: 'women', order: 3,  featured: true  },
  { name: 'Chantal',  slug: 'chantal',   gender: 'women', order: 4,  featured: true  },
  { name: 'Elana',    slug: 'elana',     gender: 'women', order: 5,  featured: true  },
  { name: 'Hui Wang', slug: 'hui-wang',  gender: 'women', order: 6,  featured: true  },
  { name: 'Jasmin',   slug: 'jasmin',    gender: 'women', order: 7,  featured: true  },
  { name: 'Laura',    slug: 'laura',     gender: 'women', order: 8,  featured: true  },
  { name: 'Madeline', slug: 'madeline',  gender: 'women', order: 9,  featured: true  },
  { name: 'Megan',    slug: 'megan',     gender: 'women', order: 10, featured: true  },
  { name: 'MIKA',     slug: 'mika',      gender: 'women', order: 11, featured: true  },
  { name: 'Parina',   slug: 'parina',    gender: 'women', order: 12, featured: true  },
  { name: 'Sofia',    slug: 'sofia',     gender: 'women', order: 13, featured: true  },
  { name: 'Triseya',  slug: 'triseya',   gender: 'women', order: 14, featured: true  },
  // MEN
  { name: 'JULIEN',   slug: 'julien',    gender: 'men',   order: 1,  featured: true,  isPrimeMen: true  },
  { name: 'LEO',      slug: 'leo',       gender: 'men',   order: 2,  featured: true  },
  { name: 'MARCUS',   slug: 'marcus',    gender: 'men',   order: 3,  featured: true  },
  { name: 'XAVIER',   slug: 'xavier',    gender: 'men',   order: 4,  featured: true  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

function getModelImages(gender, slug) {
  const dir = join(ROOT, 'public', 'all-models', gender, slug);
  if (!existsSync(dir)) {
    console.warn(`  ⚠️  Folder not found: ${dir}`);
    return [];
  }
  return readdirSync(dir)
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
    .sort();
}

// ─── MAIN ───────────────────────────────────────────────────────────────────

async function restoreData() {
  console.log('\n🔄 WhoKnows Models — Database Restore');
  console.log('═'.repeat(50));

  // Step 1: Check connection
  const { count, error: pingError } = await supabase
    .from('Model')
    .select('*', { count: 'exact', head: true });

  if (pingError) {
    console.error('❌ Cannot connect to Supabase:', pingError.message);
    process.exit(1);
  }
  console.log(`✅ Connected. Current Model count: ${count}`);

  if (count > 0) {
    console.log('\n⚠️  Database already has data! Skipping to avoid duplicates.');
    console.log('   Delete all rows first if you want to re-run this script.');
    process.exit(0);
  }

  let totalModels = 0;
  let totalImages = 0;

  // Step 2: Insert each model + images
  for (const m of MODELS) {
    process.stdout.write(`\n📋 ${m.name} (${m.gender})`);

    // Insert Model record
    const modelId = randomUUID();
    const now = new Date().toISOString();
    const { error: modelError } = await supabase.from('Model').insert({
      id: modelId,
      name: m.name,
      slug: m.slug,
      gender: m.gender,
      featured: m.featured ?? false,
      order: m.order,
      createdAt: now,
      updatedAt: now,
    });

    if (modelError) {
      console.error(`\n  ❌ Model insert failed: ${modelError.message}`);
      continue;
    }

    // Get image files from public folder
    const files = getModelImages(m.gender, m.slug);
    process.stdout.write(` — ${files.length} images`);

    // Insert ModelImage records
    const imageInserts = files.map((filename, i) => ({
      id: randomUUID(),
      modelId,
      imageUrl: `/all-models/${m.gender}/${m.slug}/${filename}`,
      alt: `${m.name} — portfolio`,
      order: i + 1,
      isPrimary:    i === 0,
      isFace:       i === 0, // First image = face for homepage carousel
      isPrimeAll:   false,
      isPrimeWomen: (m.isPrimeWomen === true) && i === 0,
      isPrimeMen:   (m.isPrimeMen  === true) && i === 0,
    }));

    if (imageInserts.length > 0) {
      const { error: imgError } = await supabase.from('ModelImage').insert(imageInserts);
      if (imgError) {
        console.error(`\n  ❌ Images insert failed: ${imgError.message}`);
      } else {
        totalImages += imageInserts.length;
      }
    }

    totalModels++;
    process.stdout.write(' ✅');
  }

  // Step 3: Summary
  console.log('\n\n' + '═'.repeat(50));
  console.log(`✅ Restore complete!`);
  console.log(`   Models inserted : ${totalModels}`);
  console.log(`   Images inserted : ${totalImages}`);
  console.log('\n🌐 Open localhost:3000 to verify');
}

restoreData().catch((err) => {
  console.error('\n💥 Fatal error:', err);
  process.exit(1);
});
