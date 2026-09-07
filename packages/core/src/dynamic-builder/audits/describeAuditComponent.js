import collectComponentPlainText from '../schema/collectComponentPlainText.js';
import truncateAuditSnippet from './truncateAuditSnippet.js';

const describeAuditComponent = (component) => {
  if (!component || !component.get) return 'element';
  const componentName = component.getName ? String(component.getName() || '').trim() : '';
  const typeLabel = componentName || String(component.get('tagName') || 'element');
  const componentAttributes = component.getAttributes ? component.getAttributes() : {};
  const readAttribute = (attributeName) => String(componentAttributes[attributeName] || '').trim();
  const snippetText = truncateAuditSnippet(
    collectComponentPlainText(component) || readAttribute('aria-label') || readAttribute('alt'),
  );
  return snippetText ? typeLabel + ' "' + snippetText + '"' : typeLabel;
};

export default describeAuditComponent;
