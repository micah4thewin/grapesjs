import buildStockPhotoFileName from './buildStockPhotoFileName.js';
import buildStockPhotoImageFile from './buildStockPhotoImageFile.js';

const downloadStockPhotoFile = (photoRecord) => {
  if (!photoRecord || !photoRecord.downloadUrl || typeof globalThis.fetch !== 'function') return Promise.resolve(null);
  return globalThis
    .fetch(photoRecord.downloadUrl, { mode: 'cors', credentials: 'omit' })
    .then((responseValue) => (responseValue && responseValue.ok ? responseValue.blob() : null))
    .then((imageBlob) =>
      imageBlob && imageBlob.size ? buildStockPhotoImageFile(imageBlob, buildStockPhotoFileName(photoRecord)) : null,
    )
    .catch(() => null);
};

export default downloadStockPhotoFile;
