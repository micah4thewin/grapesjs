import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import isPlainRecord from '../support/isPlainRecord.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';

const restoreRevisionRecord = (editor, revisionRecord) => {
  const revisionPayload = revisionRecord && isPlainRecord(revisionRecord.payload) ? revisionRecord.payload : null;
  if (!revisionPayload || !isPlainRecord(revisionPayload.projectData)) {
    emitSaveStatus(editor, 'error', 'This revision has no usable project data');
    return false;
  }
  try {
    editor.loadProjectData(revisionPayload.projectData);
    if (isPlainRecord(revisionPayload.siteMeta)) replaceSiteMetaRecord(editor, revisionPayload.siteMeta);
    editor.trigger('db:revision:restored', revisionRecord);
    return true;
  } catch (restoreError) {
    emitSaveStatus(editor, 'error', getErrorMessageText(restoreError, 'Unable to restore the revision'));
    return false;
  }
};

export default restoreRevisionRecord;
