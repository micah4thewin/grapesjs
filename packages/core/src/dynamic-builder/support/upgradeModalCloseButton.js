import getIconMarkup from './getIconMarkup.js';

const upgradeModalCloseButton = (dialogElement) => {
  const closeElement = dialogElement && dialogElement.querySelector('[data-close-modal]');
  if (!closeElement) return null;
  if (closeElement.tagName === 'BUTTON') return closeElement;
  const buttonElement = closeElement.ownerDocument.createElement('button');
  buttonElement.type = 'button';
  buttonElement.className = closeElement.className;
  buttonElement.setAttribute('data-close-modal', '');
  buttonElement.setAttribute('aria-label', 'Close dialog');
  buttonElement.title = 'Close';
  buttonElement.innerHTML = getIconMarkup('close', { size: 18 });
  closeElement.parentNode.replaceChild(buttonElement, closeElement);
  return buttonElement;
};

export default upgradeModalCloseButton;
