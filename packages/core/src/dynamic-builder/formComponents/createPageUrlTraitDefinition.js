import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import markTraitInputValidity from '../traits/markTraitInputValidity.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';
import writeComponentAttributeValue from '../traits/writeComponentAttributeValue.js';
import buildPageChoiceOptionsMarkup from './buildPageChoiceOptionsMarkup.js';

const readStoredValue = (component, trait) =>
  String((component && component.getAttributes && component.getAttributes()[trait.get('name')]) || '');

const createPageUrlTraitDefinition = (editor) => ({
  eventCapture: ['change', 'input'],
  createInput: ({ component, trait }) => {
    const currentValue = readStoredValue(component, trait);
    return [
      '<div class="gjs-db-field gjs-db-page-url">',
      `<select class="gjs-db-field-input" data-db-page-choice>${buildPageChoiceOptionsMarkup(editor, currentValue)}</select>`,
      '<input type="text" class="gjs-db-field-input" data-db-page-custom inputmode="url" placeholder="https://example.com/privacy" hidden>',
      '</div>',
    ].join('');
  },
  onEvent: ({ component, elInput, trait, event }) => {
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-page-choice]');
    const customElement = resolveTraitInnerElement(elInput, '[data-db-page-custom]');
    if (!selectElement || !customElement) return;
    const isCustom = selectElement.value === '__custom__';
    customElement.hidden = !isCustom;
    if (event && event.target === selectElement && !isCustom) {
      writeComponentAttributeValue(component, trait.get('name'), selectElement.value);
      return;
    }
    if (!isCustom) return;
    const rawValue = String(customElement.value || '').trim();
    const safeValue = sanitizeUrlValue(rawValue);
    markTraitInputValidity(
      customElement,
      !rawValue || Boolean(safeValue),
      'Rejected as unsafe: this url will not be saved',
    );
    if (!rawValue || safeValue) writeComponentAttributeValue(component, trait.get('name'), safeValue);
  },
  onUpdate: ({ component, elInput, trait }) => {
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-page-choice]');
    const customElement = resolveTraitInnerElement(elInput, '[data-db-page-custom]');
    if (!selectElement || !customElement) return;
    const currentValue = readStoredValue(component, trait);
    selectElement.innerHTML = buildPageChoiceOptionsMarkup(editor, currentValue);
    const isCustom = selectElement.value === '__custom__';
    customElement.hidden = !isCustom;
    if (isCustom && customElement.value !== currentValue) customElement.value = currentValue;
  },
});

export default createPageUrlTraitDefinition;
