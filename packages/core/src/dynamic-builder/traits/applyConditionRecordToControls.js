import isPlainRecord from '../support/isPlainRecord.js';
import formatTraitDisplayValue from './formatTraitDisplayValue.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import toggleConditionControlVisibility from './toggleConditionControlVisibility.js';

const applyConditionRecordToControls = (wrapperElement, serializedRecord) => {
  let conditionRecord = { kind: 'always' };
  if (serializedRecord) {
    try {
      const parsedRecord = JSON.parse(serializedRecord);
      if (isPlainRecord(parsedRecord)) conditionRecord = parsedRecord;
    } catch (parseError) {
      conditionRecord = { kind: 'always' };
    }
  }
  const kindSelect = resolveTraitInnerElement(wrapperElement, '[data-db-condition-kind]');
  const fieldInput = resolveTraitInnerElement(wrapperElement, '[data-db-condition-field]');
  const valueInput = resolveTraitInnerElement(wrapperElement, '[data-db-condition-value]');
  const conditionKind = formatTraitDisplayValue(conditionRecord.kind) || 'always';
  const fieldText = formatTraitDisplayValue(conditionRecord.field);
  const valueText = formatTraitDisplayValue(conditionRecord.value);
  if (kindSelect && kindSelect.value !== conditionKind) kindSelect.value = conditionKind;
  if (fieldInput && fieldInput.value !== fieldText) fieldInput.value = fieldText;
  if (valueInput && valueInput.value !== valueText) valueInput.value = valueText;
  toggleConditionControlVisibility(wrapperElement, conditionKind);
};

export default applyConditionRecordToControls;
