import closeShellMenus from './closeShellMenus.js';

const listMenuItems = (menuElement) => [...menuElement.querySelectorAll('[role="menuitem"]')];

const wireMenuKeyboardNavigation = (stripElement) => {
  stripElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key === 'Escape') {
      closeShellMenus(stripElement, { restoreFocus: true });
      return;
    }
    const targetElement = keyEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const menuElement = targetElement.closest('[data-db-menu]');
    if (!menuElement || menuElement.hidden) return;
    const navigationKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Tab'];
    if (navigationKeys.indexOf(keyEvent.key) < 0) return;
    if (keyEvent.key === 'Tab') {
      closeShellMenus(stripElement, { restoreFocus: true });
      return;
    }
    const menuItems = listMenuItems(menuElement);
    if (!menuItems.length) return;
    const currentIndex = menuItems.indexOf(targetElement.closest('[role="menuitem"]'));
    let nextIndex = currentIndex < 0 ? 0 : currentIndex;
    if (keyEvent.key === 'ArrowDown') nextIndex = (nextIndex + 1) % menuItems.length;
    if (keyEvent.key === 'ArrowUp') nextIndex = (nextIndex - 1 + menuItems.length) % menuItems.length;
    if (keyEvent.key === 'Home') nextIndex = 0;
    if (keyEvent.key === 'End') nextIndex = menuItems.length - 1;
    keyEvent.preventDefault();
    menuItems[nextIndex].focus();
  });
};

export default wireMenuKeyboardNavigation;
