import { hydrateAssetPool } from './getAssetPoolStore.js';
import { hydrateRecordStorage } from './getRecordStorageArea.js';
import migrateLegacyAssetPool from './migrateLegacyAssetPool.js';

// Resolves once the synchronous mirror holds the stored records and the pool
// knows which pictures it already has. Everything that reads saved work waits
// on this; the save path does not, so an unload can still write.
const preparePersistenceStorage = async (editor, moduleOptions) => {
  await hydrateRecordStorage();
  await hydrateAssetPool();
  await migrateLegacyAssetPool(editor, moduleOptions);
  return true;
};

export default preparePersistenceStorage;
