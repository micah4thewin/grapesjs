import buildStockPhotoRecord from './buildStockPhotoRecord.js';
import describeOpenverseLicence from './describeOpenverseLicence.js';
import isPlainRecord from '../support/isPlainRecord.js';

const publicDomainCodes = ['cc0', 'pdm'];

const normalizeOpenversePhotoRecord = (photoPayload) => {
  const photoValues = isPlainRecord(photoPayload) ? photoPayload : {};
  const licenceCode = String(photoValues.license || '')
    .trim()
    .toLowerCase();
  return buildStockPhotoRecord({
    photoId: photoValues.id,
    providerId: 'openverse',
    providerName: 'Openverse',
    thumbnailUrl: photoValues.thumbnail || photoValues.url,
    downloadUrl: photoValues.url,
    width: photoValues.width,
    height: photoValues.height,
    description: photoValues.title,
    photographerName: photoValues.creator,
    photographerUrl: photoValues.creator_url,
    sourceUrl: photoValues.foreign_landing_url,
    licenceName: describeOpenverseLicence(licenceCode, photoValues.license_version),
    licenceUrl: photoValues.license_url,
    requiresAttribution: publicDomainCodes.indexOf(licenceCode) < 0,
  });
};

export default normalizeOpenversePhotoRecord;
