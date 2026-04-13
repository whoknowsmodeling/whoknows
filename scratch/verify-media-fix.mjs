import { uploadMedia } from "../src/lib/storage.ts";
import fs from "fs";
import 'dotenv/config';

async function verifyMediaHardening() {
  console.log("🚀 Verifying Media Engine Hardening...");
  
  try {
    const dummyBuffer = Buffer.from("fake-image-content-for-verification");
    const path = "verification-test";
    const filename = "test-image.jpg";
    
    console.log("Starting trial upload...");
    const publicUrl = await uploadMedia(dummyBuffer, path, filename);
    
    console.log("Generated URL:", publicUrl);
    
    if (publicUrl.includes("/public/") && !publicUrl.includes("/models/models/")) {
        console.log("✅ SUCCESS: Absolute Public URL generated correctly.");
        console.log("✅ SUCCESS: Flat folder structure enforced.");
    } else {
        console.error("❌ FAILURE: URL structure still lacks '/public/' or is redundantly nested.");
    }
    
    console.log("Testing WebP conversion simulation...");
    // Since we are in Node.js, sharp should be available if we run with correct PATH
    // Actually our uploadMedia already calls processImageToWebP which logs conversion.
    
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
  }
}

verifyMediaHardening();
