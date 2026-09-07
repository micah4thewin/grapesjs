import appendListItemMarkup from '../support/appendListItemMarkup.js';
import collectListRowRecords from './collectListRowRecords.js';
import moveListItemAt from '../support/moveListItemAt.js';
import readMenuRowIndex from './readMenuRowIndex.js';
import removeListItemAt from '../support/removeListItemAt.js';

const handleListRowAction = (trait, rootComponent, listSelector, eventTarget, actionSettings) => {
  const settings = actionSettings || {};
  if (eventTarget.closest('[data-db-list-add]')) {
    const nextIndex = collectListRowRecords(rootComponent, listSelector).length;
    appendListItemMarkup(rootComponent, listSelector, settings.itemMarkup);
    trait.dbPendingFocus = { rowIndex: nextIndex, selector: settings.firstFieldSelector, selectionStart: null };
    return true;
  }
  const rowIndex = readMenuRowIndex(eventTarget);
  if (rowIndex < 0) return false;
  if (eventTarget.closest('[data-db-menu-remove]')) {
    removeListItemAt(rootComponent, listSelector, rowIndex);
    trait.dbPendingFocus = { rowIndex, selector: '[data-db-menu-remove]', selectionStart: null };
    return true;
  }
  const moveButton = eventTarget.closest('[data-db-menu-move]');
  if (!moveButton) return false;
  const moveOffset = Number(moveButton.getAttribute('data-db-menu-move'));
  moveListItemAt(rootComponent, listSelector, rowIndex, moveOffset);
  trait.dbPendingFocus = {
    rowIndex: rowIndex + moveOffset,
    selector: `[data-db-menu-move="${moveOffset}"]`,
    selectionStart: null,
  };
  return true;
};

export default handleListRowAction;
