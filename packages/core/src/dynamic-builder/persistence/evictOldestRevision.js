import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import getLocalStorageArea from './getLocalStorageArea.js';
import readRevisionList from './readRevisionList.js';
import sortRevisionsNewestFirst from './sortRevisionsNewestFirst.js';

const evictOldestRevision = (editor, moduleOptions) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return false;
  const revisionList = sortRevisionsNewestFirst(readRevisionList(moduleOptions));
  if (revisionList.length < 2) return false;
  const evictedRecord = revisionList[revisionList.length - 1];
  try {
    storageArea.setItem(buildRevisionsStorageKey(moduleOptions), JSON.stringify(revisionList.slice(0, -1)));
  } catch (evictError) {
    return false;
  }
  editor.trigger('db:revision:evicted', { id: evictedRecord.id, label: evictedRecord.label || evictedRecord.id });
  return true;
};

export default evictOldestRevision;
