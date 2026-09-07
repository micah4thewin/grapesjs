import isPlainRecord from '../support/isPlainRecord.js';

const isEmptyValue = (value) =>
  (Array.isArray(value) && !value.length) || (isPlainRecord(value) && !Object.keys(value).length);

const normalizeDefinitionRecord = (definitionRecord) => {
  if (Array.isArray(definitionRecord))
    return definitionRecord.map((childRecord) => normalizeDefinitionRecord(childRecord));
  if (!isPlainRecord(definitionRecord)) return definitionRecord;
  const normalizedRecord = {};
  Object.keys(definitionRecord).forEach((definitionKey) => {
    const definitionValue = definitionRecord[definitionKey];
    if (definitionKey === 'id' || isEmptyValue(definitionValue)) return;
    if (definitionKey === 'components' && typeof definitionValue === 'string') {
      normalizedRecord.components = [{ type: 'textnode', content: definitionValue }];
      return;
    }
    if (definitionKey === 'type' && definitionValue === 'default') return;
    normalizedRecord[definitionKey] = normalizeDefinitionRecord(definitionValue);
  });
  return normalizedRecord;
};

export default normalizeDefinitionRecord;
