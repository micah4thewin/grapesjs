import normalizeDefinitionRecord from './normalizeDefinitionRecord.js';
import stringifyRecordCanonically from './stringifyRecordCanonically.js';

const areDefinitionsEquivalent = (firstDefinition, secondDefinition) =>
  stringifyRecordCanonically(normalizeDefinitionRecord(firstDefinition)) ===
  stringifyRecordCanonically(normalizeDefinitionRecord(secondDefinition));

export default areDefinitionsEquivalent;
