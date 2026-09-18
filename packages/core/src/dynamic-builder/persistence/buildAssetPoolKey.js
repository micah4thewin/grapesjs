import resolveStorageKey from './resolveStorageKey.js';

const buildAssetPoolKey = (editor, moduleOptions) => resolveStorageKey(editor, moduleOptions) + ':asset-pool';

export default buildAssetPoolKey;
