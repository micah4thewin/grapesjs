import getLocalStorageArea from './getLocalStorageArea.js';

// Parsing a pool of pictures costs real time on every autosave tick, so the
// callers that only need to know which tokens are present read the text itself.
const readRawStoredText = (storageKey) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return '';
  try {
    return storageArea.getItem(storageKey) || '';
  } catch (readError) {
    return '';
  }
};

export default readRawStoredText;
