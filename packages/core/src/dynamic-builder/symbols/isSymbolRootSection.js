import getSymbolRecord from './getSymbolRecord.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import resolveSymbolRootDefinition from './resolveSymbolRootDefinition.js';

const isSymbolRootSection = (editor, instanceComponent) => {
  const rootDefinition = resolveSymbolRootDefinition(
    getSymbolRecord(editor, resolveSymbolIdOfComponent(instanceComponent)),
  );
  if (!rootDefinition) return false;
  return rootDefinition.type === 'db-section' || String(rootDefinition.tagName || '') === 'section';
};

export default isSymbolRootSection;
