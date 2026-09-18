import getRecordStorageArea from './storage/getRecordStorageArea.js';

const readStoredJsonRecord = (storageKey) => {
  const storageArea = getRecordStorageArea();
  if (!storageArea) return null;
  try {
    const rawValue = storageArea.getItem(storageKey);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

export default readStoredJsonRecord;
