import getLocalStorageArea from './getLocalStorageArea.js';

const readStoredJsonRecord = (storageKey) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return null;
  try {
    const rawValue = storageArea.getItem(storageKey);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

export default readStoredJsonRecord;
