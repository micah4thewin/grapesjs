import collectPayloadAssetTokens from './collectPayloadAssetTokens.js';
import rehydratePayloadAssets from './rehydratePayloadAssets.js';
import { readPooledAssets } from './storage/getAssetPoolStore.js';

const restorePayloadAssets = async (payloadValue) => {
  const assetTokens = collectPayloadAssetTokens(payloadValue);
  if (!assetTokens.length) return payloadValue;
  return rehydratePayloadAssets(payloadValue, await readPooledAssets(assetTokens));
};

export default restorePayloadAssets;
