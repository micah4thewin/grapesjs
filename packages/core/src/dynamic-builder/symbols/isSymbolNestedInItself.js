import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';

const isSymbolNestedInItself = (instanceComponent) => {
  const symbolId = resolveSymbolIdOfComponent(instanceComponent);
  if (!symbolId) return false;
  let ancestorComponent = instanceComponent.parent ? instanceComponent.parent() : null;
  while (ancestorComponent && typeof ancestorComponent.get === 'function') {
    if (ancestorComponent.get('type') === 'db-symbol' && resolveSymbolIdOfComponent(ancestorComponent) === symbolId) {
      return true;
    }
    ancestorComponent = ancestorComponent.parent ? ancestorComponent.parent() : null;
  }
  return false;
};

export default isSymbolNestedInItself;
