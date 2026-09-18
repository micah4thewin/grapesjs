import readAssetPool from './readAssetPool.js';
import rehydratePayloadAssets from './rehydratePayloadAssets.js';

const restorePayloadAssets = (editor, moduleOptions, payloadValue) =>
  rehydratePayloadAssets(payloadValue, readAssetPool(editor, moduleOptions));

export default restorePayloadAssets;
