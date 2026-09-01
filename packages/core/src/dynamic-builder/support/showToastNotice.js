const showToastNotice = (editor, messageText, options = {}) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const ownerDocument = containerElement.ownerDocument;
  let toastHost = containerElement.querySelector('[data-db-toast-host]');
  if (!toastHost) {
    toastHost = ownerDocument.createElement('div');
    toastHost.setAttribute('data-db-toast-host', 'true');
    toastHost.className = 'gjs-db-toast-host';
    containerElement.appendChild(toastHost);
  }
  const toastElement = ownerDocument.createElement('div');
  toastElement.className = `gjs-db-toast${options.kind ? ` gjs-db-toast-${options.kind}` : ''}`;
  toastElement.setAttribute('role', 'status');
  toastElement.textContent = messageText;
  toastHost.appendChild(toastElement);
  setTimeout(() => toastElement.classList.add('gjs-db-toast-visible'), 20);
  setTimeout(() => {
    toastElement.classList.remove('gjs-db-toast-visible');
    setTimeout(() => toastElement.remove(), 320);
  }, options.duration || 3200);
};

export default showToastNotice;
