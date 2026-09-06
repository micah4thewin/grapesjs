import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import emitSaveStatus from './emitSaveStatus.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';

const writeRevisionList = (editor, moduleOptions, revisionList) => {
  let cappedList = revisionList.slice(0, Math.max(1, moduleOptions.maxRevisions));
  const storageKey = buildRevisionsStorageKey(moduleOptions);
  const writeErrorMessage = writeStoredJsonRecord(storageKey, cappedList, () => {
    if (cappedList.length < 2) return false;
    cappedList = cappedList.slice(0, -1);
    return true;
  });
  if (writeErrorMessage) {
    emitSaveStatus(editor, 'error', writeErrorMessage);
    return false;
  }
  return true;
};

export default writeRevisionList;
