import getOverridableLeafKind from './getOverridableLeafKind.js';

const findOwningSymbolLeaf = (component, instanceComponent) => {
  let outermostLeaf = null;
  let currentComponent = component;
  while (currentComponent && currentComponent !== instanceComponent) {
    if (getOverridableLeafKind(currentComponent)) outermostLeaf = currentComponent;
    currentComponent = currentComponent.parent ? currentComponent.parent() : null;
  }
  return currentComponent === instanceComponent ? outermostLeaf : null;
};

export default findOwningSymbolLeaf;
