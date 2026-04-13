import { processImageToWebP } from "./src/lib/media-processor.ts";
import fs from "fs";

async function testSharp() {
    console.log("🚀 Testing Sharp conversion...");
    try {
        const input = Buffer.from("fake-image-content"); // obviously real sharp would fail on this
        // but let's see if it even tries to load sharp
        const result = await processImageToWebP(input);
        console.log("Result received. Length:", result.length);
    } catch (e) {
        console.error("Sharp crashed:", e);
    }
}

testSharp();
