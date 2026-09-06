const resolveToastHost = (containerElement, ownerDocument) => {
  const existingHost = containerElement.querySelector('[data-db-toast-host]');
  if (existingHost) return existingHost;
  const toastHost = ownerDocument.createElement('div');
  toastHost.setAttribute('data-db-toast-host', 'true');
  toastHost.setAttribute('role', 'status');
  toastHost.setAttribute('aria-live', 'polite');
  toastHost.setAttribute('aria-atomic', 'false');
  toastHost.className = 'gjs-db-toast-host';
  containerElement.appendChild(toastHost);
  return toastHost;
};

const showToastNotice = (editor, messageText, options = {}) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const ownerDocument = containerElement.ownerDocument;
  const toastHost = resolveToastHost(containerElement, ownerDocument);
  const toastElement = ownerDocument.createElement('div');
  toastElement.className = `gjs-db-toast${options.kind ? ` gjs-db-toast-${options.kind}` : ''}`;
  toastHost.appendChild(toastElement);
  const dismissDelay = options.duration || 3200;
  let dismissTimer = null;
  const removeToast = () => {
    toastElement.classList.remove('gjs-db-toast-visible');
    setTimeout(() => toastElement.remove(), 320);
  };
  const startDismissTimer = () => {
    dismissTimer && clearTimeout(dismissTimer);
    dismissTimer = setTimeout(removeToast, dismissDelay);
  };
  toastElement.addEventListener('mouseenter', () => dismissTimer && clearTimeout(dismissTimer));
  toastElement.addEventListener('mouseleave', startDismissTimer);
  setTimeout(() => {
    toastElement.textContent = messageText;
    toastElement.classList.add('gjs-db-toast-visible');
  }, 20);
  startDismissTimer();
};

export default showToastNotice;
