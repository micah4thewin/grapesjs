import collectSymbolLeafBaseline from './collectSymbolLeafBaseline.js';
import getSymbolRecord from './getSymbolRecord.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import saveSymbolRecord from './saveSymbolRecord.js';
import serializeSymbolChildren from './serializeSymbolChildren.js';
import setSymbolLeafBaseline from './setSymbolLeafBaseline.js';
import stripDefinitionElementIds from './stripDefinitionElementIds.js';

const captureSymbolFromInstance = (editor, instanceComponent) => {
  const symbolId = resolveSymbolIdOfComponent(instanceComponent);
  const symbolRecord = symbolId ? getSymbolRecord(editor, symbolId) : null;
  if (!symbolRecord) return null;
  const capturedChildren = serializeSymbolChildren(instanceComponent)
    .filter(
      (childDefinition) =>
        !(childDefinition.attributes && childDefinition.attributes['data-db-symbol-placeholder'] === 'true'),
    )
    .map((childDefinition) => stripDefinitionElementIds(childDefinition));
  const savedRecord = saveSymbolRecord(editor, { ...symbolRecord, components: capturedChildren });
  setSymbolLeafBaseline(editor, instanceComponent, collectSymbolLeafBaseline(instanceComponent));
  return savedRecord;
};

export default captureSymbolFromInstance;
