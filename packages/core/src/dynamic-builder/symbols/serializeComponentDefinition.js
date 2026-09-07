import isPlainRecord from '../support/isPlainRecord.js';
import stripDefinitionRecord from './stripDefinitionRecord.js';
import stripNestedSymbolChildren from './stripNestedSymbolChildren.js';

const serializeComponentDefinition = (component) => {
  if (!component || typeof component.toJSON !== 'function') return null;
  const definitionRecord = JSON.parse(JSON.stringify(component.toJSON()));
  if (!isPlainRecord(definitionRecord)) return null;
  return stripNestedSymbolChildren(stripDefinitionRecord(definitionRecord));
};

export default serializeComponentDefinition;
