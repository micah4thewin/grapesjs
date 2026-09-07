import getCustomAssetCache from './getCustomAssetCache.js';

const cacheCustomAssetRecords = (cacheKey, assetRecords) => {
  const assetCache = getCustomAssetCache();
  assetCache[cacheKey] = Array.isArray(assetRecords) ? assetRecords : null;
  return assetCache[cacheKey] || [];
};

export default cacheCustomAssetRecords;
