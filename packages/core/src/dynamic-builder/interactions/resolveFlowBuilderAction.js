import createFlowIdentifier from './createFlowIdentifier.js';
import getFlowActionRecords from './getFlowActionRecords.js';

const cardSelector = (flowIndex) => '[data-db-flow-index="' + flowIndex + '"] ';
const stepSelector = (flowIndex, actionIndex) =>
  cardSelector(flowIndex) + '[data-db-flow-action-index="' + actionIndex + '"] [data-db-flow-action-type]';

const swapActions = (actionRecords, fromIndex, toIndex) => {
  const reordered = [...actionRecords];
  const movedRecord = reordered.splice(fromIndex, 1)[0];
  reordered.splice(toIndex, 0, movedRecord);
  return reordered;
};

const resolveFlowBuilderAction = (actionName, flowRecords, positionRecord) => {
  const { flowIndex, actionIndex } = positionRecord;
  const currentFlow = flowRecords[flowIndex];
  if (actionName === 'add') {
    const newFlow = { id: createFlowIdentifier(), trigger: 'click', triggerOptions: {}, actions: [] };
    return {
      flows: [...flowRecords, newFlow],
      focusSelector: cardSelector(flowRecords.length) + '[data-db-flow-trigger]',
    };
  }
  if (!currentFlow) return null;
  if (actionName === 'remove') {
    return {
      flows: flowRecords.filter((flowRecord, recordIndex) => recordIndex !== flowIndex),
      focusSelector: '[data-db-flow-action="add"]',
    };
  }
  if (actionName === 'duplicate') {
    const copiedFlow = {
      ...currentFlow,
      id: createFlowIdentifier(),
      triggerOptions: { ...currentFlow.triggerOptions },
      actions: currentFlow.actions.map((actionRecord) => ({
        type: actionRecord.type,
        options: { ...actionRecord.options },
      })),
    };
    const flows = [...flowRecords.slice(0, flowIndex + 1), copiedFlow, ...flowRecords.slice(flowIndex + 1)];
    return { flows, focusSelector: cardSelector(flowIndex + 1) + '[data-db-flow-trigger]' };
  }
  if (actionName === 'add-step') {
    const nextActions = [...currentFlow.actions, { type: getFlowActionRecords()[0].id, options: {} }];
    flowRecords[flowIndex] = { ...currentFlow, actions: nextActions };
    return { flows: flowRecords, focusSelector: stepSelector(flowIndex, nextActions.length - 1) };
  }
  if (actionIndex === undefined || !currentFlow.actions[actionIndex]) return null;
  if (actionName === 'remove-step') {
    const nextActions = currentFlow.actions.filter((actionRecord, recordIndex) => recordIndex !== actionIndex);
    flowRecords[flowIndex] = { ...currentFlow, actions: nextActions };
    return { flows: flowRecords, focusSelector: cardSelector(flowIndex) + '[data-db-flow-action="add-step"]' };
  }
  if (actionName === 'move-up' || actionName === 'move-down') {
    const targetIndex = actionName === 'move-up' ? actionIndex - 1 : actionIndex + 1;
    if (targetIndex < 0 || targetIndex >= currentFlow.actions.length) return null;
    flowRecords[flowIndex] = { ...currentFlow, actions: swapActions(currentFlow.actions, actionIndex, targetIndex) };
    return { flows: flowRecords, focusSelector: stepSelector(flowIndex, targetIndex) };
  }
  return null;
};

export default resolveFlowBuilderAction;
