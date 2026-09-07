import runSiteCardAction from './runSiteCardAction.js';
import toggleSiteCardRow from './toggleSiteCardRow.js';

const rowActionNames = {
  rename: { rowName: 'rename', isVisible: true },
  delete: { rowName: 'delete', isVisible: true },
  'cancel-rename': { rowName: 'rename', isVisible: false },
  'cancel-delete': { rowName: 'delete', isVisible: false },
};

const handleSiteManagerClick = (editor, managerOptions, clickEvent, refreshList) => {
  const clickTarget = clickEvent.target;
  const actionElement = clickTarget && clickTarget.closest ? clickTarget.closest('[data-db-site-action]') : null;
  if (!actionElement || actionElement.disabled) return null;
  const cardElement = actionElement.closest('[data-db-site-id]');
  if (!cardElement) return null;
  const actionName = actionElement.getAttribute('data-db-site-action');
  const rowAction = rowActionNames[actionName];
  if (rowAction) {
    toggleSiteCardRow(cardElement, rowAction.rowName, rowAction.isVisible);
    return null;
  }
  const siteId = cardElement.getAttribute('data-db-site-id');
  return runSiteCardAction(editor, managerOptions, { actionName, siteId, cardElement }, refreshList);
};

export default handleSiteManagerClick;
