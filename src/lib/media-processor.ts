/**
 * 🏎️ Industrial Media Processor (Node.js Only)
 * Optimized for WhoKnows high-fidelity performance.
 * 
 * NOTE: These utilities require a Node.js runtime and will not work 
 * in Cloudflare Edge environments due to binary dependencies (ffmpeg/sharp).
 * We use dynamic eval-require to prevent build-time static analysis failures.
 */

export async function processImageToWebP(inputBuffer: Buffer): Promise<Buffer> {
  try {
    // Prevent static bundling errors in Cloudflare Edge
    const sharp = eval('require')('sharp');
    return await sharp(inputBuffer)
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
  } catch (error) {
    console.warn('Sharp conversion skipped (requires Node.js):', error);
    return inputBuffer;
  }
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
