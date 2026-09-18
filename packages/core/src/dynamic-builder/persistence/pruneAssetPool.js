import getRecordStorageArea, { listRecordStorageKeys } from './storage/getRecordStorageArea.js';
import listPooledTokensInText from './listPooledTokensInText.js';
import { deletePooledAssets, listKnownAssetTokens } from './storage/getAssetPoolStore.js';

// Deleting a revision can leave a picture nothing points at. Every record is
// scanned, not just this project's, because a token is a content digest and two
// projects holding the same picture share the one copy.
const pruneAssetPool = async () => {
  const knownTokens = listKnownAssetTokens();
  if (!knownTokens.length) return false;
  const storageArea = getRecordStorageArea();
  const referencingText = listRecordStorageKeys()
    .map((recordKey) => storageArea.getItem(recordKey) || '')
    .join('');
  const liveTokens = listPooledTokensInText(referencingText);
  const orphanTokens = knownTokens.filter((assetToken) => !liveTokens.has(assetToken));
  if (!orphanTokens.length) return false;
  await deletePooledAssets(orphanTokens);
  return true;
};

export default pruneAssetPool;
