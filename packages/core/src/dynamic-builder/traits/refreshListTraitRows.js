import captureListFocusSnapshot from './captureListFocusSnapshot.js';
import restoreListFocusSnapshot from './restoreListFocusSnapshot.js';

const refreshListTraitRows = (trait, buildRowsMarkup) => {
  const wrapperElement = trait && trait.el;
  if (!wrapperElement || !wrapperElement.querySelector || !wrapperElement.isConnected) return false;
  const rowsElement = wrapperElement.querySelector('[data-db-list-rows]');
  if (!rowsElement) return false;
  const nextMarkup = buildRowsMarkup();
  if (rowsElement.dbLastMarkup === nextMarkup) {
    delete trait.dbPendingFocus;
    return false;
  }
  const focusSnapshot = trait.dbPendingFocus || captureListFocusSnapshot(rowsElement);
  delete trait.dbPendingFocus;
  rowsElement.innerHTML = nextMarkup;
  rowsElement.dbLastMarkup = nextMarkup;
  const countElement = wrapperElement.querySelector('[data-db-list-count]');
  if (countElement) countElement.textContent = String(rowsElement.querySelectorAll('[data-db-menu-row]').length);
  restoreListFocusSnapshot(wrapperElement, focusSnapshot);
  return true;
};

export default refreshListTraitRows;
