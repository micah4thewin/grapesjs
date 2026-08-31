import findFieldControlComponent from './findFieldControlComponent.js';
import syncFormFieldLabelFromAttribute from './syncFormFieldLabelFromAttribute.js';

const syncFormFieldRequiredFromAttribute = (component) => {
  if (!component || !component.is || !component.is('db-form-field')) return;
  const isRequired = component.getAttributes()['data-db-required'] === 'true';
  const controlComponent = findFieldControlComponent(component);
  if (controlComponent && isRequired) controlComponent.addAttributes({ required: 'required' });
  if (controlComponent && !isRequired) controlComponent.removeAttributes(['required']);
  syncFormFieldLabelFromAttribute(component);
};

export default syncFormFieldRequiredFromAttribute;
