import buildProjectSnapshot from './buildProjectSnapshot.js';
import emitSaveStatus from './emitSaveStatus.js';
import evictOldestRevision from './evictOldestRevision.js';
import getErrorMessageText from './getErrorMessageText.js';
import writeStoredJsonRecord from './writeStoredJsonRecord.js';

const saveProjectSnapshot = (editor, moduleOptions) => {
  const editorModel = editor.getModel();
  emitSaveStatus(editor, 'saving', '');
  let projectSnapshot;
  try {
    projectSnapshot = buildProjectSnapshot(editor);
  } catch (snapshotError) {
    emitSaveStatus(editor, 'error', getErrorMessageText(snapshotError, 'Unable to serialize project data'));
    return false;
  }
  const writeErrorMessage = writeStoredJsonRecord(moduleOptions.storageKey, projectSnapshot, () =>
    evictOldestRevision(moduleOptions),
  );
  if (writeErrorMessage) {
    const lastErrorMessage = editorModel.get('dbLastSaveErrorMessage');
    editorModel.set('dbLastSaveErrorMessage', writeErrorMessage);
    if (lastErrorMessage !== writeErrorMessage) emitSaveStatus(editor, 'error', writeErrorMessage);
    else emitSaveStatus(editor, 'error', writeErrorMessage, { repeated: true });
    return false;
  }
  editorModel.set('dbLastSaveErrorMessage', '');
  emitSaveStatus(editor, 'saved', '');
  return true;
};

export default saveProjectSnapshot;
