import escapeHtmlText from '../support/escapeHtmlText.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import findFieldControlComponent from './findFieldControlComponent.js';
import sanitizeFieldName from './sanitizeFieldName.js';

const syncConsentCheckboxFromAttributes = (component) => {
  if (!component || !component.is || !component.is('db-consent-checkbox')) return;
  const componentAttributes = component.getAttributes();
  const inputComponent = findFieldControlComponent(component);
  if (inputComponent) {
    inputComponent.addAttributes({ name: sanitizeFieldName(componentAttributes['data-db-name'], 'consent') });
    if (componentAttributes['data-db-required'] === 'false') inputComponent.removeAttributes(['required']);
    else inputComponent.addAttributes({ required: 'required' });
  }
  const textComponent = findDescendantByAttributeName(component, 'data-db-consent-text');
  if (!textComponent) return;
  const safeUrl = sanitizeUrlValue(componentAttributes['data-db-privacy-url'] || '') || '#';
  const introText = String(componentAttributes['data-db-consent-text'] || 'I agree to the').trim();
  const linkText = String(componentAttributes['data-db-link-text'] || 'privacy policy').trim();
  textComponent.components(
    escapeHtmlText(introText) +
      ' <a data-db-privacy-link="true" href="' +
      escapeHtmlText(safeUrl) +
      '" target="_blank" rel="noopener">' +
      escapeHtmlText(linkText) +
      '</a>',
  );
};

export default syncConsentCheckboxFromAttributes;
