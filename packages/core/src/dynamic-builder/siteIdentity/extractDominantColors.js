import formatHexColor from './formatHexColor.js';

const extractDominantColors = (imageElement, colorCount) => {
  const canvasElement = document.createElement('canvas');
  const sampleSize = 48;
  canvasElement.width = sampleSize;
  canvasElement.height = sampleSize;
  const context = canvasElement.getContext('2d', { willReadFrequently: true });
  if (!context) return [];
  context.drawImage(imageElement, 0, 0, sampleSize, sampleSize);
  const pixelData = context.getImageData(0, 0, sampleSize, sampleSize).data;
  const bucketRecords = {};
  for (let index = 0; index < pixelData.length; index += 4) {
    const alpha = pixelData[index + 3];
    if (alpha < 128) continue;
    const red = pixelData[index];
    const green = pixelData[index + 1];
    const blue = pixelData[index + 2];
    const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
    const brightness = (red + green + blue) / 3;
    if (spread < 18 || brightness > 238 || brightness < 18) continue;
    const bucketKey = [red >> 4, green >> 4, blue >> 4].join(',');
    const bucket = bucketRecords[bucketKey] || { count: 0, red: 0, green: 0, blue: 0 };
    bucket.count += 1;
    bucket.red += red;
    bucket.green += green;
    bucket.blue += blue;
    bucketRecords[bucketKey] = bucket;
  }
  return Object.keys(bucketRecords)
    .map((bucketKey) => bucketRecords[bucketKey])
    .sort((first, second) => second.count - first.count)
    .slice(0, colorCount || 5)
    .map((bucket) =>
      formatHexColor({
        red: bucket.red / bucket.count,
        green: bucket.green / bucket.count,
        blue: bucket.blue / bucket.count,
      }),
    );
};

export default extractDominantColors;
