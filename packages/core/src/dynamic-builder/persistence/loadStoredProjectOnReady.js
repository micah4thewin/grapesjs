import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import hasHostProvidedContent from './hasHostProvidedContent.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';

const loadStoredProjectOnReady = (editor, moduleOptions) => {
  if (!moduleOptions.autoload || !editor.onReady) return;
  editor.onReady(() => {
    if (hasHostProvidedContent(editor)) return;
    const storedSnapshot = readStoredJsonRecord(moduleOptions.storageKey);
    if (!isPlainRecord(storedSnapshot) || !isPlainRecord(storedSnapshot.projectData)) return;
    try {
      editor.loadProjectData(storedSnapshot.projectData);
      if (isPlainRecord(storedSnapshot.siteMeta))
        replaceSiteMetaRecord(editor, storedSnapshot.siteMeta, { silent: true });
      editor.trigger('db:project:restored', { savedAt: storedSnapshot.savedAt });
    } catch (loadError) {
      emitSaveStatus(editor, 'error', getErrorMessageText(loadError, 'Unable to load the stored project'));
    }
  });
};

export default loadStoredProjectOnReady;
