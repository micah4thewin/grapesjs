import buildProjectSnapshot from './buildProjectSnapshot.js';
import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';

const saveProjectSnapshot = (editor, moduleOptions) => {
  emitSaveStatus(editor, 'saving', '');
  let projectSnapshot;
  try {
    projectSnapshot = buildProjectSnapshot(editor);
  } catch (snapshotError) {
    emitSaveStatus(editor, 'error', getErrorMessageText(snapshotError, 'Unable to serialize project data'));
    return false;
  }
  const writeErrorMessage = writeStoredJsonRecord(moduleOptions.storageKey, projectSnapshot);
  if (writeErrorMessage) {
    emitSaveStatus(editor, 'error', writeErrorMessage);
    return false;
  }
  emitSaveStatus(editor, 'saved', '');
  return true;
};

export default saveProjectSnapshot;
