import buildPooledAssetToken from './buildPooledAssetToken.js';
import mapDeepStrings from '../support/mapDeepStrings.js';
import { getDataUrlPattern, minPoolableLength } from './getPooledAssetPatterns.js';

// Data URIs turn up both as their own value (an asset record `src`) and buried
// inside longer text (a `background-image` rule), so every string is scanned.
const dehydratePayloadAssets = (payloadValue) => {
  const poolAdditions = {};
  const swapDataUrlsForTokens = (sourceText) => {
    if (sourceText.indexOf('data:') < 0) return sourceText;
    return sourceText.replace(getDataUrlPattern(), (matchedText) => {
      if (matchedText.length < minPoolableLength) return matchedText;
      const tokenText = buildPooledAssetToken(matchedText);
      poolAdditions[tokenText] = matchedText;
      return tokenText;
    });
  };
  return { payload: mapDeepStrings(payloadValue, swapDataUrlsForTokens), poolAdditions };
};

export default dehydratePayloadAssets;
