import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const toggleConditionControlVisibility = (wrapperElement, conditionKind) => {
  const fieldInput = resolveTraitInnerElement(wrapperElement, '[data-db-condition-field]');
  const valueInput = resolveTraitInnerElement(wrapperElement, '[data-db-condition-value]');
  const needsField = conditionKind === 'fieldTruthy' || conditionKind === 'fieldEquals';
  if (fieldInput) fieldInput.hidden = !needsField;
  if (valueInput) valueInput.hidden = conditionKind !== 'fieldEquals';
};

export default toggleConditionControlVisibility;
