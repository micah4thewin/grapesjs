import movePageRowFocus from './movePageRowFocus.js';
import renderPagesMenuItems from './renderPagesMenuItems.js';
import reorderSitePage from './reorderSitePage.js';

const wirePagesMenuRowKeys = (editor, stripElement) => {
  stripElement.addEventListener('keydown', (keyEvent) => {
    const targetElement = keyEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const menuElement = targetElement.closest('[data-db-menu="pages"]');
    const rowElement = targetElement.closest('[data-db-page-row]');
    if (!menuElement || menuElement.hidden || !rowElement) return;
    const pageId = rowElement.getAttribute('data-db-page-row') || '';
    const actionName = targetElement.getAttribute('data-db-page-action') || '';
    if (keyEvent.altKey && (keyEvent.key === 'ArrowUp' || keyEvent.key === 'ArrowDown')) {
      keyEvent.preventDefault();
      keyEvent.stopImmediatePropagation();
      if (!reorderSitePage(editor, pageId, keyEvent.key === 'ArrowUp' ? -1 : 1)) return;
      renderPagesMenuItems(editor, menuElement);
      const movedButton = menuElement.querySelector(`[data-db-page-row="${pageId}"] [data-db-page-action="${actionName}"]`);
      movedButton && movedButton.focus();
      return;
    }
    if (keyEvent.key !== 'ArrowRight' && keyEvent.key !== 'ArrowLeft') return;
    if (movePageRowFocus(rowElement, targetElement, keyEvent.key === 'ArrowRight' ? 1 : -1)) {
      keyEvent.preventDefault();
      keyEvent.stopImmediatePropagation();
    }
  });
};

export default wirePagesMenuRowKeys;
