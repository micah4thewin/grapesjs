import collectFlowsFromForm from './collectFlowsFromForm.js';
import createFlowIdentifier from './createFlowIdentifier.js';
import getFlowActionRecords from './getFlowActionRecords.js';
import normalizeFlowRecord from './normalizeFlowRecord.js';

const attachFlowBuilderHandlers = (formElement, callbackRecords) => {
  const readCurrentFlows = () => collectFlowsFromForm(formElement).map(normalizeFlowRecord).filter(Boolean);
  const rerenderWith = (flowRecords) => callbackRecords.onRerender(flowRecords);
  formElement.addEventListener('change', (changeEvent) => {
    if (!changeEvent.target.matches('[data-db-flow-trigger], [data-db-flow-action-type]')) return;
    rerenderWith(readCurrentFlows());
  });
  formElement.addEventListener('click', (clickEvent) => {
    const actionElement = clickEvent.target.closest(
      '[data-db-flow-add], [data-db-flow-save], [data-db-flow-remove], [data-db-flow-add-action],' +
        ' [data-db-flow-remove-action]',
    );
    if (!actionElement) return;
    clickEvent.preventDefault();
    const currentFlows = readCurrentFlows();
    if (actionElement.hasAttribute('data-db-flow-save')) {
      callbackRecords.onSave(currentFlows);
      return;
    }
    if (actionElement.hasAttribute('data-db-flow-add')) {
      rerenderWith([
        ...currentFlows,
        { id: createFlowIdentifier(), trigger: 'click', triggerOptions: {}, actions: [] },
      ]);
      return;
    }
    const cardElement = actionElement.closest('[data-db-flow-index]');
    if (!cardElement) return;
    const flowIndex = Number(cardElement.getAttribute('data-db-flow-index'));
    if (actionElement.hasAttribute('data-db-flow-remove')) {
      rerenderWith(currentFlows.filter((flowRecord, recordIndex) => recordIndex !== flowIndex));
      return;
    }
    if (actionElement.hasAttribute('data-db-flow-add-action')) {
      const defaultActionId = getFlowActionRecords()[0].id;
      currentFlows[flowIndex].actions = [...currentFlows[flowIndex].actions, { type: defaultActionId, options: {} }];
      rerenderWith(currentFlows);
      return;
    }
    const rowElement = actionElement.closest('[data-db-flow-action-index]');
    if (!rowElement) return;
    const actionIndex = Number(rowElement.getAttribute('data-db-flow-action-index'));
    currentFlows[flowIndex].actions = currentFlows[flowIndex].actions.filter(
      (actionRecord, recordIndex) => recordIndex !== actionIndex,
    );
    rerenderWith(currentFlows);
  });
};

export default attachFlowBuilderHandlers;
