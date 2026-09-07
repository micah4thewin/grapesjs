import lockSymbolComponentTree from './lockSymbolComponentTree.js';

const setSymbolSubtreeLocked = (instanceComponent, isLocked) => {
  const childComponents = instanceComponent && instanceComponent.components ? instanceComponent.components() : null;
  if (!childComponents) return;
  childComponents.forEach((childComponent) => lockSymbolComponentTree(childComponent, isLocked, false));
};

export default setSymbolSubtreeLocked;
