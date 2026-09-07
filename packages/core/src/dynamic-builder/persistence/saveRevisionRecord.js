import buildAutoRevisionLabel from './buildAutoRevisionLabel.js';
import buildProjectSnapshot from './buildProjectSnapshot.js';
import buildRevisionMetaRecord from './buildRevisionMetaRecord.js';
import getErrorMessageText from './getErrorMessageText.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readRevisionList from './readRevisionList.js';
import writeRevisionList from './writeRevisionList.js';

const saveRevisionRecord = (editor, moduleOptions, revisionLabel, recordOptions = {}) => {
  let snapshotPayload = isPlainRecord(recordOptions.payload) ? recordOptions.payload : null;
  if (!snapshotPayload) {
    try {
      snapshotPayload = buildProjectSnapshot(editor);
    } catch (snapshotError) {
      const messageText = getErrorMessageText(snapshotError, 'Unable to prepare the project for saving');
      editor.getModel().set('dbLastRevisionErrorMessage', messageText);
      editor.trigger('db:revision:error', { message: messageText });
      return null;
    }
  }
  const revisionDate = new Date();
  const trimmedLabel = String(revisionLabel || '').trim();
  const revisionRecord = {
    id: 'rev-' + revisionDate.getTime().toString(36) + '-' + Math.random().toString(36).slice(2, 8),
    label: trimmedLabel || buildAutoRevisionLabel(revisionDate),
    savedAt: revisionDate.toISOString(),
    kind: recordOptions.kind || 'manual',
    meta: buildRevisionMetaRecord(snapshotPayload),
    payload: snapshotPayload,
  };
  const nextRevisionList = [revisionRecord].concat(readRevisionList(moduleOptions));
  if (!writeRevisionList(editor, moduleOptions, nextRevisionList)) return null;
  editor.trigger('db:revision:saved', revisionRecord);
  return revisionRecord;
};

export default saveRevisionRecord;
