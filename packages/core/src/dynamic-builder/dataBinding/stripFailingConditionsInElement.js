import evaluateConditionRecord from './evaluateConditionRecord.js';
import parseConditionAttribute from './parseConditionAttribute.js';

const stripFailingConditionsInElement = (registry, rootElement) => {
  if (!rootElement || !rootElement.querySelectorAll) return true;
  const conditionalElements = [rootElement, ...Array.from(rootElement.querySelectorAll('[data-db-condition]'))];
  let rootKept = true;
  conditionalElements.forEach((conditionalElement) => {
    if (!conditionalElement.hasAttribute('data-db-condition')) return;
    const conditionRecord = parseConditionAttribute(conditionalElement.getAttribute('data-db-condition'));
    if (conditionRecord && !evaluateConditionRecord(registry, conditionRecord)) {
      if (conditionalElement === rootElement) rootKept = false;
      conditionalElement.remove();
      return;
    }
    conditionalElement.removeAttribute('data-db-condition');
  });
  return rootKept;
};

export default stripFailingConditionsInElement;
