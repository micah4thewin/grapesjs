import buildRevisionsStorageKey from './buildRevisionsStorageKey.js';
import pruneAssetPool from './pruneAssetPool.js';
import trimRevisionsToBudget from './trimRevisionsToBudget.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';

const announceEviction = (editor, revisionRecord) =>
  editor.trigger('db:revision:evicted', { id: revisionRecord.id, label: revisionRecord.label || revisionRecord.id });

const writeRevisionList = (editor, moduleOptions, revisionList) => {
  const countedList = revisionList.slice(0, Math.max(1, moduleOptions.maxRevisions));
  const budgetResult = trimRevisionsToBudget(countedList, moduleOptions.maxRevisionBytes);
  let cappedList = budgetResult.keptList;
  budgetResult.droppedList.forEach((revisionRecord) => announceEviction(editor, revisionRecord));
  const storageKey = buildRevisionsStorageKey(editor, moduleOptions);
  const writeErrorMessage = writeStoredJsonRecord(storageKey, cappedList, () => {
    if (cappedList.length < 2) return false;
    const evictedRecord = cappedList[cappedList.length - 1];
    cappedList = cappedList.slice(0, -1);
    announceEviction(editor, evictedRecord);
    return true;
  });
  editor.getModel().set('dbLastRevisionErrorMessage', writeErrorMessage || '');
  if (writeErrorMessage) {
    editor.trigger('db:revision:error', { message: writeErrorMessage });
    return false;
  }
  // Trimming the list can orphan the pictures the dropped revisions pointed at.
  pruneAssetPool(editor, moduleOptions);
  return true;
};

export default writeRevisionList;
