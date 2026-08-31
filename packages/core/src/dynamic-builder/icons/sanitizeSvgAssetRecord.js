import sanitizeSvgMarkup from '../support/sanitizeSvgMarkup.js';
import decodeSvgDataUri from './decodeSvgDataUri.js';

const sanitizeSvgAssetRecord = (editor, assetRecord) => {
  if (!assetRecord || typeof assetRecord.get !== 'function') return;
  if (typeof DOMParser === 'undefined') return;
  const sourceValue = String(assetRecord.get('src') || '');
  const isSvgDataUri = /^data:image\/svg\+xml/i.test(sourceValue);
  if (isSvgDataUri) {
    const sanitizedMarkup = sanitizeSvgMarkup(decodeSvgDataUri(sourceValue));
    if (!sanitizedMarkup) {
      editor.Assets.remove(assetRecord);
      return;
    }
    assetRecord.set('src', 'data:image/svg+xml,' + encodeURIComponent(sanitizedMarkup));
    return;
  }
  const sourcePathPart = sourceValue.split(/[?#]/)[0];
  if (!/\.svg$/i.test(sourcePathPart)) return;
  ['svgContent', 'svgMarkup', 'markup'].forEach((markupKey) => {
    const inlineMarkup = assetRecord.get(markupKey);
    if (!inlineMarkup) return;
    assetRecord.set(markupKey, sanitizeSvgMarkup(inlineMarkup));
  });
};

export default sanitizeSvgAssetRecord;
