import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const readConditionControls = (wrapperElement) => {
  const kindSelect = resolveTraitInnerElement(wrapperElement, '[data-db-condition-kind]');
  const fieldInput = resolveTraitInnerElement(wrapperElement, '[data-db-condition-field]');
  const valueInput = resolveTraitInnerElement(wrapperElement, '[data-db-condition-value]');
  if (!kindSelect || !fieldInput || !valueInput) return null;
  const conditionKind = kindSelect.value || 'always';
  const conditionRecord = { kind: conditionKind };
  if (conditionKind === 'fieldTruthy' || conditionKind === 'fieldEquals') {
    conditionRecord.field = fieldInput.value.trim();
  }
  if (conditionKind === 'fieldEquals') conditionRecord.value = valueInput.value;
  return conditionRecord;
};

export default readConditionControls;
