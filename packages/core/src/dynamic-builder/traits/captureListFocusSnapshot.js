const resolveFocusSelector = (activeElement) => {
  const fieldName = activeElement.getAttribute('data-db-menu-field');
  if (fieldName) return `[data-db-menu-field="${fieldName}"]`;
  const moveOffset = activeElement.getAttribute('data-db-menu-move');
  if (moveOffset) return `[data-db-menu-move="${moveOffset}"]`;
  if (activeElement.hasAttribute('data-db-menu-remove')) return '[data-db-menu-remove]';
  return 'input, select, button';
};

const captureListFocusSnapshot = (rowsElement) => {
  const ownerDocument = rowsElement && rowsElement.ownerDocument;
  const activeElement = ownerDocument && ownerDocument.activeElement;
  if (!activeElement || !rowsElement.contains(activeElement)) return null;
  const rowElement = activeElement.closest ? activeElement.closest('[data-db-menu-row]') : null;
  if (!rowElement) return null;
  return {
    rowIndex: Number(rowElement.getAttribute('data-db-menu-row')) || 0,
    selector: resolveFocusSelector(activeElement),
    selectionStart: typeof activeElement.selectionStart === 'number' ? activeElement.selectionStart : null,
  };
};

export default captureListFocusSnapshot;
