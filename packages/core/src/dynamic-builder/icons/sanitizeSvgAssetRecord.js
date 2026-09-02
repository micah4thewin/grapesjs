import decodeSvgDataUri from './decodeSvgDataUri.js';
import encodeSvgDataUri from './encodeSvgDataUri.js';
import sanitizeSvgMarkup from '../support/sanitizeSvgMarkup.js';
import showToastNotice from '../support/showToastNotice.js';

const sanitizeSvgAssetRecord = (editor, assetRecord) => {
  if (!assetRecord || typeof assetRecord.get !== 'function') return;
  if (typeof DOMParser === 'undefined') return;
  const sourceValue = String(assetRecord.get('src') || '');
  if (!/^data:image\/svg\+xml/i.test(sourceValue)) return;
  if (assetRecord.get('dbSvgSanitized') === sourceValue) return;
  const decodedMarkup = decodeSvgDataUri(sourceValue);
  const sanitizedMarkup = decodedMarkup ? sanitizeSvgMarkup(decodedMarkup) : '';
  if (!sanitizedMarkup) {
    const assetName = String(assetRecord.get('name') || 'SVG file');
    editor.Assets.remove(assetRecord);
    editor.trigger('db:asset:rejected', { name: assetName, reason: 'invalid-svg' });
    showToastNotice(editor, assetName + ' was rejected: the SVG could not be parsed safely.', {
      kind: 'error',
      duration: 5000,
    });
    return;
  }
  const encodedSource = encodeSvgDataUri(sanitizedMarkup);
  assetRecord.set({ src: encodedSource, dbSvgSanitized: encodedSource });
};

export default sanitizeSvgAssetRecord;
