import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import isDraftRecoveryMode from './isDraftRecoveryMode.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';
import resetUndoHistory from './resetUndoHistory.js';

const loadStoredProjectOnReady = (editor, moduleOptions) => {
  if (!editor.onReady) return;
  editor.onReady(() => {
    const storedSnapshot = readStoredJsonRecord(moduleOptions.storageKey);
    if (!isPlainRecord(storedSnapshot) || !isPlainRecord(storedSnapshot.projectData)) return;
    if (isDraftRecoveryMode(editor, moduleOptions)) {
      editor.trigger('db:project:draft-available', { savedAt: storedSnapshot.savedAt || '' });
      return;
    }
    try {
      editor.loadProjectData(storedSnapshot.projectData);
      if (isPlainRecord(storedSnapshot.siteMeta))
        replaceSiteMetaRecord(editor, storedSnapshot.siteMeta, { silent: true });
      resetUndoHistory(editor);
      editor.trigger('db:project:restored', { savedAt: storedSnapshot.savedAt });
    } catch (loadError) {
      emitSaveStatus(editor, 'error', getErrorMessageText(loadError, 'Unable to load the saved project'));
    }
  });
};

export default loadStoredProjectOnReady;
