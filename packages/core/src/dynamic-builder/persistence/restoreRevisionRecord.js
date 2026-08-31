import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import isPlainRecord from '../support/isPlainRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const restoreRevisionRecord = (editor, revisionRecord) => {
  const revisionPayload = revisionRecord && isPlainRecord(revisionRecord.payload) ? revisionRecord.payload : null;
  if (!revisionPayload || !isPlainRecord(revisionPayload.projectData)) return false;
  try {
    editor.loadProjectData(revisionPayload.projectData);
    if (isPlainRecord(revisionPayload.siteMeta)) updateSiteMetaRecord(editor, revisionPayload.siteMeta);
    return true;
  } catch (restoreError) {
    emitSaveStatus(editor, 'error', getErrorMessageText(restoreError, 'Unable to restore the revision'));
    return false;
  }
};

export default restoreRevisionRecord;
