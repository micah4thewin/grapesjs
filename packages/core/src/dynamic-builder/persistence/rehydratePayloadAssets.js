import buildImagePlaceholderDataUri from '../mediaComponents/buildImagePlaceholderDataUri.js';
import isPlainRecord from '../support/isPlainRecord.js';
import mapDeepStrings from '../support/mapDeepStrings.js';
import { getPooledTokenPattern } from './getPooledAssetPatterns.js';

// A token with nothing behind it means the pool lost the picture, so the page
// shows the usual missing-image placeholder instead of a broken source.
const rehydratePayloadAssets = (payloadValue, assetPool) => {
  const poolRecord = isPlainRecord(assetPool) ? assetPool : {};
  const swapTokensForDataUrls = (sourceText) => {
    if (sourceText.indexOf('db-pooled-asset:') < 0) return sourceText;
    return sourceText.replace(getPooledTokenPattern(), (tokenText) =>
      typeof poolRecord[tokenText] === 'string' ? poolRecord[tokenText] : buildImagePlaceholderDataUri(),
    );
  };
  return mapDeepStrings(payloadValue, swapTokensForDataUrls);
};

export default rehydratePayloadAssets;
