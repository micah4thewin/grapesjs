import runStoreTransaction from './runStoreTransaction.js';
import { assetStoreName } from './getStorageStoreNames.js';

const writeAssetEntries = (assetRecord) => {
  const assetTokens = Object.keys(assetRecord);
  if (!assetTokens.length) return Promise.resolve(true);
  return runStoreTransaction(assetStoreName, 'readwrite', (assetStore) => {
    assetTokens.forEach((assetToken) => assetStore.put(assetRecord[assetToken], assetToken));
    return true;
  });
};

export default writeAssetEntries;
