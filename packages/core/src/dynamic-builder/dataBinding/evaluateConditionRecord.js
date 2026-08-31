import resolveBindingPath from './resolveBindingPath.js';
import isPlainRecord from '../support/isPlainRecord.js';

const evaluateConditionRecord = (registry, conditionRecord) => {
  if (!isPlainRecord(conditionRecord)) return true;
  const conditionKind = conditionRecord.kind || 'always';
  if (conditionKind === 'always') return true;
  if (conditionKind === 'never') return false;
  const fieldValue = resolveBindingPath(registry, conditionRecord.field || '');
  if (conditionKind === 'fieldTruthy') {
    return Array.isArray(fieldValue) ? fieldValue.length > 0 : Boolean(fieldValue);
  }
  if (conditionKind === 'fieldEquals') {
    const actualText = String(fieldValue == null ? '' : fieldValue);
    const expectedText = String(conditionRecord.value == null ? '' : conditionRecord.value);
    return actualText === expectedText;
  }
  return true;
};

export default evaluateConditionRecord;
