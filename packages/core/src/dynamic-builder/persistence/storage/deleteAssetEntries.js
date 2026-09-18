import runStoreTransaction from './runStoreTransaction.js';
import { assetStoreName } from './getStorageStoreNames.js';

const deleteAssetEntries = (assetTokens) => {
  if (!assetTokens.length) return Promise.resolve(true);
  return runStoreTransaction(assetStoreName, 'readwrite', (assetStore) => {
    assetTokens.forEach((assetToken) => assetStore.delete(assetToken));
    return true;
  });
};

export default deleteAssetEntries;
