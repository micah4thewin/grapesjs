import filterPaletteActions from './filterPaletteActions.js';
import renderPaletteListItems from './renderPaletteListItems.js';

const wirePaletteInteractions = (editor, paletteElement, actionRecords) => {
  const inputElement = paletteElement.querySelector('[data-db-palette-input]');
  const listElement = paletteElement.querySelector('[data-db-palette-list]');
  if (!inputElement || !listElement) return;
  const paletteState = { records: actionRecords, activeIndex: 0 };
  const refreshList = () => {
    renderPaletteListItems(listElement, paletteState.records, paletteState.activeIndex);
    const activeDescendantId = paletteState.records.length ? `db-palette-option-${paletteState.activeIndex}` : '';
    inputElement.setAttribute('aria-activedescendant', activeDescendantId);
  };
  const runActionAt = (recordIndex) => {
    const actionRecord = paletteState.records[recordIndex];
    if (!actionRecord) return;
    editor.Modal.close();
    actionRecord.runAction();
  };
  inputElement.addEventListener('input', () => {
    paletteState.records = filterPaletteActions(actionRecords, inputElement.value);
    paletteState.activeIndex = 0;
    refreshList();
  });
  inputElement.addEventListener('keydown', (keyEvent) => {
    const recordCount = paletteState.records.length;
    if (keyEvent.key === 'ArrowDown' && recordCount) {
      keyEvent.preventDefault();
      paletteState.activeIndex = (paletteState.activeIndex + 1) % recordCount;
      refreshList();
    } else if (keyEvent.key === 'ArrowUp' && recordCount) {
      keyEvent.preventDefault();
      paletteState.activeIndex = (paletteState.activeIndex - 1 + recordCount) % recordCount;
      refreshList();
    } else if (keyEvent.key === 'Enter') {
      keyEvent.preventDefault();
      runActionAt(paletteState.activeIndex);
    } else if (keyEvent.key === 'Escape') {
      keyEvent.preventDefault();
      editor.Modal.close();
    }
  });
  listElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const itemElement = targetElement.closest('[data-db-palette-index]');
    if (itemElement) runActionAt(Number(itemElement.getAttribute('data-db-palette-index')));
  });
  refreshList();
};

export default wirePaletteInteractions;
