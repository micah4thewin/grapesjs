const armDeleteConfirmation = (deleteButton) => {
  if (deleteButton.getAttribute('data-db-confirm-armed') === 'true') return true;
  deleteButton.setAttribute('data-db-confirm-armed', 'true');
  const originalText = deleteButton.textContent;
  deleteButton.textContent = 'Really delete?';
  setTimeout(() => {
    if (!deleteButton.isConnected) return;
    deleteButton.removeAttribute('data-db-confirm-armed');
    deleteButton.textContent = originalText;
  }, 4000);
  return false;
};

export default armDeleteConfirmation;
