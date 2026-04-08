import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Starting mass image compression...');
  const images = await prisma.modelImage.findMany();
  console.log(`Found ${images.length} images to process.`);

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  let totalOriginalKb = 0;
  let totalOptimizedKb = 0;

  for (const img of images) {
    if (!img.imageUrl.includes('supabase.co')) {
      console.log(`Skipping external or invalid URL: ${img.imageUrl}`);
      skippedCount++;
      continue;
    }

    try {
      console.log(`Processing [${processedCount + 1}/${images.length}]: ${img.imageUrl}`);

      // Fetch the original image buffer
      const response = await fetch(img.imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const originalBuffer = Buffer.from(arrayBuffer);
      const originalKb = originalBuffer.length / 1024;
      totalOriginalKb += originalKb;

      if (originalKb < 100) {
        console.log(`  -> Image is already very small (${originalKb.toFixed(1)} KB). Skipping compression.`);
        skippedCount++;
        // Count as optimized but skip processing because it might already be compressed
        totalOptimizedKb += originalKb;
        processedCount++;
        continue;
      }

      // Shrink dimensions and heavily compress
      const optimizedBuffer = await sharp(originalBuffer)
        .resize({ width: 1200, withoutEnlargement: true }) // Never scale up
        .webp({ quality: 65, force: true, effort: 6 }) // Very aggressive compression
        .toBuffer();

      const optimizedKb = optimizedBuffer.length / 1024;

      if (optimizedKb >= originalKb) {
        console.log(`  -> Optimized size (${optimizedKb.toFixed(1)} KB) is larger than original. Keeping original.`);
        skippedCount++;
        totalOptimizedKb += originalKb;
        processedCount++;
        continue;
      }

      totalOptimizedKb += optimizedKb;

      // Extract raw bucket path from URL
      // Example URL: https://xyz.supabase.co/storage/v1/object/public/models/model-id/image.webp
      const bucketAndPathString = img.imageUrl.split('/object/public/')[1];
      if (!bucketAndPathString) {
        throw new Error('Could not parse Supabase bucket path');
      }

      const pathParts = bucketAndPathString.split('/');
      const bucketName = pathParts.shift()!;
      const filePath = decodeURIComponent(pathParts.join('/'));

      // Re-upload the optimized image buffer overwriting the existing file
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, optimizedBuffer, {
          contentType: 'image/webp',
          upsert: true,
          cacheControl: '31536000',
        });

      if (uploadError) {
        throw uploadError;
      }

      console.log(`  ✓ Compressed: ${originalKb.toFixed(1)}KB -> ${optimizedKb.toFixed(1)}KB (${((1 - optimizedKb / originalKb) * 100).toFixed(1)}% reduction)`);
      processedCount++;
    } catch (e: any) {
      console.error(`  ✗ Error processing ${img.imageUrl}:`, e.message);
      errorCount++;
    }
  }

  console.log('\n--- Compression Summary ---');
  console.log(`Total Images Processed: ${processedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Original Total Size: ${(totalOriginalKb / 1024).toFixed(2)} MB`);
  console.log(`Optimized Total Size: ${(totalOptimizedKb / 1024).toFixed(2)} MB`);
  console.log(`Total Space Saved: ${((totalOriginalKb - totalOptimizedKb) / 1024).toFixed(2)} MB`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
