import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';

const writeRevisionList = (editor, moduleOptions, revisionList) => {
  let cappedList = revisionList.slice(0, Math.max(1, moduleOptions.maxRevisions));
  const storageKey = buildRevisionsStorageKey(moduleOptions);
  const writeErrorMessage = writeStoredJsonRecord(storageKey, cappedList, () => {
    if (cappedList.length < 2) return false;
    const evictedRecord = cappedList[cappedList.length - 1];
    cappedList = cappedList.slice(0, -1);
    editor.trigger('db:revision:evicted', { id: evictedRecord.id, label: evictedRecord.label || evictedRecord.id });
    return true;
  });
  editor.getModel().set('dbLastRevisionErrorMessage', writeErrorMessage || '');
  if (writeErrorMessage) {
    editor.trigger('db:revision:error', { message: writeErrorMessage });
    return false;
  }
  return true;
};

export default writeRevisionList;
