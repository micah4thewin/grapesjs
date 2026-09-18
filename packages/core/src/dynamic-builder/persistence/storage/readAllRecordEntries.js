import runStorageRequest from './runStorageRequest.js';
import runStoreTransaction from './runStoreTransaction.js';
import { recordStoreName } from './getStorageStoreNames.js';

// Read once at startup to fill the in-memory mirror the synchronous callers use.
const readAllRecordEntries = async () => {
  const entryRecord = {};
  const readResult = await runStoreTransaction(recordStoreName, 'readonly', (recordStore) => {
    const keysRequest = runStorageRequest(recordStore.getAllKeys());
    const valuesRequest = runStorageRequest(recordStore.getAll());
    return Promise.all([keysRequest, valuesRequest]);
  });
  if (!readResult) return null;
  const [storedKeys, storedValues] = await readResult;
  storedKeys.forEach((storedKey, keyIndex) => {
    if (typeof storedValues[keyIndex] === 'string') entryRecord[String(storedKey)] = storedValues[keyIndex];
  });
  return entryRecord;
};

export default readAllRecordEntries;
