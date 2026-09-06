import appendListItemMarkup from '../support/appendListItemMarkup.js';
import applySocialNetworkChoice from '../interactiveComponents/applySocialNetworkChoice.js';
import buildSocialLinkItemMarkup from '../interactiveComponents/buildSocialLinkItemMarkup.js';
import buildSocialRowsMarkup from '../interactiveComponents/buildSocialRowsMarkup.js';
import getIconMarkup from '../support/getIconMarkup.js';
import moveListItemAt from '../support/moveListItemAt.js';
import readMenuRowIndex from './readMenuRowIndex.js';
import removeListItemAt from '../support/removeListItemAt.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import updateListItemField from '../support/updateListItemField.js';

const createSocialProfilesTraitDefinition = () => ({
  noLabel: true,
  eventCapture: ['click', 'change'],
  createInput: ({ component }) =>
    [
      '<div class="gjs-db-menu-items" data-db-social-items>',
      `<div data-db-social-rows>${buildSocialRowsMarkup(component)}</div>`,
      '<button type="button" class="gjs-db-button gjs-db-menu-add" data-db-social-add>',
      getIconMarkup('plus', { size: 14 }),
      '<span>Add profile</span>',
      '</button>',
      '</div>',
    ].join(''),
  onEvent: ({ component, elInput, event }) => {
    const eventTarget = event && event.target && event.target.closest ? event.target : null;
    if (!eventTarget || !component) return;
    const fieldElement = eventTarget.closest('[data-db-social-field]');
    if (fieldElement) {
      const rowIndex = readMenuRowIndex(fieldElement);
      if (fieldElement.getAttribute('data-db-social-field') === 'network') {
        applySocialNetworkChoice(component, rowIndex, fieldElement.value);
      } else {
        updateListItemField(component, '', rowIndex, 'href', fieldElement.value);
        return;
      }
    } else if (eventTarget.closest('[data-db-social-add]')) {
      appendListItemMarkup(component, '', buildSocialLinkItemMarkup('website'));
    } else if (eventTarget.closest('[data-db-menu-remove]')) {
      removeListItemAt(component, '', readMenuRowIndex(eventTarget));
    } else if (eventTarget.closest('[data-db-menu-move]')) {
      const moveButton = eventTarget.closest('[data-db-menu-move]');
      moveListItemAt(
        component,
        '',
        readMenuRowIndex(eventTarget),
        Number(moveButton.getAttribute('data-db-menu-move')),
      );
    } else return;
    const rowsElement = resolveTraitInnerElement(elInput, '[data-db-social-rows]');
    if (rowsElement) rowsElement.innerHTML = buildSocialRowsMarkup(component);
  },
});

export default createSocialProfilesTraitDefinition;
