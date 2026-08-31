import escapeHtmlText from '../support/escapeHtmlText.js';
import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import findFieldControlComponent from './findFieldControlComponent.js';

const syncCheckboxFromAttributes = (component) => {
  if (!component || !component.is || !component.is('db-checkbox')) return;
  const componentAttributes = component.getAttributes();
  const inputComponent = findFieldControlComponent(component);
  if (inputComponent) {
    inputComponent.addAttributes({
      name: String(componentAttributes['data-db-name'] || 'option'),
      value: String(componentAttributes['data-db-value'] || 'yes'),
    });
    if (componentAttributes['data-db-required'] === 'true') inputComponent.addAttributes({ required: 'required' });
    else inputComponent.removeAttributes(['required']);
  }
  const textComponent = findDescendantByAttributeName(component, 'data-db-choice-text');
  if (textComponent) textComponent.components(escapeHtmlText(componentAttributes['data-db-label'] || 'Checkbox label'));
};

export default syncCheckboxFromAttributes;
