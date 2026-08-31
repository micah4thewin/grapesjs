import deleteRevisionRecord from './deleteRevisionRecord.js';
import downloadRevisionRecord from './downloadRevisionRecord.js';
import readRevisionList from './readRevisionList.js';
import restoreRevisionRecord from './restoreRevisionRecord.js';
import saveRevisionRecord from './saveRevisionRecord.js';

const handleRevisionListClick = (editor, moduleOptions, clickEvent, refreshRevisionList) => {
  const clickTarget = clickEvent.target;
  const actionButtonElement =
    clickTarget && clickTarget.closest ? clickTarget.closest('[data-db-revision-action]') : null;
  if (!actionButtonElement) return;
  const actionName = actionButtonElement.getAttribute('data-db-revision-action');
  if (actionName === 'save-now') {
    saveRevisionRecord(editor, moduleOptions, '');
    refreshRevisionList();
    return;
  }
  const itemElement = actionButtonElement.closest('[data-db-revision-id]');
  if (!itemElement) return;
  const revisionId = itemElement.getAttribute('data-db-revision-id');
  const revisionRecord = readRevisionList(moduleOptions).find((storedRevision) => storedRevision.id === revisionId);
  const confirmRowElement = itemElement.querySelector('.gjs-db-revision-confirm');
  if (actionName === 'restore' && confirmRowElement) confirmRowElement.hidden = false;
  if (actionName === 'cancel-restore' && confirmRowElement) confirmRowElement.hidden = true;
  if (actionName === 'confirm-restore' && revisionRecord) {
    if (restoreRevisionRecord(editor, revisionRecord)) editor.Modal.close();
    return;
  }
  if (actionName === 'download' && revisionRecord) downloadRevisionRecord(revisionRecord);
  if (actionName === 'delete') {
    deleteRevisionRecord(editor, moduleOptions, revisionId);
    refreshRevisionList();
  }
};

export default handleRevisionListClick;
