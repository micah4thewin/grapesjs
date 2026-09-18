import runStoreTransaction from './runStoreTransaction.js';
import { recordStoreName } from './getStorageStoreNames.js';

// Pending record changes are applied together: one transaction per flush keeps
// the autosave path from queueing a transaction per key.
const writeRecordEntries = (changedEntries) =>
  runStoreTransaction(recordStoreName, 'readwrite', (recordStore) => {
    Object.keys(changedEntries).forEach((entryKey) => {
      const entryValue = changedEntries[entryKey];
      if (typeof entryValue === 'string') recordStore.put(entryValue, entryKey);
      else recordStore.delete(entryKey);
    });
    return true;
  });

export default writeRecordEntries;
