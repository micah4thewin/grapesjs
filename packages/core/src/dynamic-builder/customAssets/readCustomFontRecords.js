import cacheCustomAssetRecords from './cacheCustomAssetRecords.js';
import getCustomAssetCache from './getCustomAssetCache.js';
import getCustomFontStorageKey from './getCustomFontStorageKey.js';
import normalizeCustomFontRecord from './normalizeCustomFontRecord.js';
import readStoredAssetRecords from './readStoredAssetRecords.js';

const readCustomFontRecords = () => {
  const cachedRecords = getCustomAssetCache().fonts;
  if (Array.isArray(cachedRecords)) return cachedRecords;
  return cacheCustomAssetRecords('fonts', readStoredAssetRecords(getCustomFontStorageKey(), normalizeCustomFontRecord));
};

export default readCustomFontRecords;
