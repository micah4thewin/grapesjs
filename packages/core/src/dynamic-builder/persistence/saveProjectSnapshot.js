import buildProjectSnapshot from './buildProjectSnapshot.js';
import detectForeignSnapshot from './detectForeignSnapshot.js';
import emitSaveStatus from './emitSaveStatus.js';
import evictOldestRevision from './evictOldestRevision.js';
import getErrorMessageText from './getErrorMessageText.js';
import isEditorUsable from './isEditorUsable.js';
import reportForeignSnapshot from './reportForeignSnapshot.js';
import writeSnapshotOwnerRecord from './writeSnapshotOwnerRecord.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';
import resolveStorageKey from './resolveStorageKey.js';

const saveProjectSnapshot = (editor, moduleOptions) => {
  if (!isEditorUsable(editor)) return false;
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
  const writeErrorMessage = writeStoredJsonRecord(resolveStorageKey(editor, moduleOptions), projectSnapshot, () =>
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
