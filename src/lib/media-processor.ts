/**
 * 🏎️ Industrial Media Processor
 * Optimized for WhoKnows high-fidelity performance.
 *
 * NOTE on runtime: this app deploys to Cloudflare Workers (via
 * @opennextjs/cloudflare). Workers cannot execute native binaries — `sharp`
 * (libvips) never runs there regardless of the Next.js route `runtime`
 * export, since every route ultimately executes inside the same Workers
 * isolate. The primary path below uses the Cloudflare Images binding
 * (`env.IMAGES`, declared in wrangler.jsonc), which does real resize/WebP
 * conversion natively on Cloudflare's infra. `sharp` is kept only as a
 * fallback for non-Workers execution contexts (e.g. local one-off scripts).
 */

const TARGET_MAX_DIMENSION = 2000;
const TARGET_WEBP_QUALITY = 80;

async function processImageWithCloudflareImages(inputBuffer: Buffer): Promise<Buffer | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext({ async: true });
    if (!env.IMAGES) return null;

    const startTime = Date.now();
    const stream = new Blob([new Uint8Array(inputBuffer)]).stream() as ReadableStream<Uint8Array>;

    const result = await env.IMAGES.input(stream)
      .transform({ width: TARGET_MAX_DIMENSION, height: TARGET_MAX_DIMENSION, fit: 'scale-down' })
      .output({ format: 'image/webp', quality: TARGET_WEBP_QUALITY });

    const outputBuffer = Buffer.from(await new Response(result.image()).arrayBuffer());

    console.log(`✨ Cloudflare Images WebP Conversion: ${inputBuffer.length}b -> ${outputBuffer.length}b in ${Date.now() - startTime}ms`);
    return outputBuffer;
  } catch (error: any) {
    console.warn(`⚠️ Cloudflare Images binding unavailable/failed (${error.message || error}).`);
    return null;
  }
}

async function processImageWithSharp(inputBuffer: Buffer): Promise<Buffer | null> {
  try {
    // Prevent static bundling errors in Cloudflare Edge
    const sharp = eval('require')('sharp');
    const startTime = Date.now();

    const outputBuffer = await sharp(inputBuffer)
      .resize({
        width: TARGET_MAX_DIMENSION,
        height: TARGET_MAX_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true
      })
      .withMetadata(false) // Strip EXIF data
      .webp({ quality: TARGET_WEBP_QUALITY, effort: 6 })
      .toBuffer();

    console.log(`✨ Sharp WebP Conversion: ${inputBuffer.length}b -> ${outputBuffer.length}b in ${Date.now() - startTime}ms`);
    return outputBuffer;
  } catch (error: any) {
    console.warn(`⚠️ Sharp conversion skipped (${error.message || 'Node.js dependency issue'}).`);
    return null;
  }
}

export async function processImageToWebP(inputBuffer: Buffer): Promise<Buffer> {
  const viaCloudflare = await processImageWithCloudflareImages(inputBuffer);
  if (viaCloudflare) return viaCloudflare;

  const viaSharp = await processImageWithSharp(inputBuffer);
  if (viaSharp) return viaSharp;

  console.warn('⚠️ No image processor available. Using original buffer.');
  return inputBuffer;
}

export async function processVideoToWebm(inputBuffer: Buffer): Promise<Buffer> {
  try {
    const { exec } = eval('require')('child_process');
    const { promisify } = eval('require')('util');
    const fs = eval('require')('fs');
    const path = eval('require')('path');
    const { v4: uuidv4 } = eval('require')('uuid');
    const ffmpegPath = eval('require')('ffmpeg-static');

    const execAsync = promisify(exec);

    if (!ffmpegPath) {
      console.warn('ffmpeg-static not found. Video transcoding skipped.');
      return inputBuffer;
    }

    const tempId = uuidv4();
    const inputPath = path.join('/tmp', `${tempId}_input`);
    const outputPath = path.join('/tmp', `${tempId}.webm`);

    await fs.promises.writeFile(inputPath, inputBuffer);

    const command = `${ffmpegPath} -i ${inputPath} -c:v libvpx-vp9 -crf 30 -b:v 0 -deadline good -c:a libopus ${outputPath}`;
    await execAsync(command);

    const resultBuffer = await fs.promises.readFile(outputPath);

    try {
      if (fs.existsSync(inputPath)) await fs.promises.unlink(inputPath);
      if (fs.existsSync(outputPath)) await fs.promises.unlink(outputPath);
    } catch (e) {}

    return resultBuffer;
  } catch (error) {
    console.warn('Video transcoding skipped (requires Node.js):', error);
    return inputBuffer;
  }
}

export function isVideoFile(filename: string): boolean {
  return /\.(mp4|mov|avi|mkv|webm)$/i.test(filename);
}

export function isImageFile(filename: string): boolean {
  return /\.(jpg|jpeg|png|webp|avif)$/i.test(filename);
}
