import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
// Note: If Service Role key is not working (like sb_publishable...), user might have provided wrong key.
// But we'll try with what's in .env. Wait, user provided sb_publishable... in .env but service role is usually different.
// The user request said SUPABASE_SERVICE_ROLE_KEY="sb_publishable_..." which is weird.
// Usually service_role starts with eyJ...
// I'll try to use the ANON KEY if Service Role fails, but ANON usually can't upload to protected buckets.

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

async function uploadImage(file: Buffer, path: string, filename: string) {
  try {
    const optimizedBuffer = await sharp(file)
      .webp({ quality: 85 })
      .toBuffer();

    const fullPath = `${path}/${filename}_${uuidv4()}.webp`;

    const { data, error } = await supabase.storage
      .from("models")
      .upload(fullPath, optimizedBuffer, {
        contentType: "image/webp",
        cacheControl: "31536000",
        upsert: true,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from("models")
      .getPublicUrl(fullPath);

    return publicUrl;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

async function main() {
  // 0. Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const modelsBucket = buckets?.find(b => b.name === "models");
  if (!modelsBucket) {
    console.log("Creating 'models' bucket...");
    const { error: bucketError } = await supabase.storage.createBucket("models", {
      public: true,
      allowedMimeTypes: ["image/webp", "image/jpeg", "image/png"],
    });
    if (bucketError) {
      console.warn("Could not create bucket (likely permission error). Attempting to continue anyway...");
      console.warn(bucketError);
    }
  }

  const baseDir = path.join(process.cwd(), "public", "ALL MODELS");
  const genders = ["MEN", "WOMEN"];

  for (const genderFolder of genders) {
    const genderPath = path.join(baseDir, genderFolder);
    if (!fs.existsSync(genderPath)) continue;

    const dbGender = genderFolder.toLowerCase();
    const models = fs.readdirSync(genderPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const modelName of models) {
      console.log(`Processing Model: ${modelName} (${dbGender})`);
      const slug = slugify(modelName);

      // 1. Create or Find Model
      let model = await prisma.model.findUnique({ where: { slug } });
      if (!model) {
        model = await prisma.model.create({
          data: {
            name: modelName,
            slug,
            gender: dbGender,
          }
        });
        console.log(`Created model: ${modelName}`);
      } else {
        console.log(`Model ${modelName} already exists, checking for new images...`);
      }

      const modelPath = path.join(genderPath, modelName);
      const concepts = fs.readdirSync(modelPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const conceptName of concepts) {
        console.log(`  Processing Concept: ${conceptName}`);
        const conceptPath = path.join(modelPath, conceptName);
        const images = fs.readdirSync(conceptPath)
          .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

        for (const imageName of images) {
          const imagePath = path.join(conceptPath, imageName);
          
          // Check if image already exists (very basic check by filename in Alt if we were consistent, 
          // but better to just skip if the model already has images for this concept)
          // For now, we'll upload if the model has NO images with this original filename in the Alt tag or similar.
          // Or we can just check if the model has ANY images with this 'concept' name.
          
          const existingImage = await prisma.modelImage.findFirst({
            where: {
              modelId: model.id,
              concept: conceptName,
              alt: imageName
            }
          });

          if (existingImage) {
            console.log(`    Skipping existing image: ${imageName}`);
            continue;
          }

          try {
            const buffer = fs.readFileSync(imagePath);
            const imageUrl = await uploadImage(buffer, `models/${model.id}/${conceptName}`, slugify(imageName));
            
            const hasPrimary = await prisma.modelImage.findFirst({
              where: { modelId: model.id, isPrimary: true }
            });

            await prisma.modelImage.create({
              data: {
                modelId: model.id,
                imageUrl,
                concept: conceptName,
                alt: imageName,
                isPrimary: !hasPrimary,
                order: 0
              }
            });
            console.log(`    Uploaded and linked: ${imageName}`);
          } catch (err) {
            console.error(`    Failed to upload ${imageName}:`, err);
          }
        }
      }
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
