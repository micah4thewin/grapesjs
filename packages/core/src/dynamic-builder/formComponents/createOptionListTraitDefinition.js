import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';
import buildOptionListRowsMarkup from './buildOptionListRowsMarkup.js';
import readOptionListState from './readOptionListState.js';
import resolveOptionEntries from './resolveOptionEntries.js';
import writeOptionEntries from './writeOptionEntries.js';

const readRowIndex = (eventTarget) => {
  const rowElement = eventTarget.closest('[data-db-option-row]');
  return rowElement ? Number(rowElement.getAttribute('data-db-option-row')) : -1;
};

const renderRows = (elInput, component, trait) => {
  const rowsElement = resolveTraitInnerElement(elInput, '[data-db-option-rows]');
  if (!rowsElement || !component) return;
  const componentAttributes = component.getAttributes();
  const optionEntries = resolveOptionEntries(componentAttributes[trait.get('name')]);
  const radioGroupName = 'db-option-default-' + String(component.getId ? component.getId() : 'x');
  rowsElement.innerHTML = buildOptionListRowsMarkup(
    optionEntries,
    String(componentAttributes['data-db-selected'] || ''),
    radioGroupName,
  );
};

const createOptionListTraitDefinition = () => ({
  eventCapture: ['click', 'change', 'input'],
  createInput: ({ trait }) =>
    [
      '<div class="gjs-db-option-list" data-db-option-list>',
      '<div data-db-option-rows></div>',
      '<button type="button" class="gjs-db-button gjs-db-menu-add" data-db-option-add>',
      getIconMarkup('plus', { size: 14 }),
      `<span>${escapeHtmlText(trait.get('addLabel') || 'Add option')}</span>`,
      '</button>',
      '<p class="gjs-db-field-help">Tick the circle to preselect an option. Leave the second box empty to send the label.</p>',
      '</div>',
    ].join(''),
  onEvent: ({ component, trait, elInput, event }) => {
    const eventTarget = event && event.target && event.target.closest ? event.target : null;
    if (!eventTarget || !component) return;
    const attributeName = trait.get('name');
    const listState = readOptionListState(elInput);
    const rowIndex = readRowIndex(eventTarget);
    const moveButton = eventTarget.closest('[data-db-option-move]');
    let shouldRender = true;
    if (eventTarget.closest('[data-db-option-add]')) {
      const nextNumber = listState.optionEntries.length + 1;
      listState.optionEntries.push({ optionLabel: 'Option ' + nextNumber, optionValue: 'Option ' + nextNumber });
    } else if (eventTarget.closest('[data-db-option-remove]') && rowIndex >= 0) {
      listState.optionEntries.splice(rowIndex, 1);
    } else if (moveButton && rowIndex >= 0) {
      const targetIndex = rowIndex + Number(moveButton.getAttribute('data-db-option-move'));
      if (targetIndex < 0 || targetIndex >= listState.optionEntries.length) return;
      const [movedEntry] = listState.optionEntries.splice(rowIndex, 1);
      listState.optionEntries.splice(targetIndex, 0, movedEntry);
    } else if (eventTarget.matches('[data-db-option-field], [data-db-option-default]')) {
      shouldRender = false;
    } else return;
    writeOptionEntries(component, attributeName, listState.optionEntries, listState.selectedValue);
    if (shouldRender) renderRows(elInput, component, trait);
  },
  onUpdate: ({ component, trait, elInput }) => {
    if (elInput && elInput.contains && elInput.contains(document.activeElement)) return;
    renderRows(elInput, component, trait);
  },
});

export default createOptionListTraitDefinition;
