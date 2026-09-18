import { assetStoreName, databaseName, databaseVersion, recordStoreName } from './getStorageStoreNames.js';

const resolveDatabaseFactory = () => {
  try {
    if (typeof window === 'undefined') return null;
    return window.indexedDB || null;
  } catch (accessError) {
    return null;
  }
};

let openDatabasePromise = null;

// Resolves to null rather than rejecting when the browser has no usable
// IndexedDB, so every caller can fall back to localStorage instead of failing.
const openStorageDatabase = () => {
  if (openDatabasePromise) return openDatabasePromise;
  const databaseFactory = resolveDatabaseFactory();
  if (!databaseFactory) {
    openDatabasePromise = Promise.resolve(null);
    return openDatabasePromise;
  }
  openDatabasePromise = new Promise((resolveOpen) => {
    let openRequest = null;
    try {
      openRequest = databaseFactory.open(databaseName, databaseVersion);
    } catch (openError) {
      resolveOpen(null);
      return;
    }
    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;
      if (!database.objectStoreNames.contains(recordStoreName)) database.createObjectStore(recordStoreName);
      if (!database.objectStoreNames.contains(assetStoreName)) database.createObjectStore(assetStoreName);
    };
    openRequest.onsuccess = () => {
      const database = openRequest.result;
      // A second tab upgrading the database is blocked while this connection is
      // open, so it stands aside when asked rather than wedging that tab.
      database.onversionchange = () => database.close();
      resolveOpen(database);
    };
    openRequest.onerror = () => resolveOpen(null);
    openRequest.onblocked = () => resolveOpen(null);
  });
  return openDatabasePromise;
};

export const resetStorageDatabaseForTests = () => {
  openDatabasePromise = null;
};

export default openStorageDatabase;
