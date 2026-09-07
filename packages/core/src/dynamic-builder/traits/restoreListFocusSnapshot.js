const restoreListFocusSnapshot = (wrapperElement, focusSnapshot) => {
  if (!focusSnapshot || !wrapperElement || !wrapperElement.querySelectorAll) return;
  const rowElements = [...wrapperElement.querySelectorAll('[data-db-menu-row]')];
  let focusTarget = null;
  if (rowElements.length) {
    const rowElement = rowElements[Math.max(0, Math.min(focusSnapshot.rowIndex, rowElements.length - 1))];
    focusTarget =
      (focusSnapshot.selector && rowElement.querySelector(`${focusSnapshot.selector}:not([hidden]):not([disabled])`)) ||
      rowElement.querySelector('input:not([hidden]), select:not([hidden]), button:not([disabled])');
  } else focusTarget = wrapperElement.querySelector('[data-db-list-add]');
  if (!focusTarget || typeof focusTarget.focus !== 'function') return;
  focusTarget.focus();
  if (focusSnapshot.selectionStart !== null && typeof focusTarget.setSelectionRange === 'function') {
    try {
      focusTarget.setSelectionRange(focusSnapshot.selectionStart, focusSnapshot.selectionStart);
    } catch (selectionError) {
      return;
    }
  }
};

export default restoreListFocusSnapshot;
