import applySymbolElementFlag from './applySymbolElementFlag.js';
import getOverridableLeafKind from './getOverridableLeafKind.js';
import getSymbolOverrides from './getSymbolOverrides.js';
import getSymbolRecord from './getSymbolRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import replaceSymbolLeafComponent from './replaceSymbolLeafComponent.js';
import resolveDefinitionAtPath from './resolveDefinitionAtPath.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import resolveSymbolLeafAtPath from './resolveSymbolLeafAtPath.js';
import setSymbolOverrides from './setSymbolOverrides.js';

const resolveDefinitionType = (definitionRecord) => String((definitionRecord && definitionRecord.type) || 'default');

const applySymbolOverrides = (editor, instanceComponent) => {
  const storedOverrides = getSymbolOverrides(instanceComponent);
  const overridePaths = Object.keys(storedOverrides);
  if (!overridePaths.length) return;
  const symbolRecord = getSymbolRecord(editor, resolveSymbolIdOfComponent(instanceComponent));
  const keptOverrides = {};
  overridePaths.forEach((leafPath) => {
    const leafComponent = resolveSymbolLeafAtPath(instanceComponent, leafPath);
    const overrideDefinition = storedOverrides[leafPath];
    if (!leafComponent || !getOverridableLeafKind(leafComponent) || !isPlainRecord(overrideDefinition)) return;
    const masterDefinition = symbolRecord ? resolveDefinitionAtPath(symbolRecord.components, leafPath) : null;
    if (masterDefinition && resolveDefinitionType(masterDefinition) !== resolveDefinitionType(overrideDefinition))
      return;
    const replacedLeaf = replaceSymbolLeafComponent(leafComponent, overrideDefinition);
    if (!replacedLeaf) return;
    keptOverrides[leafPath] = overrideDefinition;
    applySymbolElementFlag(replacedLeaf, 'data-db-symbol-overridden', true);
  });
  if (Object.keys(keptOverrides).length !== overridePaths.length) setSymbolOverrides(instanceComponent, keptOverrides);
};

export default applySymbolOverrides;
