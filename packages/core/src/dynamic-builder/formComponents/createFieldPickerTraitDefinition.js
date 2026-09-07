import escapeHtmlText from '../support/escapeHtmlText.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';
import writeComponentAttributeValue from '../traits/writeComponentAttributeValue.js';
import collectFormFieldNames from './collectFormFieldNames.js';

const buildFieldOptionsMarkup = (component, currentValue) => {
  const formComponent = component && component.closestType ? component.closestType('db-form') : null;
  const fieldNames = collectFormFieldNames(formComponent, component);
  if (currentValue && fieldNames.indexOf(currentValue) < 0) fieldNames.push(currentValue);
  return ['<option value="">Always show</option>']
    .concat(
      fieldNames.map(
        (fieldName) =>
          `<option value="${escapeHtmlText(fieldName)}"${fieldName === currentValue ? ' selected' : ''}>${escapeHtmlText(fieldName)}</option>`,
      ),
    )
    .join('');
};

const createFieldPickerTraitDefinition = () => ({
  createInput: ({ component, trait }) => {
    const currentValue = String((component && component.getAttributes()[trait.get('name')]) || '');
    return [
      '<div class="gjs-db-field">',
      `<select class="gjs-db-field-input" data-db-field-picker>${buildFieldOptionsMarkup(component, currentValue)}</select>`,
      '</div>',
    ].join('');
  },
  onEvent: ({ elInput, component, trait }) => {
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-field-picker]');
    if (!selectElement) return;
    writeComponentAttributeValue(component, trait.get('name'), selectElement.value);
  },
  onUpdate: ({ elInput, component, trait }) => {
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-field-picker]');
    if (!selectElement) return;
    const currentValue = String((component && component.getAttributes()[trait.get('name')]) || '');
    selectElement.innerHTML = buildFieldOptionsMarkup(component, currentValue);
    selectElement.value = currentValue;
  },
});

export default createFieldPickerTraitDefinition;
