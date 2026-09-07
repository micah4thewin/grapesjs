import applySymbolElementFlag from './applySymbolElementFlag.js';
import areDefinitionsEquivalent from './areDefinitionsEquivalent.js';
import captureSymbolLeafDefinition from './captureSymbolLeafDefinition.js';
import getSymbolLeafBaseline from './getSymbolLeafBaseline.js';
import getSymbolOverrides from './getSymbolOverrides.js';
import getSymbolRecord from './getSymbolRecord.js';
import resolveDefinitionAtPath from './resolveDefinitionAtPath.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import resolveSymbolLeafPath from './resolveSymbolLeafPath.js';
import setSymbolOverrides from './setSymbolOverrides.js';

const recordSymbolLeafOverride = (editor, instanceComponent, leafComponent) => {
  const leafPath = resolveSymbolLeafPath(instanceComponent, leafComponent);
  const symbolRecord = getSymbolRecord(editor, resolveSymbolIdOfComponent(instanceComponent));
  if (!leafPath || !symbolRecord) return;
  const leafDefinition = captureSymbolLeafDefinition(leafComponent);
  if (!leafDefinition) return;
  const baselineDefinition =
    getSymbolLeafBaseline(editor, instanceComponent)[leafPath] ||
    resolveDefinitionAtPath(symbolRecord.components, leafPath);
  const matchesMaster = areDefinitionsEquivalent(baselineDefinition, leafDefinition);
  const nextOverrides = { ...getSymbolOverrides(instanceComponent) };
  if (matchesMaster && !nextOverrides[leafPath]) return;
  if (matchesMaster) delete nextOverrides[leafPath];
  else nextOverrides[leafPath] = leafDefinition;
  setSymbolOverrides(instanceComponent, nextOverrides);
  applySymbolElementFlag(leafComponent, 'data-db-symbol-overridden', !matchesMaster);
};

export default recordSymbolLeafOverride;
