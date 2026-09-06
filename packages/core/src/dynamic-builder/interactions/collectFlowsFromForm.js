import getFlowActionRecords from './getFlowActionRecords.js';
import getFlowTriggerRecords from './getFlowTriggerRecords.js';

const readFieldValues = (scopeElement, fieldScope) => {
  const collectedValues = {};
  scopeElement.querySelectorAll('[data-db-flow-scope="' + fieldScope + '"]').forEach((fieldElement) => {
    const fieldName = fieldElement.getAttribute('data-db-flow-field');
    if (!fieldName) return;
    collectedValues[fieldName] =
      fieldElement.type === 'checkbox' ? String(fieldElement.checked) : String(fieldElement.value || '');
  });
  return collectedValues;
};

const collectFlowsFromForm = (formElement) => {
  const triggerRecords = getFlowTriggerRecords();
  const actionRecords = getFlowActionRecords();
  return [...formElement.querySelectorAll('[data-db-flow-index]')].map((cardElement) => {
    const flowIndex = cardElement.getAttribute('data-db-flow-index');
    const triggerElement = cardElement.querySelector('[data-db-flow-trigger]');
    const triggerId = triggerElement ? String(triggerElement.value) : triggerRecords[0].id;
    const actionElements = [...cardElement.querySelectorAll('[data-db-flow-action-index]')];
    return {
      id: cardElement.getAttribute('data-db-flow-id') || undefined,
      trigger: triggerId,
      triggerOptions: readFieldValues(cardElement, 'trigger:' + flowIndex),
      actions: actionElements.map((actionElement) => {
        const actionIndex = actionElement.getAttribute('data-db-flow-action-index');
        const typeElement = actionElement.querySelector('[data-db-flow-action-type]');
        const actionType = typeElement ? String(typeElement.value) : actionRecords[0].id;
        return {
          type: actionType,
          options: readFieldValues(actionElement, 'action:' + flowIndex + ':' + actionIndex),
        };
      }),
    };
  });
};

export default collectFlowsFromForm;
