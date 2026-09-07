import buildPaletteViewRecords from './buildPaletteViewRecords.js';
import readRecentPaletteActionIds from './readRecentPaletteActionIds.js';
import recordRecentPaletteAction from './recordRecentPaletteAction.js';
import renderPaletteListItems from './renderPaletteListItems.js';
import resolvePaletteNavigationIndex from './resolvePaletteNavigationIndex.js';
import updatePaletteActiveItem from './updatePaletteActiveItem.js';

const wirePaletteInteractions = (editor, paletteElement, actionRecords, instanceSuffix) => {
  const inputElement = paletteElement.querySelector('[data-db-palette-input]');
  const listElement = paletteElement.querySelector('[data-db-palette-list]');
  if (!inputElement || !listElement) return;
  const optionIdPrefix = 'db-palette-option' + (instanceSuffix || '') + '-';
  const recentActionIds = readRecentPaletteActionIds();
  const paletteState = { records: [], activeIndex: 0, showGroupHeadings: true, pointerPosition: '' };
  const syncActiveDescendant = () => {
    const activeDescendantId = paletteState.records.length ? optionIdPrefix + paletteState.activeIndex : '';
    inputElement.setAttribute('aria-activedescendant', activeDescendantId);
  };
  const setActiveIndex = (nextIndex, shouldScroll) => {
    paletteState.activeIndex = nextIndex;
    updatePaletteActiveItem(listElement, nextIndex, shouldScroll);
    syncActiveDescendant();
  };
  const rebuildRecords = () => {
    const viewRecord = buildPaletteViewRecords(actionRecords, inputElement.value, recentActionIds);
    paletteState.records = viewRecord.records;
    paletteState.showGroupHeadings = viewRecord.showGroupHeadings;
    paletteState.activeIndex = 0;
    renderPaletteListItems(listElement, paletteState.records, 0, instanceSuffix, paletteState.showGroupHeadings);
    syncActiveDescendant();
  };
  const runActionAt = (recordIndex) => {
    const actionRecord = paletteState.records[recordIndex];
    if (!actionRecord) return;
    recordRecentPaletteAction(actionRecord.actionId);
    editor.Modal.close();
    actionRecord.runAction();
  };
  inputElement.addEventListener('input', rebuildRecords);
  inputElement.addEventListener('keydown', (keyEvent) => {
    const nextIndex = resolvePaletteNavigationIndex(
      keyEvent.key,
      paletteState.activeIndex,
      paletteState.records.length,
    );
    if (nextIndex >= 0) {
      keyEvent.preventDefault();
      setActiveIndex(nextIndex, true);
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
  listElement.addEventListener('pointermove', (pointerEvent) => {
    const targetElement = pointerEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const pointerPosition = `${pointerEvent.clientX || 0}:${pointerEvent.clientY || 0}`;
    if (pointerPosition === paletteState.pointerPosition) return;
    paletteState.pointerPosition = pointerPosition;
    const itemElement = targetElement.closest('[data-db-palette-index]');
    if (!itemElement) return;
    const hoveredIndex = Number(itemElement.getAttribute('data-db-palette-index'));
    if (hoveredIndex !== paletteState.activeIndex) setActiveIndex(hoveredIndex, false);
  });
  rebuildRecords();
};

export default wirePaletteInteractions;
