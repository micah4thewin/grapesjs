const ensureToastHostElement = (containerElement) => {
  const existingHost = containerElement.querySelector('[data-db-toast-host]');
  if (existingHost) return existingHost;
  const toastHost = containerElement.ownerDocument.createElement('div');
  toastHost.setAttribute('data-db-toast-host', 'true');
  toastHost.setAttribute('role', 'status');
  toastHost.setAttribute('aria-live', 'polite');
  toastHost.setAttribute('aria-atomic', 'false');
  toastHost.className = 'gjs-db-toast-host';
  containerElement.appendChild(toastHost);
  return toastHost;
};

export default ensureToastHostElement;
