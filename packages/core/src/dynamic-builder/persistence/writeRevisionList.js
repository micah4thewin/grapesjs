import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import emitSaveStatus from './emitSaveStatus.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';

const writeRevisionList = (editor, moduleOptions, revisionList) => {
  const cappedList = revisionList.slice(0, Math.max(1, moduleOptions.maxRevisions));
  const writeErrorMessage = writeStoredJsonRecord(buildRevisionsStorageKey(moduleOptions), cappedList);
  if (writeErrorMessage) {
    emitSaveStatus(editor, 'error', writeErrorMessage);
    return false;
  }
  return true;
};

export default writeRevisionList;
