const confirmationTimeout = 5000;

const armSymbolDeleteConfirmation = (actionElement) => {
  const originalMarkup = actionElement.innerHTML;
  const originalLabel = actionElement.getAttribute('aria-label') || '';
  actionElement.setAttribute('data-db-symbol-confirm', 'true');
  actionElement.classList.add('gjs-db-button-danger', 'gjs-db-symbol-action-confirm');
  actionElement.textContent = 'Confirm delete';
  actionElement.setAttribute('aria-label', 'Confirm delete');
  actionElement.setAttribute('title', 'Removes it from every page');
  setTimeout(() => {
    if (!actionElement.isConnected) return;
    actionElement.removeAttribute('data-db-symbol-confirm');
    actionElement.classList.remove('gjs-db-button-danger', 'gjs-db-symbol-action-confirm');
    actionElement.innerHTML = originalMarkup;
    actionElement.setAttribute('aria-label', originalLabel);
    actionElement.setAttribute('title', 'Delete');
  }, confirmationTimeout);
};

export default armSymbolDeleteConfirmation;
