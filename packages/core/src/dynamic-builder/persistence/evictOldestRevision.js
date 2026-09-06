import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import getLocalStorageArea from './getLocalStorageArea.js';
import readRevisionList from './readRevisionList.js';
import sortRevisionsNewestFirst from './sortRevisionsNewestFirst.js';

const evictOldestRevision = (moduleOptions) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return false;
  const revisionList = sortRevisionsNewestFirst(readRevisionList(moduleOptions));
  if (revisionList.length < 2) return false;
  try {
    storageArea.setItem(buildRevisionsStorageKey(moduleOptions), JSON.stringify(revisionList.slice(0, -1)));
    return true;
  } catch (evictError) {
    return false;
  }
};

export default evictOldestRevision;
