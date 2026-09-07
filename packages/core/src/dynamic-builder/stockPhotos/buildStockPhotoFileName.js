import toSlugText from '../support/toSlugText.js';

const readFileExtension = (photoRecord) => {
  const extensionMatch = String(photoRecord.downloadUrl || '')
    .split('?')[0]
    .match(/\.(jpe?g|png|webp|avif|gif)$/i);
  return extensionMatch ? extensionMatch[1].toLowerCase() : 'jpg';
};

const buildStockPhotoFileName = (photoRecord) => {
  if (!photoRecord) return 'stock-photo.jpg';
  const nameParts = [photoRecord.description || photoRecord.photographerName || 'stock photo', photoRecord.providerId];
  const slugText = toSlugText(nameParts.join(' ')).slice(0, 60) || 'stock-photo';
  return slugText + '.' + readFileExtension(photoRecord);
};

export default buildStockPhotoFileName;
