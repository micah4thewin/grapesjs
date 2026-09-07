import isPlainRecord from '../support/isPlainRecord.js';

const isRepeaterPreviewDefinition = (definitionRecord) =>
  isPlainRecord(definitionRecord) &&
  isPlainRecord(definitionRecord.attributes) &&
  Boolean(definitionRecord.attributes['data-db-repeater-preview']);

export default isRepeaterPreviewDefinition;
