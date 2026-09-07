import decodeUriTextSafely from './decodeUriTextSafely.js';

const deriveAltTextFromAssetName = (assetName, fallbackIndex) => {
  const fileName = String(assetName || '')
    .split('/')
    .pop()
    .split('?')[0]
    .replace(/\.[a-z0-9]{2,5}$/i, '');
  const readableWords = decodeUriTextSafely(fileName)
    .replace(/[-_+.]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
  const looksGenerated = /^(?:img|image|photo|dsc|dscn|pxl|screenshot|scan|untitled)?[\s\d]*$/i.test(readableWords);
  if (!readableWords || looksGenerated) return 'Picture ' + (fallbackIndex || 1);
  return readableWords.charAt(0).toUpperCase() + readableWords.slice(1);
};

export default deriveAltTextFromAssetName;
