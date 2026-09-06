import appendListItemMarkup from '../support/appendListItemMarkup.js';
import buildNavbarMenuRowsMarkup from '../interactiveComponents/buildNavbarMenuRowsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import moveListItemAt from '../support/moveListItemAt.js';
import readMenuRowIndex from './readMenuRowIndex.js';
import removeListItemAt from '../support/removeListItemAt.js';
import resolveMenuTraitSettings from './resolveMenuTraitSettings.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import updateListItemField from '../support/updateListItemField.js';

const createMenuItemsTraitDefinition = () => ({
  noLabel: true,
  eventCapture: ['click', 'change'],
  createInput: ({ component, trait }) => {
    const settings = resolveMenuTraitSettings(trait);
    return [
      '<div class="gjs-db-menu-items" data-db-menu-items>',
      `<div data-db-menu-rows>${buildNavbarMenuRowsMarkup(component, settings.listSelector, settings.emptyMessage)}</div>`,
      '<button type="button" class="gjs-db-button gjs-db-menu-add" data-db-menu-add>',
      getIconMarkup('plus', { size: 14 }),
      `<span>${escapeHtmlText(settings.addLabel)}</span>`,
      '</button>',
      '</div>',
    ].join('');
  },
  onEvent: ({ component, trait, elInput, event }) => {
    const eventTarget = event && event.target && event.target.closest ? event.target : null;
    if (!eventTarget || !component) return;
    const settings = resolveMenuTraitSettings(trait);
    const fieldElement = eventTarget.closest('[data-db-menu-field]');
    if (fieldElement) {
      const fieldName = fieldElement.getAttribute('data-db-menu-field');
      updateListItemField(
        component,
        settings.listSelector,
        readMenuRowIndex(fieldElement),
        fieldName,
        fieldElement.value,
      );
      return;
    }
    const moveButton = eventTarget.closest('[data-db-menu-move]');
    if (eventTarget.closest('[data-db-menu-add]')) {
      appendListItemMarkup(component, settings.listSelector, settings.itemMarkup);
    } else if (eventTarget.closest('[data-db-menu-remove]')) {
      removeListItemAt(component, settings.listSelector, readMenuRowIndex(eventTarget));
    } else if (moveButton) {
      moveListItemAt(
        component,
        settings.listSelector,
        readMenuRowIndex(eventTarget),
        Number(moveButton.getAttribute('data-db-menu-move')),
      );
    } else return;
    const rowsElement = resolveTraitInnerElement(elInput, '[data-db-menu-rows]');
    if (rowsElement) {
      rowsElement.innerHTML = buildNavbarMenuRowsMarkup(component, settings.listSelector, settings.emptyMessage);
    }
  },
});

export default createMenuItemsTraitDefinition;
