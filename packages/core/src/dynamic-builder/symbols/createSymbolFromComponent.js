import createSymbolIdentifier from './createSymbolIdentifier.js';
import promoteSymbolSubtreeStyles from './promoteSymbolSubtreeStyles.js';
import resolveComponentDisplayName from './resolveComponentDisplayName.js';
import resolveUniqueSymbolName from './resolveUniqueSymbolName.js';
import saveSymbolRecord from './saveSymbolRecord.js';
import serializeComponentDefinition from './serializeComponentDefinition.js';
import stripDefinitionElementIds from './stripDefinitionElementIds.js';

const createSymbolFromComponent = (editor, sourceComponent, preferredName) => {
  const symbolId = createSymbolIdentifier();
  promoteSymbolSubtreeStyles(editor, sourceComponent, symbolId);
  const componentDefinition = serializeComponentDefinition(sourceComponent);
  if (!componentDefinition) return null;
  const symbolName = resolveUniqueSymbolName(editor, preferredName || resolveComponentDisplayName(sourceComponent));
  return saveSymbolRecord(editor, {
    id: symbolId,
    name: symbolName,
    createdAt: Date.now(),
    components: [stripDefinitionElementIds(componentDefinition)],
  });
};

export default createSymbolFromComponent;
