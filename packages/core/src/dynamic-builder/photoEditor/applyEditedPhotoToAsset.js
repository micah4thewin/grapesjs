import estimateDataUrlBytes from './estimateDataUrlBytes.js';
import replaceImageSourceInSite from './replaceImageSourceInSite.js';

const applyEditedPhotoToAsset = (editor, assetModel, dataUrl) => {
  if (!assetModel || typeof assetModel.set !== 'function' || !dataUrl) return 0;
  const previousSource = String(assetModel.get('src') || '');
  if (previousSource === dataUrl) return 0;
  assetModel.set({ src: dataUrl, dbStoredBytes: estimateDataUrlBytes(dataUrl), dbEditedAt: Date.now() });
  return replaceImageSourceInSite(editor, previousSource, dataUrl);
};

export default applyEditedPhotoToAsset;
