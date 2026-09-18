import openStorageDatabase from './openStorageDatabase.js';

// Every store call goes through here so a browser that refuses the transaction
// (a deleted database, a private window) degrades to null instead of throwing
// into an autosave tick.
const runStoreTransaction = async (storeName, transactionMode, runWithStore) => {
  const database = await openStorageDatabase();
  if (!database) return null;
  return new Promise((resolveTransaction, rejectTransaction) => {
    let storeTransaction = null;
    try {
      storeTransaction = database.transaction(storeName, transactionMode);
    } catch (transactionError) {
      rejectTransaction(transactionError);
      return;
    }
    let runResult;
    try {
      runResult = runWithStore(storeTransaction.objectStore(storeName));
    } catch (runError) {
      rejectTransaction(runError);
      return;
    }
    storeTransaction.oncomplete = () => resolveTransaction(runResult);
    storeTransaction.onabort = () =>
      rejectTransaction(storeTransaction.error || new Error('Browser storage transaction was aborted'));
    storeTransaction.onerror = () =>
      rejectTransaction(storeTransaction.error || new Error('Browser storage transaction failed'));
  });
};

export default runStoreTransaction;
