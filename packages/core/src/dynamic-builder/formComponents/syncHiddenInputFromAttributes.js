import findFieldControlComponent from './findFieldControlComponent.js';
import sanitizeFieldName from './sanitizeFieldName.js';

const syncHiddenInputFromAttributes = (component) => {
  if (!component || !component.is || !component.is('db-hidden-input')) return;
  const componentAttributes = component.getAttributes();
  const inputComponent = findFieldControlComponent(component);
  if (!inputComponent) return;
  inputComponent.addAttributes({
    name: sanitizeFieldName(componentAttributes['data-db-name'], 'source'),
    value: String(componentAttributes['data-db-value'] == null ? '' : componentAttributes['data-db-value']),
  });
};

export default syncHiddenInputFromAttributes;
