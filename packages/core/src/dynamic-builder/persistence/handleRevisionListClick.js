import deleteRevisionRecord from './deleteRevisionRecord.js';
import downloadRevisionRecord from './downloadRevisionRecord.js';
import listRestorableRecords from './listRestorableRecords.js';
import runRevisionRestoreFlow from './runRevisionRestoreFlow.js';
import saveRevisionRecord from './saveRevisionRecord.js';

const revealConfirmRow = (confirmElement) => {
  if (!confirmElement) return;
  confirmElement.hidden = false;
  const confirmButton = confirmElement.querySelector('[data-db-revision-action^="confirm-"]');
  if (confirmButton && typeof confirmButton.focus === 'function') confirmButton.focus();
};

const handleRevisionListClick = (editor, moduleOptions, clickEvent, refreshRevisionList) => {
  const clickTarget = clickEvent.target;
  const actionButtonElement =
    clickTarget && clickTarget.closest ? clickTarget.closest('[data-db-revision-action]') : null;
  if (!actionButtonElement || actionButtonElement.disabled) return;
  const actionName = actionButtonElement.getAttribute('data-db-revision-action');
  if (actionName === 'save-now') {
    saveRevisionRecord(editor, moduleOptions, '');
    refreshRevisionList();
    return;
  }
  if (actionName === 'import') {
    const rootElement = actionButtonElement.closest('[data-db-revisions-root]');
    const importInput = rootElement && rootElement.querySelector('[data-db-revision-import-input]');
    if (importInput) importInput.click();
    return;
  }
  const itemElement = actionButtonElement.closest('[data-db-revision-id]');
  if (!itemElement) return;
  const revisionId = itemElement.getAttribute('data-db-revision-id');
  const revisionRecord = listRestorableRecords(editor, moduleOptions).find(
    (storedRevision) => storedRevision.id === revisionId,
  );
  const restoreConfirmElement = itemElement.querySelector('[data-db-revision-confirm="restore"]');
  const deleteConfirmElement = itemElement.querySelector('[data-db-revision-confirm="delete"]');
  const hideConfirmRows = () => {
    if (restoreConfirmElement) restoreConfirmElement.hidden = true;
    if (deleteConfirmElement) deleteConfirmElement.hidden = true;
  };
  if (actionName === 'restore' && revisionRecord && revisionRecord.isRestorable !== false) {
    hideConfirmRows();
    revealConfirmRow(restoreConfirmElement);
  }
  if (actionName === 'delete') {
    hideConfirmRows();
    revealConfirmRow(deleteConfirmElement);
  }
  if (actionName === 'cancel-restore' || actionName === 'cancel-delete') {
    hideConfirmRows();
    const originButton = itemElement.querySelector('[data-db-revision-action="' + actionName.slice(7) + '"]');
    if (originButton && typeof originButton.focus === 'function') originButton.focus();
  }
  if (actionName === 'confirm-restore') {
    if (runRevisionRestoreFlow(editor, moduleOptions, revisionRecord)) editor.Modal.close();
    else refreshRevisionList();
    return;
  }
  if (actionName === 'download' && revisionRecord) downloadRevisionRecord(editor, revisionRecord);
  if (actionName === 'confirm-delete' && revisionRecord && revisionRecord.kind !== 'draft') {
    deleteRevisionRecord(editor, moduleOptions, revisionId);
    refreshRevisionList();
  }
};

export default handleRevisionListClick;
