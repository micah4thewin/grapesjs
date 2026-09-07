const toggleSiteCardRow = (cardElement, rowName, isVisible) => {
  const rowElement = cardElement.querySelector('[data-db-site-row="' + rowName + '"]');
  if (!rowElement) return false;
  rowElement.hidden = !isVisible;
  if (!isVisible) return true;
  const focusTarget = rowElement.querySelector('input, button');
  if (focusTarget && typeof focusTarget.focus === 'function') focusTarget.focus();
  return true;
};

export default toggleSiteCardRow;
