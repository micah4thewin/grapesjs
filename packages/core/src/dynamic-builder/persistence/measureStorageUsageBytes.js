import getRecordStorageArea, { listRecordStorageKeys } from './storage/getRecordStorageArea.js';
import { measureKnownAssetBytes } from './storage/getAssetPoolStore.js';

const measureMirroredRecordBytes = () => {
  const storageArea = getRecordStorageArea();
  return listRecordStorageKeys().reduce((totalBytes, recordKey) => {
    const storedValue = storageArea.getItem(recordKey) || '';
    return totalBytes + (storedValue.length + recordKey.length) * 2;
  }, 0);
};

// The browser's own estimate covers the whole origin, which is the number that
// decides whether the next write fits. Where it is missing, what this editor
// stores is added up instead.
const measureStorageUsageBytes = async () => {
  try {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
      const storageEstimate = await navigator.storage.estimate();
      if (Number.isFinite(storageEstimate.usage)) {
        return {
          usedBytes: storageEstimate.usage,
          quotaBytes: Number.isFinite(storageEstimate.quota) ? storageEstimate.quota : 0,
        };
      }
    }
  } catch (estimateError) {
    /* fall through to counting what this editor stores */
  }
  return { usedBytes: measureMirroredRecordBytes() + measureKnownAssetBytes(), quotaBytes: 0 };
};

export default measureStorageUsageBytes;
