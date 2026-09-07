import buildActionToastElement from './buildActionToastElement.js';
import ensureToastHostElement from './ensureToastHostElement.js';

const showActionToastNotice = (editor, messageText, options = {}) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const toastHost = ensureToastHostElement(containerElement);
  const toastElement = buildActionToastElement(containerElement.ownerDocument, messageText, options);
  toastHost.appendChild(toastElement);
  const dismissDelay = options.duration || (options.actionLabel ? 8000 : 5000);
  let dismissTimer = null;
  let isRemoved = false;
  const removeToast = () => {
    if (isRemoved) return;
    isRemoved = true;
    dismissTimer && clearTimeout(dismissTimer);
    toastElement.classList.remove('gjs-db-toast-visible');
    setTimeout(() => toastElement.remove(), 320);
  };
  const pauseDismissTimer = () => dismissTimer && clearTimeout(dismissTimer);
  const startDismissTimer = () => {
    pauseDismissTimer();
    dismissTimer = setTimeout(removeToast, dismissDelay);
  };
  toastElement.addEventListener('mouseenter', pauseDismissTimer);
  toastElement.addEventListener('focusin', pauseDismissTimer);
  toastElement.addEventListener('mouseleave', startDismissTimer);
  toastElement.addEventListener('focusout', startDismissTimer);
  const actionButton = toastElement.querySelector('[data-db-toast-action]');
  actionButton &&
    actionButton.addEventListener('click', () => {
      removeToast();
      options.onAction && options.onAction();
    });
  const closeButton = toastElement.querySelector('[data-db-toast-close]');
  closeButton && closeButton.addEventListener('click', removeToast);
  setTimeout(() => toastElement.classList.add('gjs-db-toast-visible'), 20);
  startDismissTimer();
  return { toastElement, dismiss: removeToast };
};

export default showActionToastNotice;
