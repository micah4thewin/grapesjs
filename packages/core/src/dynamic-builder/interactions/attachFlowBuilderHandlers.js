import buildFlowFromRecipe from './buildFlowFromRecipe.js';
import collectFlowsFromForm from './collectFlowsFromForm.js';
import normalizeFlowRecord from './normalizeFlowRecord.js';
import resolveFlowBuilderAction from './resolveFlowBuilderAction.js';
import resolveFlowControlSelector from './resolveFlowControlSelector.js';

const readIndexAttribute = (element, selector, attributeName) => {
  const scopeElement = element.closest(selector);
  return scopeElement ? Number(scopeElement.getAttribute(attributeName)) : undefined;
};

const attachFlowBuilderHandlers = (formElement, callbackRecords) => {
  const readCurrentFlows = () => collectFlowsFromForm(formElement).map(normalizeFlowRecord).filter(Boolean);
  formElement.addEventListener('change', (changeEvent) => {
    const changedElement = changeEvent.target;
    callbackRecords.onDirty();
    if (changedElement.matches('[data-db-flow-recipe]')) {
      const recipeFlow = buildFlowFromRecipe(changedElement.value);
      if (!recipeFlow) return;
      const currentFlows = readCurrentFlows();
      const focusSelector = '[data-db-flow-index="' + currentFlows.length + '"] [data-db-flow-trigger]';
      callbackRecords.onRerender([...currentFlows, recipeFlow], focusSelector);
      return;
    }
    if (!changedElement.matches('[data-db-flow-trigger], [data-db-flow-action-type]')) return;
    callbackRecords.onRerender(readCurrentFlows(), resolveFlowControlSelector(changedElement));
  });
  formElement.addEventListener('input', () => callbackRecords.onDirty());
  formElement.addEventListener('click', (clickEvent) => {
    const actionElement = clickEvent.target.closest('[data-db-flow-action]');
    if (!actionElement) return;
    clickEvent.preventDefault();
    const actionName = actionElement.getAttribute('data-db-flow-action');
    const currentFlows = readCurrentFlows();
    const positionRecord = {
      flowIndex: readIndexAttribute(actionElement, '[data-db-flow-index]', 'data-db-flow-index'),
      actionIndex: readIndexAttribute(actionElement, '[data-db-flow-action-index]', 'data-db-flow-action-index'),
    };
    if (actionName === 'save') return callbackRecords.onSave(currentFlows);
    if (actionName === 'cancel') return callbackRecords.onCancel();
    if (actionName === 'test') return callbackRecords.onTest(currentFlows, positionRecord.flowIndex);
    if (actionName === 'pick') {
      const inputElement = actionElement
        .closest('.gjs-db-flow-field-target')
        .querySelector('[data-db-flow-target-input]');
      return callbackRecords.onPick(currentFlows, {
        fieldScope: inputElement.getAttribute('data-db-flow-scope'),
        fieldName: inputElement.getAttribute('data-db-flow-field'),
      });
    }
    const outcome = resolveFlowBuilderAction(actionName, currentFlows, positionRecord);
    if (!outcome) return undefined;
    callbackRecords.onDirty();
    return callbackRecords.onRerender(outcome.flows, outcome.focusSelector);
  });
};

export default attachFlowBuilderHandlers;
