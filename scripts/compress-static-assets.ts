import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Compresses the bundled static talent photos in public/all-models in place.
 * These ship inside the deployed app (not Supabase Storage), so they need to
 * be resized/compressed locally before commit+deploy — matches the live
 * upload pipeline's target (max 2000px, WebP q80, EXIF stripped).
 */
const ROOT = path.join(process.cwd(), 'public', 'all-models');

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name)) return [full];
    return [];
  });
}

async function main() {
  const files = walk(ROOT);
  console.log(`Found ${files.length} static talent photos under public/all-models.`);

  let totalOriginalKb = 0;
  let totalOptimizedKb = 0;
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const originalBuffer = fs.readFileSync(file);
      const originalKb = originalBuffer.length / 1024;
      totalOriginalKb += originalKb;

      const optimizedBuffer = await sharp(originalBuffer)
        .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
        .withMetadata(false)
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      const optimizedKb = optimizedBuffer.length / 1024;

      if (optimizedKb >= originalKb) {
        console.log(`  -> ${path.relative(ROOT, file)}: already optimal (${originalKb.toFixed(0)}KB). Skipping.`);
        totalOptimizedKb += originalKb;
        skippedCount++;
        continue;
      }

      // Output is always .webp; rewrite in place (same extension, since
      // every source file here is already named .webp).
      fs.writeFileSync(file, optimizedBuffer);
      totalOptimizedKb += optimizedKb;
      processedCount++;
      console.log(`  ✓ ${path.relative(ROOT, file)}: ${originalKb.toFixed(0)}KB -> ${optimizedKb.toFixed(0)}KB (${((1 - optimizedKb / originalKb) * 100).toFixed(0)}% smaller)`);
    } catch (e: any) {
      console.error(`  ✗ Error processing ${file}:`, e.message);
      errorCount++;
    }
  }

  console.log('\n--- Compression Summary ---');
  console.log(`Processed: ${processedCount}`);
  console.log(`Skipped (already optimal): ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Original Total Size: ${(totalOriginalKb / 1024).toFixed(2)} MB`);
  console.log(`Optimized Total Size: ${(totalOptimizedKb / 1024).toFixed(2)} MB`);
  console.log(`Total Space Saved: ${((totalOriginalKb - totalOptimizedKb) / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
