import dehydratePayloadAssets from './dehydratePayloadAssets.js';
import { queueAssetWrites } from './storage/getAssetPoolStore.js';

// Reducing a payload to tokens is pure, so this stays synchronous and the save
// path keeps working inside a pagehide handler. Only the picture bytes settle
// asynchronously, into IndexedDB, where there is room for them.
const storePayloadAssets = (payloadValue) => {
  const { payload, poolAdditions } = dehydratePayloadAssets(payloadValue);
  queueAssetWrites(poolAdditions);
  return payload;
};

export default storePayloadAssets;
