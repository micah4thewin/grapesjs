import getErrorMessageText from './getErrorMessageText.js';
import getRecordStorageArea from './storage/getRecordStorageArea.js';
import getStorageFullMessage from './getStorageFullMessage.js';
import isQuotaExceededError from './isQuotaExceededError.js';

const writeStoredJsonRecord = (storageKey, recordValue, onQuotaExceeded) => {
  const storageArea = getRecordStorageArea();
  if (!storageArea) return 'Browser storage is not available here, so nothing can be saved';
  const serializedValue = JSON.stringify(recordValue);
  try {
    storageArea.setItem(storageKey, serializedValue);
    return null;
  } catch (writeError) {
    if (!isQuotaExceededError(writeError)) return getErrorMessageText(writeError, 'Unable to write to browser storage');
    while (typeof onQuotaExceeded === 'function' && onQuotaExceeded()) {
      try {
        storageArea.setItem(storageKey, serializedValue);
        return null;
      } catch (retryError) {
        if (!isQuotaExceededError(retryError)) {
          return getErrorMessageText(retryError, 'Unable to write to browser storage');
        }
      }
    }
    return getStorageFullMessage();
  }
};

export default writeStoredJsonRecord;
