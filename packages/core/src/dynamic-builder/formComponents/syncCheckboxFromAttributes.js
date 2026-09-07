import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import findFieldControlComponent from './findFieldControlComponent.js';
import sanitizeFieldName from './sanitizeFieldName.js';
import syncTextComponentContent from './syncTextComponentContent.js';

const syncCheckboxFromAttributes = (component) => {
  if (!component || !component.is || !component.is('db-checkbox')) return;
  const componentAttributes = component.getAttributes();
  const inputComponent = findFieldControlComponent(component);
  if (inputComponent) {
    inputComponent.addAttributes({
      name: sanitizeFieldName(componentAttributes['data-db-name'], 'option'),
      value: String(componentAttributes['data-db-value'] || 'yes'),
    });
    if (componentAttributes['data-db-required'] === 'true') inputComponent.addAttributes({ required: 'required' });
    else inputComponent.removeAttributes(['required']);
  }
  const textComponent = findDescendantByAttributeName(component, 'data-db-choice-text');
  syncTextComponentContent(textComponent, componentAttributes['data-db-label'] || 'Checkbox label');
};

export default syncCheckboxFromAttributes;
