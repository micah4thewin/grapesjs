import buildAssetPoolKey from '../buildAssetPoolKey.js';
import getLocalStorageArea from '../getLocalStorageArea.js';
import getRecordStorageArea from './getRecordStorageArea.js';
import { flushAssetWrites, queueAssetWrites } from './getAssetPoolStore.js';

const readLegacyPoolText = (poolKey) => {
  // The record area answers from the mirror first and adopts from localStorage
  // if it has to, so a pool left by either older build is found.
  const mirroredText = getRecordStorageArea().getItem(poolKey);
  if (typeof mirroredText === 'string' && mirroredText) return mirroredText;
  const legacyArea = getLocalStorageArea();
  if (!legacyArea) return '';
  try {
    return legacyArea.getItem(poolKey) || '';
  } catch (readError) {
    return '';
  }
};

// Projects saved before the move kept every picture in one localStorage record.
// Moving them into IndexedDB hands back that quota and keeps the tokens in the
// stored snapshot pointing at something.
const migrateLegacyAssetPool = async (editor, moduleOptions) => {
  const poolKey = buildAssetPoolKey(editor, moduleOptions);
  const storedText = readLegacyPoolText(poolKey);
  if (!storedText) return false;
  let storedPool = null;
  try {
    storedPool = JSON.parse(storedText);
  } catch (parseError) {
    storedPool = null;
  }
  if (storedPool && typeof storedPool === 'object' && !Array.isArray(storedPool)) {
    queueAssetWrites(storedPool);
    await flushAssetWrites();
  }
  const legacyArea = getLocalStorageArea();
  try {
    legacyArea && legacyArea.removeItem(poolKey);
  } catch (removeError) {
    /* the pictures are in IndexedDB either way */
  }
  getRecordStorageArea().removeItem(poolKey);
  return true;
};

export default migrateLegacyAssetPool;
