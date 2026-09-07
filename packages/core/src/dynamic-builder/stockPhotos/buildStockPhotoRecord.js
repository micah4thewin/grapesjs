import readHttpUrlValue from './readHttpUrlValue.js';

const readTrimmedText = (textValue, limitCount) =>
  String(textValue == null ? '' : textValue)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, limitCount || 180);

const buildStockPhotoRecord = (recordValues) => {
  const sourceValues = recordValues || {};
  const downloadUrl = readHttpUrlValue(sourceValues.downloadUrl);
  if (!downloadUrl) return null;
  return {
    photoId: readTrimmedText(sourceValues.photoId, 80) || downloadUrl,
    providerId: readTrimmedText(sourceValues.providerId, 40),
    providerName: readTrimmedText(sourceValues.providerName, 40),
    thumbnailUrl: readHttpUrlValue(sourceValues.thumbnailUrl) || downloadUrl,
    downloadUrl,
    width: Number(sourceValues.width) > 0 ? Math.round(Number(sourceValues.width)) : 0,
    height: Number(sourceValues.height) > 0 ? Math.round(Number(sourceValues.height)) : 0,
    description: readTrimmedText(sourceValues.description),
    photographerName: readTrimmedText(sourceValues.photographerName, 80) || 'Unknown photographer',
    photographerUrl: readHttpUrlValue(sourceValues.photographerUrl),
    sourceUrl: readHttpUrlValue(sourceValues.sourceUrl),
    licenceName: readTrimmedText(sourceValues.licenceName, 60) || 'Free to use',
    licenceUrl: readHttpUrlValue(sourceValues.licenceUrl),
    requiresAttribution: sourceValues.requiresAttribution !== false,
  };
};

export default buildStockPhotoRecord;
