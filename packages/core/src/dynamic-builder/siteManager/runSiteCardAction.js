import isEditorLive from '../support/isEditorLive.js';
import runSiteCopyAction from './runSiteCopyAction.js';
import showToastNotice from '../support/showToastNotice.js';

const readRenameValue = (cardElement) => {
  const inputElement = cardElement.querySelector('[data-db-site-rename-input]');
  return inputElement ? String(inputElement.value || '').trim() : '';
};

const runSiteCardAction = (editor, managerOptions, actionRecord, refreshList) => {
  const { actionName, siteId, cardElement } = actionRecord;
  if (actionName === 'open') {
    editor.Modal.close();
    return editor.runCommand('db:switch-site', { siteId });
  }
  if (actionName === 'confirm-rename') {
    const nextName = readRenameValue(cardElement);
    if (!nextName) return null;
    return editor.runCommand('db:rename-site', { siteId, name: nextName }).then(() => refreshList());
  }
  if (actionName === 'confirm-delete') {
    return editor.runCommand('db:delete-site', { siteId }).then((deletedRecord) => {
      if (!isEditorLive(editor)) return null;
      if (deletedRecord) showToastNotice(editor, 'Deleted ' + deletedRecord.name, { kind: 'success' });
      return refreshList();
    });
  }
  if (actionName === 'duplicate' || actionName === 'export') {
    return runSiteCopyAction(editor, managerOptions, actionName, siteId, refreshList);
  }
  return null;
};

export default runSiteCardAction;
