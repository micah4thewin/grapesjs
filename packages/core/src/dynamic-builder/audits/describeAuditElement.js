import getAuditTagLabelRecords from './getAuditTagLabelRecords.js';
import resolveAuditElementComponent from './resolveAuditElementComponent.js';
import resolveAuditElementSnippet from './resolveAuditElementSnippet.js';

const describeAuditElement = (element) => {
  if (!element || !element.tagName) return 'element';
  const tagName = String(element.tagName).toLowerCase();
  const component = resolveAuditElementComponent(element);
  const componentName = component && component.getName ? String(component.getName() || '').trim() : '';
  const typeLabel = componentName || getAuditTagLabelRecords()[tagName] || tagName;
  const snippetText = resolveAuditElementSnippet(element);
  return snippetText ? typeLabel + ' "' + snippetText + '"' : typeLabel;
};

export default describeAuditElement;
