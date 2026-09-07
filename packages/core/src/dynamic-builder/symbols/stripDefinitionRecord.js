import getEditorOnlyDefinitionKeys from './getEditorOnlyDefinitionKeys.js';
import isPlainRecord from '../support/isPlainRecord.js';
import isRepeaterPreviewDefinition from './isRepeaterPreviewDefinition.js';

const stripDefinitionRecord = (definitionRecord) => {
  const droppedKeys = getEditorOnlyDefinitionKeys();
  const strippedRecord = {};
  Object.keys(definitionRecord).forEach((definitionKey) => {
    if (droppedKeys.indexOf(definitionKey) >= 0) return;
    const definitionValue = definitionRecord[definitionKey];
    if (definitionKey === 'components' && Array.isArray(definitionValue)) {
      strippedRecord.components = definitionValue
        .filter((childRecord) => !isRepeaterPreviewDefinition(childRecord))
        .map((childRecord) => (isPlainRecord(childRecord) ? stripDefinitionRecord(childRecord) : childRecord));
      return;
    }
    strippedRecord[definitionKey] = definitionValue;
  });
  return strippedRecord;
};

export default stripDefinitionRecord;
