const sharp = require('sharp');
async function analyze() {
  const { data, info } = await sharp('public/whoknowsBlack.webp')
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  let opaqueCount = 0;
  let transparentCount = 0;
  let whiteCount = 0;
  let blackCount = 0;

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    let a = 255;
    if (info.channels === 4) a = data[i+3];

    if (a < 10) {
      transparentCount++;
    } else {
      opaqueCount++;
      if (r > 240 && g > 240 && b > 240) whiteCount++;
      if (r < 15 && g < 15 && b < 15) blackCount++;
    }
  }

  const total = info.width * info.height;
  console.log(`Transparency: ${(transparentCount/total*100).toFixed(1)}%`);
  if (opaqueCount > 0) {
    console.log(`Of opaque pixels, White: ${(whiteCount/opaqueCount*100).toFixed(1)}%`);
    console.log(`Of opaque pixels, Black: ${(blackCount/opaqueCount*100).toFixed(1)}%`);
  }
}
analyze();
