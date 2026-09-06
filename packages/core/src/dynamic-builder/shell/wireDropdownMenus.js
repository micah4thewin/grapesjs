import closeShellMenus from './closeShellMenus.js';
import renderPagesMenuItems from './renderPagesMenuItems.js';
import wireMenuKeyboardNavigation from './wireMenuKeyboardNavigation.js';

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
        const firstMenuItem = menuElement.querySelector('[role="menuitem"]');
        if (firstMenuItem && firstMenuItem.focus) firstMenuItem.focus();
      }
      return;
    }
    const menuItemElement = targetElement.closest('[data-db-menu] [data-db-command]');
    if (menuItemElement) closeShellMenus(stripElement, { restoreFocus: true });
  });
  wireMenuKeyboardNavigation(stripElement);
  const closeOnOutsideInteraction = (interactionEvent) => {
    const targetElement = interactionEvent.target;
    if (targetElement && targetElement.closest && targetElement.closest('[data-db-panel="db-top"]') === stripElement) {
      return;
    }
    closeShellMenus(stripElement);
  };
  ownerDocument.addEventListener('click', closeOnOutsideInteraction);
  ownerDocument.addEventListener('mousedown', closeOnOutsideInteraction);
  const closeMenus = () => closeShellMenus(stripElement);
  editor.on('component:selected', closeMenus);
  editor.on('page:select', closeMenus);
  editor.on('canvas:frame:load', closeMenus);
  editor.on('destroy', () => {
    ownerDocument.removeEventListener('click', closeOnOutsideInteraction);
    ownerDocument.removeEventListener('mousedown', closeOnOutsideInteraction);
  });
};

export default wireDropdownMenus;
