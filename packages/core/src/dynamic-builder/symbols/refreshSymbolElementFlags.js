import applySymbolElementFlag from './applySymbolElementFlag.js';
import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import getSymbolOverrides from './getSymbolOverrides.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import resolveSymbolLeafPath from './resolveSymbolLeafPath.js';

const refreshSymbolElementFlags = (component) => {
  if (!component || typeof component.get !== 'function') return;
  if (component.get('type') === 'db-symbol') {
    applySymbolElementFlag(component, 'data-db-symbol-editing', isSymbolInstanceEditing(component));
    return;
  }
  const instanceComponent = findOwningSymbolInstance(component);
  if (!instanceComponent) return;
  const storedOverrides = getSymbolOverrides(instanceComponent);
  if (!Object.keys(storedOverrides).length) return;
  const leafPath = resolveSymbolLeafPath(instanceComponent, component);
  applySymbolElementFlag(component, 'data-db-symbol-overridden', Boolean(leafPath && storedOverrides[leafPath]));
};

export default refreshSymbolElementFlags;
