import addNavbarMenuItem from '../interactiveComponents/addNavbarMenuItem.js';
import buildNavbarMenuRowsMarkup from '../interactiveComponents/buildNavbarMenuRowsMarkup.js';
import getIconMarkup from '../support/getIconMarkup.js';
import moveNavbarMenuItem from '../interactiveComponents/moveNavbarMenuItem.js';
import readMenuRowIndex from './readMenuRowIndex.js';
import removeNavbarMenuItem from '../interactiveComponents/removeNavbarMenuItem.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import updateNavbarMenuItemField from '../interactiveComponents/updateNavbarMenuItemField.js';

const createMenuItemsTraitDefinition = () => ({
  noLabel: true,
  eventCapture: ['click', 'change'],
  createInput: ({ component }) =>
    [
      '<div class="gjs-db-menu-items" data-db-menu-items>',
      `<div data-db-menu-rows>${buildNavbarMenuRowsMarkup(component)}</div>`,
      '<button type="button" class="gjs-db-button gjs-db-menu-add" data-db-menu-add>',
      getIconMarkup('plus', { size: 14 }),
      '<span>Add menu item</span>',
      '</button>',
      '</div>',
    ].join(''),
  onEvent: ({ component, elInput, event }) => {
    const eventTarget = event && event.target && event.target.closest ? event.target : null;
    if (!eventTarget || !component) return;
    const rowsElement = resolveTraitInnerElement(elInput, '[data-db-menu-rows]');
    const fieldElement = eventTarget.closest('[data-db-menu-field]');
    if (fieldElement) {
      updateNavbarMenuItemField(
        component,
        readMenuRowIndex(fieldElement),
        fieldElement.getAttribute('data-db-menu-field'),
        fieldElement.value,
      );
      return;
    }
    if (eventTarget.closest('[data-db-menu-add]')) addNavbarMenuItem(component);
    else if (eventTarget.closest('[data-db-menu-remove]'))
      removeNavbarMenuItem(component, readMenuRowIndex(eventTarget));
    else if (eventTarget.closest('[data-db-menu-move]')) {
      moveNavbarMenuItem(
        component,
        readMenuRowIndex(eventTarget),
        Number(eventTarget.closest('[data-db-menu-move]').getAttribute('data-db-menu-move')),
      );
    } else return;
    if (rowsElement) rowsElement.innerHTML = buildNavbarMenuRowsMarkup(component);
  },
});

export default createMenuItemsTraitDefinition;
