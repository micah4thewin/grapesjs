import isPlainRecord from '../support/isPlainRecord.js';
import stripNestedSymbolChildren from './stripNestedSymbolChildren.js';

const droppedDefinitionKeys = [
  'status',
  'open',
  'selectable',
  'hoverable',
  'editable',
  'draggable',
  'droppable',
  'removable',
  'copyable',
  'layerable',
  'badgable',
  'highlightable',
  'toolbar',
  'script-props',
  '__symbol',
  '__symbols',
  '__symbol_ovrd',
  'dbSymbolRenderedId',
  'dbAddSectionWired',
];

const stripDefinitionRecord = (definitionRecord) => {
  const strippedRecord = {};
  Object.keys(definitionRecord).forEach((definitionKey) => {
    if (droppedDefinitionKeys.indexOf(definitionKey) >= 0) return;
    const definitionValue = definitionRecord[definitionKey];
    if (definitionKey === 'components' && Array.isArray(definitionValue)) {
      strippedRecord.components = definitionValue.map((childRecord) =>
        isPlainRecord(childRecord) ? stripDefinitionRecord(childRecord) : childRecord,
      );
      return;
    }
    strippedRecord[definitionKey] = definitionValue;
  });
  return strippedRecord;
};

const serializeComponentDefinition = (component) => {
  if (!component || typeof component.toJSON !== 'function') return null;
  const definitionRecord = JSON.parse(JSON.stringify(component.toJSON()));
  if (!isPlainRecord(definitionRecord)) return null;
  return stripNestedSymbolChildren(stripDefinitionRecord(definitionRecord));
};

export default serializeComponentDefinition;
