import getErrorMessageText from './getErrorMessageText.js';
import getLocalStorageArea from './getLocalStorageArea.js';

const writeStoredJsonRecord = (storageKey, recordValue) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return 'Local storage is not available in this environment';
  try {
    storageArea.setItem(storageKey, JSON.stringify(recordValue));
    return null;
  } catch (writeError) {
    return getErrorMessageText(writeError, 'Unable to write to local storage');
  }
};

export default writeStoredJsonRecord;
