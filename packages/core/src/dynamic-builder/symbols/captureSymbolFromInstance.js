import collectSymbolLeafBaseline from './collectSymbolLeafBaseline.js';
import getSymbolRecord from './getSymbolRecord.js';
import promoteIdStylesToClass from './promoteIdStylesToClass.js';
import promoteSymbolSubtreeStyles from './promoteSymbolSubtreeStyles.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import saveSymbolRecord from './saveSymbolRecord.js';
import serializeSymbolChildren from './serializeSymbolChildren.js';
import setSymbolLeafBaseline from './setSymbolLeafBaseline.js';
import stripDefinitionElementIds from './stripDefinitionElementIds.js';

const buildRootClassName = (symbolId) => 'db-sym-' + String(symbolId).replace(/[^a-zA-Z0-9-]/g, '') + '-root';

const captureSymbolFromInstance = (editor, instanceComponent) => {
  const symbolId = resolveSymbolIdOfComponent(instanceComponent);
  const symbolRecord = symbolId ? getSymbolRecord(editor, symbolId) : null;
  if (!symbolRecord) return null;
  const rootClassName = buildRootClassName(symbolId);
  const hasRootStyles = promoteIdStylesToClass(editor, instanceComponent, rootClassName);
  instanceComponent
    .components()
    .forEach((childComponent) => promoteSymbolSubtreeStyles(editor, childComponent, symbolId));
  const capturedChildren = serializeSymbolChildren(instanceComponent)
    .filter(
      (childDefinition) =>
        !(childDefinition.attributes && childDefinition.attributes['data-db-symbol-placeholder'] === 'true'),
    )
    .map((childDefinition) => stripDefinitionElementIds(childDefinition));
  const savedRecord = saveSymbolRecord(editor, {
    ...symbolRecord,
    components: capturedChildren,
    rootClassName: hasRootStyles || symbolRecord.rootClassName ? rootClassName : '',
  });
  setSymbolLeafBaseline(editor, instanceComponent, collectSymbolLeafBaseline(instanceComponent));
  return savedRecord;
};

export default captureSymbolFromInstance;
