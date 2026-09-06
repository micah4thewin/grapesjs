import getIconMarkup from '../support/getIconMarkup.js';
import openIconPickerModal from '../icons/openIconPickerModal.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import splitIconNameWords from '../icons/splitIconNameWords.js';

const createIconPickerTraitDefinition = (editor) => ({
  eventCapture: ['click'],
  createInput: () =>
    [
      '<div class="gjs-db-field gjs-db-trait-icon">',
      '<span class="gjs-db-trait-icon-preview" data-db-icon-preview></span>',
      '<button type="button" class="gjs-db-button gjs-db-trait-icon-choose" data-db-icon-open>',
      '<span data-db-icon-current>Choose icon</span>',
      getIconMarkup('search', { size: 14 }),
      '</button>',
      '</div>',
    ].join(''),
  onEvent: ({ trait, event }) => {
    const eventTarget = event && event.target;
    if (!eventTarget || !eventTarget.closest || !eventTarget.closest('[data-db-icon-open]')) return;
    openIconPickerModal(editor, String(trait.getValue() || ''), (chosenIconName) => trait.set('value', chosenIconName));
  },
  onUpdate: ({ trait, elInput }) => {
    const iconName = String(trait.getValue() || '');
    const previewElement = resolveTraitInnerElement(elInput, '[data-db-icon-preview]');
    const labelElement = resolveTraitInnerElement(elInput, '[data-db-icon-current]');
    if (previewElement) previewElement.innerHTML = iconName ? getIconMarkup(iconName, { size: 20 }) : '';
    if (labelElement) labelElement.textContent = iconName ? splitIconNameWords(iconName) : 'Choose icon';
  },
});

export default createIconPickerTraitDefinition;
