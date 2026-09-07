import buildStockPhotoAttribution from './buildStockPhotoAttribution.js';

const buildStockPhotoAltText = (photoRecord, creditShownElsewhere) => {
  if (!photoRecord) return '';
  const descriptionText = String(photoRecord.description || '').trim();
  const attributionText = buildStockPhotoAttribution(photoRecord);
  if (!descriptionText) return attributionText;
  const readableText = descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1);
  if (creditShownElsewhere || photoRecord.requiresAttribution === false) return readableText;
  return readableText + ' - ' + attributionText;
};

export default buildStockPhotoAltText;
