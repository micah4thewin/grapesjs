import buildAutoRevisionLabel from './buildAutoRevisionLabel.js';
import buildProjectSnapshot from './buildProjectSnapshot.js';
import emitSaveStatus from './emitSaveStatus.js';
import getErrorMessageText from './getErrorMessageText.js';
import readRevisionList from './readRevisionList.js';
import writeRevisionList from './writeRevisionList.js';

const saveRevisionRecord = (editor, moduleOptions, revisionLabel) => {
  let snapshotPayload;
  try {
    snapshotPayload = buildProjectSnapshot(editor);
  } catch (snapshotError) {
    emitSaveStatus(editor, 'error', getErrorMessageText(snapshotError, 'Unable to serialize project data'));
    return null;
  }
  const revisionDate = new Date();
  const trimmedLabel = String(revisionLabel || '').trim();
  const revisionRecord = {
    id: 'rev-' + revisionDate.getTime().toString(36) + '-' + Math.random().toString(36).slice(2, 8),
    label: trimmedLabel || buildAutoRevisionLabel(revisionDate),
    savedAt: revisionDate.toISOString(),
    payload: snapshotPayload,
  };
  const nextRevisionList = [revisionRecord].concat(readRevisionList(moduleOptions));
  if (!writeRevisionList(editor, moduleOptions, nextRevisionList)) return null;
  editor.trigger('db:revision:saved', revisionRecord);
  return revisionRecord;
};

export default saveRevisionRecord;
