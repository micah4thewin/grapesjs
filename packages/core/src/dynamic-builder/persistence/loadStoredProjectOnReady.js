import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const loadStoredProjectOnReady = (editor, moduleOptions) => {
  if (!moduleOptions.autoload || !editor.onReady) return;
  editor.onReady(() => {
    const storedSnapshot = readStoredJsonRecord(moduleOptions.storageKey);
    if (!isPlainRecord(storedSnapshot) || !isPlainRecord(storedSnapshot.projectData)) return;
    try {
      editor.loadProjectData(storedSnapshot.projectData);
      if (isPlainRecord(storedSnapshot.siteMeta)) updateSiteMetaRecord(editor, storedSnapshot.siteMeta);
    } catch (loadError) {
      emitSaveStatus(editor, 'error', getErrorMessageText(loadError, 'Unable to load the stored project'));
    }
  });
};

export default loadStoredProjectOnReady;
