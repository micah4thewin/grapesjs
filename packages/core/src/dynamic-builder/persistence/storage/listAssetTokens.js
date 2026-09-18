import runStorageRequest from './runStorageRequest.js';
import runStoreTransaction from './runStoreTransaction.js';
import { assetStoreName } from './getStorageStoreNames.js';

// Keys only: the sweep decides what to drop without reading a single picture.
const listAssetTokens = async () => {
  const readResult = await runStoreTransaction(assetStoreName, 'readonly', (assetStore) =>
    runStorageRequest(assetStore.getAllKeys()),
  );
  if (!readResult) return null;
  return (await readResult).map((assetKey) => String(assetKey));
};

export default listAssetTokens;
