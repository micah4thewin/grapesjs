import escapeHtmlText from '../support/escapeHtmlText.js';
import buildRequiredNoteMarkup from './buildRequiredNoteMarkup.js';
import findDescendantByAttributeName from './findDescendantByAttributeName.js';

const syncFormFieldLabelFromAttribute = (component) => {
  if (!component || !component.is || !component.is('db-form-field')) return;
  const componentAttributes = component.getAttributes();
  const labelComponent = findDescendantByAttributeName(component, 'data-db-field-label');
  if (!labelComponent) return;
  const labelText = String(componentAttributes['data-db-label'] || 'Field label');
  const isRequired = componentAttributes['data-db-required'] === 'true';
  labelComponent.components(escapeHtmlText(labelText) + (isRequired ? buildRequiredNoteMarkup() : ''));
};

export default syncFormFieldLabelFromAttribute;
