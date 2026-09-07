import getSymbolOverrides from './getSymbolOverrides.js';
import resolveSymbolLeafPath from './resolveSymbolLeafPath.js';

const hasSymbolLeafOverride = (instanceComponent, leafComponent) => {
  const leafPath = resolveSymbolLeafPath(instanceComponent, leafComponent);
  return Boolean(leafPath && getSymbolOverrides(instanceComponent)[leafPath]);
};

export default hasSymbolLeafOverride;
