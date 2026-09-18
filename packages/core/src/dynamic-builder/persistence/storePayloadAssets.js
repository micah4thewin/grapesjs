import buildAssetPoolKey from './buildAssetPoolKey.js';
import dehydratePayloadAssets from './dehydratePayloadAssets.js';
import listPooledTokensInText from './listPooledTokensInText.js';
import readAssetPool from './readAssetPool.js';
import readRawStoredText from './readRawStoredText.js';
import writeAssetPool from './writeAssetPool.js';

// The snapshot and every revision used to carry their own copy of each embedded
// picture, so a handful of saves filled the whole storage budget on their own.
// They now share one pool of data URIs and keep only a short token each.
const storePayloadAssets = (editor, moduleOptions, payloadValue, onQuotaExceeded) => {
  const { payload: leanPayload, poolAdditions } = dehydratePayloadAssets(payloadValue);
  const addedTokens = Object.keys(poolAdditions);
  if (!addedTokens.length) return leanPayload;
  // The usual autosave changes text around pictures the pool already holds, so
  // the tokens present in the stored text settle it without a parse.
  const poolText = readRawStoredText(buildAssetPoolKey(editor, moduleOptions));
  const knownTokens = listPooledTokensInText(poolText);
  if (addedTokens.every((tokenText) => knownTokens.has(tokenText))) return leanPayload;
  const nextPool = { ...readAssetPool(editor, moduleOptions) };
  addedTokens.forEach((tokenText) => {
    if (typeof nextPool[tokenText] !== 'string') nextPool[tokenText] = poolAdditions[tokenText];
  });
  // A payload whose pictures never reached the pool would restore as blanks, so
  // it keeps its inline copies whenever the pool cannot take them.
  const writeErrorMessage = writeAssetPool(editor, moduleOptions, nextPool, onQuotaExceeded);
  return writeErrorMessage ? payloadValue : leanPayload;
};

export default storePayloadAssets;
