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
  const restoreConfirmElement = itemElement.querySelector('[data-db-revision-confirm="restore"]');
  const deleteConfirmElement = itemElement.querySelector('[data-db-revision-confirm="delete"]');
  const hideConfirmRows = () => {
    if (restoreConfirmElement) restoreConfirmElement.hidden = true;
    if (deleteConfirmElement) deleteConfirmElement.hidden = true;
  };
  if (actionName === 'restore' && restoreConfirmElement) {
    hideConfirmRows();
    restoreConfirmElement.hidden = false;
  }
  if (actionName === 'delete' && deleteConfirmElement) {
    hideConfirmRows();
    deleteConfirmElement.hidden = false;
  }
  if (actionName === 'cancel-restore' || actionName === 'cancel-delete') hideConfirmRows();
  if (actionName === 'confirm-restore' && revisionRecord) {
    if (restoreRevisionRecord(editor, revisionRecord)) editor.Modal.close();
    return;
  }
  if (actionName === 'download' && revisionRecord) downloadRevisionRecord(revisionRecord);
  if (actionName === 'confirm-delete') {
    deleteRevisionRecord(editor, moduleOptions, revisionId);
    refreshRevisionList();
  }
};

export default handleRevisionListClick;
