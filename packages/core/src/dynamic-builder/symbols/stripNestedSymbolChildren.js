import isPlainRecord from '../support/isPlainRecord.js';

const isSymbolDefinition = (definitionRecord) =>
  definitionRecord.type === 'db-symbol' ||
  (isPlainRecord(definitionRecord.attributes) && definitionRecord.attributes['data-db-type'] === 'symbol');

const stripNestedSymbolChildren = (definitionRecord) => {
  if (!isPlainRecord(definitionRecord)) return definitionRecord;
  if (isSymbolDefinition(definitionRecord)) {
    const referenceRecord = { ...definitionRecord };
    delete referenceRecord.components;
    return referenceRecord;
  }
  if (!Array.isArray(definitionRecord.components)) return definitionRecord;
  return {
    ...definitionRecord,
    components: definitionRecord.components.map((childRecord) => stripNestedSymbolChildren(childRecord)),
  };
};

export default stripNestedSymbolChildren;
