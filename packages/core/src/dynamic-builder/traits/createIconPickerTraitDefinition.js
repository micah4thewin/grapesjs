import buildTraitAriaLabelAttribute from './buildTraitAriaLabelAttribute.js';
import getIconMarkup from '../support/getIconMarkup.js';
import openIconPickerModal from '../icons/openIconPickerModal.js';
import refreshTraitView from './refreshTraitView.js';
import renderIconTraitPreview from './renderIconTraitPreview.js';
import writeComponentAttributeValue from './writeComponentAttributeValue.js';

const readStoredIconName = (trait, component) => {
  const attributeRecord = component && component.getAttributes ? component.getAttributes() : {};
  return String(attributeRecord[trait.get('name')] || trait.getValue() || '');
};

const createIconPickerTraitDefinition = (editor) => ({
  eventCapture: ['click'],
  createInput: ({ trait }) =>
    [
      '<div class="gjs-db-field gjs-db-trait-icon">',
      '<span class="gjs-db-trait-icon-preview" data-db-icon-preview aria-hidden="true"></span>',
      `<button type="button" class="gjs-db-button gjs-db-trait-icon-choose" data-db-icon-open${buildTraitAriaLabelAttribute(trait, '- choose icon')}>`,
      '<span data-db-icon-current>Choose icon</span>',
      getIconMarkup('search', { size: 14 }),
      '</button>',
      '</div>',
    ].join(''),
  onEvent: ({ trait, component, event }) => {
    const eventTarget = event && event.target;
    if (!eventTarget || !eventTarget.closest || !eventTarget.closest('[data-db-icon-open]')) return;
    openIconPickerModal(editor, readStoredIconName(trait, component), (chosenIconName) => {
      if (!chosenIconName) return;
      writeComponentAttributeValue(component, trait.get('name'), chosenIconName);
      trait.set('value', chosenIconName);
      refreshTraitView(trait);
    });
  },
  onUpdate: ({ trait, component, elInput }) => {
    renderIconTraitPreview(elInput, readStoredIconName(trait, component));
  },
});

export default createIconPickerTraitDefinition;
