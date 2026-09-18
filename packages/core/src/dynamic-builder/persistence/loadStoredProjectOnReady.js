import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import isDraftRecoveryMode from './isDraftRecoveryMode.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';
import resetUndoHistory from './resetUndoHistory.js';
import resolveStorageKey from './resolveStorageKey.js';
import restorePayloadAssets from './restorePayloadAssets.js';

// Waiting on storage hands control back before the project is loaded, so the
// modules that build on it - the site manager above all - are given something
// to wait for rather than a project that is still empty.
const loadStoredProjectOnReady = (editor, moduleOptions, whenStorageReady) => {
  if (!editor.onReady) return;
  let markProjectLoaded = () => {};
  editor.getModel().set(
    'dbProjectLoaded',
    new Promise((resolveLoaded) => {
      markProjectLoaded = resolveLoaded;
    }),
  );
  editor.onReady(async () => {
    try {
      await whenStorageReady;
      const storedSnapshot = readStoredJsonRecord(resolveStorageKey(editor, moduleOptions));
      if (!isPlainRecord(storedSnapshot) || !isPlainRecord(storedSnapshot.projectData)) return;
      if (isDraftRecoveryMode(editor, moduleOptions)) {
        editor.trigger('db:project:draft-available', { savedAt: storedSnapshot.savedAt || '' });
        return;
      }
      try {
        editor.loadProjectData(await restorePayloadAssets(storedSnapshot.projectData));
        if (isPlainRecord(storedSnapshot.siteMeta))
          replaceSiteMetaRecord(editor, storedSnapshot.siteMeta, { silent: true });
        resetUndoHistory(editor);
        editor.trigger('db:project:restored', { savedAt: storedSnapshot.savedAt });
      } catch (loadError) {
        emitSaveStatus(editor, 'error', getErrorMessageText(loadError, 'Unable to load the saved project'));
      }
    } finally {
      markProjectLoaded(true);
    }
  });
};

export default loadStoredProjectOnReady;
