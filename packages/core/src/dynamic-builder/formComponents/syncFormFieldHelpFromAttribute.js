import escapeHtmlText from '../support/escapeHtmlText.js';
import findDescendantByAttributeName from './findDescendantByAttributeName.js';

const syncFormFieldHelpFromAttribute = (component) => {
  if (!component || !component.is || !component.is('db-form-field')) return;
  const helpText = String(component.getAttributes()['data-db-help'] || '').trim();
  const helpComponent = findDescendantByAttributeName(component, 'data-db-field-help');
  if (!helpText) {
    if (helpComponent) helpComponent.remove();
    return;
  }
  if (helpComponent) {
    helpComponent.components(escapeHtmlText(helpText));
    return;
  }
  component.append('<small class="db-field-help" data-db-field-help="true">' + escapeHtmlText(helpText) + '</small>');
};

export default syncFormFieldHelpFromAttribute;
