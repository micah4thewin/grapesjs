import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import buildSnapshotOwnerKey from './buildSnapshotOwnerKey.js';
import getLocalStorageArea from './getLocalStorageArea.js';

const measureStorageUsageBytes = (moduleOptions) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return 0;
  const storageKeys = [
    moduleOptions.storageKey,
    buildRevisionsStorageKey(moduleOptions),
    buildSnapshotOwnerKey(moduleOptions),
  ];
  return storageKeys.reduce((totalBytes, storageKey) => {
    let storedValue = '';
    try {
      storedValue = storageArea.getItem(storageKey) || '';
    } catch (readError) {
      storedValue = '';
    }
    return totalBytes + (storedValue ? (storedValue.length + storageKey.length) * 2 : 0);
  }, 0);
};

export default measureStorageUsageBytes;
