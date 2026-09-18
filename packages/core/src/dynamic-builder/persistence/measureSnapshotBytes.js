import readPooledTokenBytes from './readPooledTokenBytes.js';
import { getPooledTokenPattern } from './getPooledAssetPatterns.js';

// Reports how much the project would weigh with its pictures inlined, given the
// stored payload that holds tokens instead. Serializing the whole project a
// second time on every autosave tick would cost far more than adding the
// difference back from the lengths the tokens already carry.
const measureSnapshotBytes = (storedPayload) => {
  let serializedText = '';
  try {
    serializedText = JSON.stringify(storedPayload || {});
  } catch (serializeError) {
    return 0;
  }
  const pooledTokens = serializedText.match(getPooledTokenPattern()) || [];
  return pooledTokens.reduce(
    (totalBytes, assetToken) => totalBytes + readPooledTokenBytes(assetToken) - assetToken.length,
    serializedText.length,
  );
};

export default measureSnapshotBytes;
