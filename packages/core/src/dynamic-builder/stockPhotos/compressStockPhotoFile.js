import compressImageFileToAsset from '../mediaComponents/compressImageFileToAsset.js';

const compressStockPhotoFile = (photoFile, maxDimension) => {
  if (!photoFile) return Promise.resolve(null);
  try {
    return compressImageFileToAsset(photoFile, maxDimension).catch(() => null);
  } catch (compressError) {
    return Promise.resolve(null);
  }
};

export default compressStockPhotoFile;
