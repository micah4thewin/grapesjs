import runStorageRequest from './runStorageRequest.js';
import runStoreTransaction from './runStoreTransaction.js';
import { assetStoreName } from './getStorageStoreNames.js';

// Only the pictures a payload actually names are read, so restoring one
// revision never loads the whole history's worth of bytes.
const readAssetEntries = async (assetTokens) => {
  const wantedTokens = Array.from(new Set(assetTokens)).filter(Boolean);
  if (!wantedTokens.length) return {};
  const readResult = await runStoreTransaction(assetStoreName, 'readonly', (assetStore) =>
    Promise.all(wantedTokens.map((assetToken) => runStorageRequest(assetStore.get(assetToken)))),
  );
  if (!readResult) return null;
  const storedValues = await readResult;
  const assetRecord = {};
  wantedTokens.forEach((assetToken, tokenIndex) => {
    if (typeof storedValues[tokenIndex] === 'string') assetRecord[assetToken] = storedValues[tokenIndex];
  });
  return assetRecord;
};

export default readAssetEntries;
