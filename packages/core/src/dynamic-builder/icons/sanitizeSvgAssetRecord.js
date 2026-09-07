import decodeSvgDataUri from './decodeSvgDataUri.js';
import encodeSvgDataUri from './encodeSvgDataUri.js';
import isSvgMarkupSafe from './isSvgMarkupSafe.js';
import rejectUnsafeSvgAsset from './rejectUnsafeSvgAsset.js';
import sanitizeSvgMarkup from '../support/sanitizeSvgMarkup.js';

const sanitizeSvgAssetRecord = (editor, assetRecord) => {
  if (!assetRecord || typeof assetRecord.get !== 'function') return;
  if (typeof DOMParser === 'undefined') return;
  const sourceValue = String(assetRecord.get('src') || '');
  if (!/^data:image\/svg\+xml/i.test(sourceValue)) return;
  if (assetRecord.get('dbSvgSanitized') === sourceValue) return;
  const decodedMarkup = decodeSvgDataUri(sourceValue);
  if (!decodedMarkup || !isSvgMarkupSafe(decodedMarkup)) {
    rejectUnsafeSvgAsset(editor, assetRecord);
    return;
  }
  const encodedSource = encodeSvgDataUri(sanitizeSvgMarkup(decodedMarkup));
  assetRecord.set({ src: encodedSource, dbSvgSanitized: encodedSource });
};

export default sanitizeSvgAssetRecord;
