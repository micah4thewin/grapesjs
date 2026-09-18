import openStorageDatabase, { resetStorageDatabaseForTests } from './openStorageDatabase.js';
import runStoreTransaction from './runStoreTransaction.js';
import { assetStoreName, recordStoreName } from './getStorageStoreNames.js';
import { flushAssetWrites, resetAssetPoolForTests } from './getAssetPoolStore.js';
import { flushRecordStorage, resetRecordStorageForTests } from './getRecordStorageArea.js';

// The mirror, the pool and the open database are module state shared by every
// editor on the page. Writes settle behind the save path and the pool sweep
// runs unwaited, so in-flight work is drained first. The stores are emptied
// rather than the database dropped: a delete is refused while any connection
// is still open, which would quietly leave the last test's records in place.
const resetPersistenceStorageForTests = async () => {
  await flushRecordStorage().catch(() => false);
  await flushAssetWrites().catch(() => false);
  await new Promise((resolveTick) => setTimeout(resolveTick, 0));
  await runStoreTransaction(recordStoreName, 'readwrite', (recordStore) => recordStore.clear()).catch(() => null);
  await runStoreTransaction(assetStoreName, 'readwrite', (assetStore) => assetStore.clear()).catch(() => null);
  const database = await openStorageDatabase();
  if (database) database.close();
  resetRecordStorageForTests();
  resetAssetPoolForTests();
  resetStorageDatabaseForTests();
  return true;
};

export default resetPersistenceStorageForTests;
