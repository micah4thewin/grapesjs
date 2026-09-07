import evaluateConditionRecord from './evaluateConditionRecord.js';
import parseConditionAttribute from './parseConditionAttribute.js';

const applyConditionStatesInElement = (rootElement, resolveContext) => {
  if (!rootElement || !rootElement.querySelectorAll) return;
  const conditionalElements = [rootElement, ...Array.from(rootElement.querySelectorAll('[data-db-condition]'))];
  conditionalElements.forEach((conditionalElement) => {
    if (!conditionalElement.hasAttribute || !conditionalElement.hasAttribute('data-db-condition')) return;
    const conditionRecord = parseConditionAttribute(conditionalElement.getAttribute('data-db-condition'));
    const contextRegistry = resolveContext(conditionalElement);
    const isShown = !conditionRecord || !contextRegistry || evaluateConditionRecord(contextRegistry, conditionRecord);
    conditionalElement.setAttribute('data-db-condition-state', isShown ? 'shown' : 'hidden');
  });
};

export default applyConditionStatesInElement;
