import cacheCustomAssetRecords from './cacheCustomAssetRecords.js';
import getCustomAssetCache from './getCustomAssetCache.js';
import getCustomIconStorageKey from './getCustomIconStorageKey.js';
import normalizeCustomIconRecord from './normalizeCustomIconRecord.js';
import readStoredAssetRecords from './readStoredAssetRecords.js';

const readCustomIconRecords = () => {
  const cachedRecords = getCustomAssetCache().icons;
  if (Array.isArray(cachedRecords)) return cachedRecords;
  return cacheCustomAssetRecords('icons', readStoredAssetRecords(getCustomIconStorageKey(), normalizeCustomIconRecord));
};

export default readCustomIconRecords;
