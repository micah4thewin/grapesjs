import buildStockPhotoAttribution from './buildStockPhotoAttribution.js';
import buildStockPhotoFileName from './buildStockPhotoFileName.js';
import estimateDataUrlBytes from '../photoEditor/estimateDataUrlBytes.js';

const buildStockPhotoAssetRecord = (photoRecord, compressedAsset, originalBytes) => {
  if (!photoRecord) return null;
  const assetRecord = {
    type: 'image',
    src: compressedAsset ? compressedAsset.src : photoRecord.downloadUrl,
    name: buildStockPhotoFileName(photoRecord),
    dbProvider: photoRecord.providerName,
    dbPhotographer: photoRecord.photographerName,
    dbPhotographerUrl: photoRecord.photographerUrl,
    dbSourceUrl: photoRecord.sourceUrl,
    dbLicence: photoRecord.licenceName,
    dbLicenceUrl: photoRecord.licenceUrl,
    dbAttribution: buildStockPhotoAttribution(photoRecord),
    dbRequiresAttribution: photoRecord.requiresAttribution !== false,
  };
  if (!compressedAsset) return { ...assetRecord, width: photoRecord.width || 0, height: photoRecord.height || 0 };
  return {
    ...assetRecord,
    width: compressedAsset.width,
    height: compressedAsset.height,
    dbOriginalBytes: Number(originalBytes) > 0 ? Math.round(Number(originalBytes)) : 0,
    dbStoredBytes: estimateDataUrlBytes(compressedAsset.src),
  };
};

export default buildStockPhotoAssetRecord;
