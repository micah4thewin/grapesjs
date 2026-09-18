import buildAssetPoolKey from './buildAssetPoolKey.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';

const writeAssetPool = (editor, moduleOptions, assetPool, onQuotaExceeded) =>
  writeStoredJsonRecord(buildAssetPoolKey(editor, moduleOptions), assetPool, onQuotaExceeded);

export default writeAssetPool;
