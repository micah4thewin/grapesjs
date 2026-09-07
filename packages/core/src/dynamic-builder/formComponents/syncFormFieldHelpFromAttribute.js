import escapeHtmlText from '../support/escapeHtmlText.js';
import ensureFieldControlId from './ensureFieldControlId.js';
import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import syncTextComponentContent from './syncTextComponentContent.js';

const syncFormFieldHelpFromAttribute = (component) => {
  if (!component || !component.is || !component.is('db-form-field')) return;
  const helpText = String(component.getAttributes()['data-db-help'] || '').trim();
  const helpComponent = findDescendantByAttributeName(component, 'data-db-field-help');
  if (!helpText && helpComponent) helpComponent.remove();
  else if (helpText && helpComponent) syncTextComponentContent(helpComponent, helpText);
  else if (helpText)
    component.append({
      tagName: 'small',
      classes: ['db-field-help'],
      attributes: { 'data-db-field-help': 'true' },
      draggable: false,
      copyable: false,
      traits: [],
      components: escapeHtmlText(helpText),
    });
  ensureFieldControlId(component);
};

export default syncFormFieldHelpFromAttribute;
