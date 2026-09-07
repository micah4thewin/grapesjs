import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import isPlainRecord from '../support/isPlainRecord.js';
import replaceSiteMetaRecord from '../support/replaceSiteMetaRecord.js';
import resetUndoHistory from './resetUndoHistory.js';

const restoreRevisionRecord = (editor, revisionRecord) => {
  const revisionPayload = revisionRecord && isPlainRecord(revisionRecord.payload) ? revisionRecord.payload : null;
  if (!revisionPayload || !isPlainRecord(revisionPayload.projectData)) {
    editor.trigger('db:revision:error', { message: 'This revision has no usable project data and cannot be restored' });
    return false;
  }
  try {
    editor.loadProjectData(revisionPayload.projectData);
    if (isPlainRecord(revisionPayload.siteMeta)) replaceSiteMetaRecord(editor, revisionPayload.siteMeta);
    resetUndoHistory(editor);
    editor.trigger('db:revision:restored', revisionRecord);
    return true;
  } catch (restoreError) {
    const messageText = getErrorMessageText(restoreError, 'Unable to restore this revision');
    emitSaveStatus(editor, 'error', messageText);
    editor.trigger('db:revision:error', { message: messageText });
    return false;
  }
};

export default restoreRevisionRecord;
