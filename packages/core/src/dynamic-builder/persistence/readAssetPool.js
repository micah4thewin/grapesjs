import buildAssetPoolKey from './buildAssetPoolKey.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';

const readAssetPool = (editor, moduleOptions) => {
  const storedPool = readStoredJsonRecord(buildAssetPoolKey(editor, moduleOptions));
  return isPlainRecord(storedPool) ? storedPool : {};
};

export default readAssetPool;
