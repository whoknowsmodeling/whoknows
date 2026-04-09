import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

async function main() {
  console.log("🚀 Starting Real Talent Restoration Sync...");

  const baseDir = path.join(process.cwd(), "public", "ALL MODELS");
  const genders = ["MEN", "WOMEN"];

  // 1. Clear existing generic/mock data to prevent pollution
  console.log("🧹 Cleaning existing models from database...");
  await supabase.from("ModelImage").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("Model").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  let totalModels = 0;
  let totalImages = 0;

  for (const genderFolder of genders) {
    const genderPath = path.join(baseDir, genderFolder);
    if (!fs.existsSync(genderPath)) {
      console.warn(`⚠️ Warning: Gender folder not found: ${genderPath}`);
      continue;
    }

    const dbGender = genderFolder.toLowerCase();
    const modelFolders = fs.readdirSync(genderPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const modelName of modelFolders) {
      console.log(`👤 Processing Model: ${modelName} (${dbGender})`);
      const slug = slugify(modelName);

      // Insert Model with explicit UUID and timestamps
      const now = new Date().toISOString();
      const { data: model, error: modelError } = await supabase
        .from("Model")
        .insert({
          id: uuidv4(),
          name: modelName,
          slug,
          gender: dbGender,
          featured: true, // Defaulting to featured to ensure they show up on the homepage as requested
          order: totalModels,
          createdAt: now,
          updatedAt: now,
        })
        .select()
        .single();

      if (modelError) {
        console.error(`❌ Error creating model ${modelName}:`, modelError.message);
        continue;
      }

      totalModels++;

      // Scan for images in the model's root folder
      const modelPath = path.join(genderPath, modelName);
      let images = fs.readdirSync(modelPath)
        .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file));

      // Also scan sub-folders (concepts like "Cittabella", "Grazia" etc)
      const subFolders = fs.readdirSync(modelPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      const allImagesFound: { path: string; concept: string; name: string }[] = [];

      // Root images
      images.forEach(img => {
        allImagesFound.push({
          path: `/ALL MODELS/${genderFolder}/${modelName}/${img}`,
          concept: "Portfolio",
          name: img
        });
      });

      // Subfolder images
      for (const conceptName of subFolders) {
        const conceptPath = path.join(modelPath, conceptName);
        const conceptImages = fs.readdirSync(conceptPath)
          .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file));

        conceptImages.forEach(img => {
          allImagesFound.push({
            path: `/ALL MODELS/${genderFolder}/${modelName}/${conceptName}/${img}`,
            concept: conceptName,
            name: img
          });
        });
      }

      // Insert all images with explicit UUIDs and timestamps
      for (let i = 0; i < allImagesFound.length; i++) {
        const imgData = allImagesFound[i];
        const nowImg = new Date().toISOString();
        const { error: imgError } = await supabase
          .from("ModelImage")
          .insert({
            id: uuidv4(),
            modelId: model.id,
            imageUrl: imgData.path,
            concept: imgData.concept,
            alt: `${modelName} - ${imgData.concept}`,
            isPrimary: i === 0,
            order: i,
            createdAt: nowImg,
          });

        if (imgError) {
          console.error(`  ❌ Error linking image ${imgData.name}:`, imgError.message);
        } else {
          totalImages++;
        }
      }
      console.log(`  ✅ Restored ${allImagesFound.length} images for ${modelName}`);
    }
  }

  console.log("\n✨ Restoration Complete!");
  console.log(`📊 Models Restored: ${totalModels}`);
  console.log(`🖼️ Images Linked: ${totalImages}`);
}

main().catch(err => {
  console.error("🔥 Fatal synchronization error:", err);
  process.exit(1);
});
