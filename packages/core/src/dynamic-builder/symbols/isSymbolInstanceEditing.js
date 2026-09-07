import getSymbolEditingRegistry from './getSymbolEditingRegistry.js';

const isSymbolInstanceEditing = (instanceComponent) => {
  if (!instanceComponent || !instanceComponent.cid) return false;
  return getSymbolEditingRegistry(instanceComponent.em)[instanceComponent.cid] === true;
};

export default isSymbolInstanceEditing;
