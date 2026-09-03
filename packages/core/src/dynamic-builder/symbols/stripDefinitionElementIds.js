import isPlainRecord from '../support/isPlainRecord.js';

const stripDefinitionElementIds = (definitionRecord) => {
  if (!isPlainRecord(definitionRecord)) return definitionRecord;
  const strippedRecord = { ...definitionRecord };
  if (isPlainRecord(strippedRecord.attributes)) {
    const strippedAttributes = { ...strippedRecord.attributes };
    delete strippedAttributes.id;
    strippedRecord.attributes = strippedAttributes;
  }
  delete strippedRecord.id;
  if (Array.isArray(strippedRecord.components)) {
    strippedRecord.components = strippedRecord.components.map((childRecord) => stripDefinitionElementIds(childRecord));
  }
  return strippedRecord;
};

export default stripDefinitionElementIds;
