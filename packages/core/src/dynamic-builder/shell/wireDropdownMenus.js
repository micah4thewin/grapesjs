import closeShellMenus from './closeShellMenus.js';
import renderPagesMenuItems from './renderPagesMenuItems.js';

const wireDropdownMenus = (editor, stripElement) => {
  const ownerDocument = stripElement.ownerDocument;
  stripElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const triggerElement = targetElement.closest('[data-db-menu-trigger]');
    if (triggerElement && stripElement.contains(triggerElement)) {
      const menuName = triggerElement.getAttribute('data-db-menu-trigger');
      const menuElement = stripElement.querySelector(`[data-db-menu="${menuName}"]`);
      if (!menuElement) return;
      const shouldOpen = menuElement.hidden;
      closeShellMenus(stripElement);
      if (shouldOpen) {
        if (menuName === 'pages') renderPagesMenuItems(editor, menuElement);
        menuElement.hidden = false;
        triggerElement.setAttribute('aria-expanded', 'true');
      }
      return;
    }
    const menuItemElement = targetElement.closest('[data-db-menu] [data-db-command]');
    if (menuItemElement) closeShellMenus(stripElement);
  });
  stripElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key !== 'Escape') return;
    const openTrigger = stripElement.querySelector('[data-db-menu-trigger][aria-expanded="true"]');
    closeShellMenus(stripElement);
    openTrigger && openTrigger.focus();
  });
  ownerDocument.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target;
    if (targetElement && targetElement.closest && targetElement.closest('[data-db-panel="db-top"]')) return;
    closeShellMenus(stripElement);
  });
};

export default wireDropdownMenus;
