import buildAssetPoolKey from './buildAssetPoolKey.js';
import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import getLocalStorageArea from './getLocalStorageArea.js';
import listPooledTokensInText from './listPooledTokensInText.js';
import readAssetPool from './readAssetPool.js';
import readRawStoredText from './readRawStoredText.js';
import resolveStorageKey from './resolveStorageKey.js';

// Deleting a revision, or replacing a picture, can leave a pooled data URI that
// nothing points at any more. Tokens only ever survive as exact substrings, so
// the stored text answers which ones are still live without being parsed - and
// this runs on every autosave, where parsing a pool of pictures would show.
const pruneAssetPool = (editor, moduleOptions) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return false;
  const poolKey = buildAssetPoolKey(editor, moduleOptions);
  const poolText = readRawStoredText(poolKey);
  if (!poolText) return false;
  const pooledTokens = listPooledTokensInText(poolText);
  if (!pooledTokens.size) return false;
  const referencingText =
    readRawStoredText(resolveStorageKey(editor, moduleOptions)) +
    readRawStoredText(buildRevisionsStorageKey(editor, moduleOptions));
  const liveTokens = listPooledTokensInText(referencingText);
  let hasOrphan = false;
  pooledTokens.forEach((tokenText) => {
    if (!liveTokens.has(tokenText)) hasOrphan = true;
  });
  if (!hasOrphan) return false;
  const storedPool = readAssetPool(editor, moduleOptions);
  const nextPool = {};
  Object.keys(storedPool).forEach((tokenText) => {
    if (liveTokens.has(tokenText)) nextPool[tokenText] = storedPool[tokenText];
  });
  try {
    storageArea.setItem(poolKey, JSON.stringify(nextPool));
    return true;
  } catch (writeError) {
    return false;
  }
};

export default pruneAssetPool;
