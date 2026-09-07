import findFieldControlComponent from './findFieldControlComponent.js';

const syncFormFieldRequiredFromAttribute = (component) => {
  if (!component || !component.is || !component.is('db-form-field')) return;
  const isRequired = component.getAttributes()['data-db-required'] === 'true';
  const controlComponent = findFieldControlComponent(component);
  if (!controlComponent) return;
  if (isRequired) controlComponent.addAttributes({ required: 'required', 'aria-required': 'true' });
  else controlComponent.removeAttributes(['required', 'aria-required']);
};

export default syncFormFieldRequiredFromAttribute;
