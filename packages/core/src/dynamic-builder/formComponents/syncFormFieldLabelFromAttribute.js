import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import syncTextComponentContent from './syncTextComponentContent.js';

const syncFormFieldLabelFromAttribute = (component) => {
  if (!component || !component.is || !component.is('db-form-field')) return;
  const labelComponent = findDescendantByAttributeName(component, 'data-db-field-label');
  syncTextComponentContent(labelComponent, component.getAttributes()['data-db-label'] || 'Field label');
};

export default syncFormFieldLabelFromAttribute;
