import buildProjectSnapshot from './buildProjectSnapshot.js';
import detectForeignSnapshot from './detectForeignSnapshot.js';
import emitSaveStatus from './emitSaveStatus.js';
import evictOldestRevision from './evictOldestRevision.js';
import getErrorMessageText from './getErrorMessageText.js';
import reportForeignSnapshot from './reportForeignSnapshot.js';
import writeSnapshotOwnerRecord from './writeSnapshotOwnerRecord.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';

const saveProjectSnapshot = (editor, moduleOptions) => {
  const editorModel = editor.getModel();
  const foreignOwner = detectForeignSnapshot(editor, moduleOptions);
  if (foreignOwner) return reportForeignSnapshot(editor, foreignOwner);
  emitSaveStatus(editor, 'saving', '');
  let projectSnapshot;
  try {
    projectSnapshot = buildProjectSnapshot(editor);
  } catch (snapshotError) {
    emitSaveStatus(editor, 'error', getErrorMessageText(snapshotError, 'Unable to prepare the project for saving'));
    return false;
  }
  const writeErrorMessage = writeStoredJsonRecord(moduleOptions.storageKey, projectSnapshot, () =>
    evictOldestRevision(editor, moduleOptions),
  );
  if (writeErrorMessage) {
    const lastErrorMessage = editorModel.get('dbLastSaveErrorMessage');
    editorModel.set('dbLastSaveErrorMessage', writeErrorMessage);
    emitSaveStatus(editor, 'error', writeErrorMessage, { repeated: lastErrorMessage === writeErrorMessage });
    return false;
  }
  writeSnapshotOwnerRecord(editor, moduleOptions, projectSnapshot.savedAt);
  editorModel.set('dbLastSaveErrorMessage', '');
  emitSaveStatus(editor, 'saved', '');
  return true;
};

export default saveProjectSnapshot;
