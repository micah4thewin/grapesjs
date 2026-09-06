import getErrorMessageText from './getErrorMessageText.js';
import getLocalStorageArea from './getLocalStorageArea.js';
import isQuotaExceededError from './isQuotaExceededError.js';

const writeStoredJsonRecord = (storageKey, recordValue, onQuotaExceeded) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return 'Local storage is not available in this environment';
  const serializedValue = JSON.stringify(recordValue);
  try {
    storageArea.setItem(storageKey, serializedValue);
    return null;
  } catch (writeError) {
    if (isQuotaExceededError(writeError) && typeof onQuotaExceeded === 'function' && onQuotaExceeded()) {
      try {
        storageArea.setItem(storageKey, serializedValue);
        return null;
      } catch (retryError) {
        return getErrorMessageText(retryError, 'Local storage is full. Delete revisions to free space.');
      }
    }
    if (isQuotaExceededError(writeError)) {
      return 'Local storage is full. Delete saved revisions to free space.';
    }
    return getErrorMessageText(writeError, 'Unable to write to local storage');
  }
};

export default writeStoredJsonRecord;
