import listFocusableElements from './listFocusableElements.js';

const moveFocusIntoModalDialog = (dialogElement) => {
  if (!dialogElement || typeof dialogElement.querySelector !== 'function') return null;
  const contentElement = dialogElement.querySelector('.gjs-mdl-content') || dialogElement;
  const preferredElement =
    contentElement.querySelector('[data-db-autofocus], [autofocus]') ||
    contentElement.querySelector('[role="tab"][aria-selected="true"]');
  const targetElement = preferredElement || listFocusableElements(contentElement)[0] || dialogElement;
  if (targetElement === dialogElement && !dialogElement.hasAttribute('tabindex')) {
    dialogElement.setAttribute('tabindex', '-1');
  }
  if (typeof targetElement.focus === 'function') targetElement.focus({ preventScroll: true });
  return targetElement;
};

export default moveFocusIntoModalDialog;
