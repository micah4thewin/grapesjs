import walkComponentTree from '../support/walkComponentTree.js';

const collectFormFieldNames = (formComponent, excludedComponent) => {
  const fieldNames = [];
  walkComponentTree(formComponent, (visitedComponent) => {
    if (!visitedComponent || !visitedComponent.get || !visitedComponent.getAttributes) return;
    if (excludedComponent && visitedComponent === excludedComponent) return;
    const tagName = String(visitedComponent.get('tagName') || '').toLowerCase();
    if (['input', 'select', 'textarea'].indexOf(tagName) < 0) return;
    if (visitedComponent.closestType && visitedComponent.closestType('db-honeypot')) return;
    const visitedAttributes = visitedComponent.getAttributes();
    const fieldName = String(visitedAttributes.name || '').trim();
    if (!fieldName || visitedAttributes.type === 'hidden' || fieldNames.indexOf(fieldName) >= 0) return;
    fieldNames.push(fieldName);
  });
  return fieldNames;
};

export default collectFormFieldNames;
