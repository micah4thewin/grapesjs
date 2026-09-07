import buildStockPhotoRecord from './buildStockPhotoRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const normalizeUnsplashPhotoRecord = (photoPayload) => {
  const photoValues = isPlainRecord(photoPayload) ? photoPayload : {};
  const imageUrls = isPlainRecord(photoValues.urls) ? photoValues.urls : {};
  const photographerValues = isPlainRecord(photoValues.user) ? photoValues.user : {};
  const photographerLinks = isPlainRecord(photographerValues.links) ? photographerValues.links : {};
  const photoLinks = isPlainRecord(photoValues.links) ? photoValues.links : {};
  return buildStockPhotoRecord({
    photoId: photoValues.id,
    providerId: 'unsplash',
    providerName: 'Unsplash',
    thumbnailUrl: imageUrls.small || imageUrls.thumb,
    downloadUrl: imageUrls.regular || imageUrls.full || imageUrls.raw,
    width: photoValues.width,
    height: photoValues.height,
    description: photoValues.alt_description || photoValues.description,
    photographerName: photographerValues.name || photographerValues.username,
    photographerUrl: photographerLinks.html,
    sourceUrl: photoLinks.html,
    licenceName: 'Unsplash licence',
    licenceUrl: 'https://unsplash.com/license',
    requiresAttribution: true,
  });
};

export default normalizeUnsplashPhotoRecord;
