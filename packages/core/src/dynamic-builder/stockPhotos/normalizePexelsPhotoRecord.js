import buildStockPhotoRecord from './buildStockPhotoRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildPexelsDownloadUrl = (imageSources) => {
  const originalUrl = String(imageSources.original || '');
  if (originalUrl && originalUrl.indexOf('?') < 0) return originalUrl + '?auto=compress&cs=tinysrgb&w=1600';
  return originalUrl || imageSources.large2x || imageSources.large;
};

const normalizePexelsPhotoRecord = (photoPayload) => {
  const photoValues = isPlainRecord(photoPayload) ? photoPayload : {};
  const imageSources = isPlainRecord(photoValues.src) ? photoValues.src : {};
  return buildStockPhotoRecord({
    photoId: photoValues.id,
    providerId: 'pexels',
    providerName: 'Pexels',
    thumbnailUrl: imageSources.medium || imageSources.small || imageSources.tiny,
    downloadUrl: buildPexelsDownloadUrl(imageSources),
    width: photoValues.width,
    height: photoValues.height,
    description: photoValues.alt,
    photographerName: photoValues.photographer,
    photographerUrl: photoValues.photographer_url,
    sourceUrl: photoValues.url,
    licenceName: 'Pexels licence',
    licenceUrl: 'https://www.pexels.com/license/',
    requiresAttribution: true,
  });
};

export default normalizePexelsPhotoRecord;
