import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import findFieldControlComponent from './findFieldControlComponent.js';

const syncConsentCheckboxFromAttributes = (component) => {
  if (!component || !component.is || !component.is('db-consent-checkbox')) return;
  const componentAttributes = component.getAttributes();
  const inputComponent = findFieldControlComponent(component);
  if (inputComponent) inputComponent.addAttributes({ name: String(componentAttributes['data-db-name'] || 'consent') });
  const linkComponent = findDescendantByAttributeName(component, 'data-db-privacy-link');
  const safeUrl = sanitizeUrlValue(componentAttributes['data-db-privacy-url'] || '');
  if (linkComponent && safeUrl) linkComponent.addAttributes({ href: safeUrl });
};

export default syncConsentCheckboxFromAttributes;
