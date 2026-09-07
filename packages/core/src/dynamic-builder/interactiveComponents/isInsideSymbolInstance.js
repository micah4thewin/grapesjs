const isInsideSymbolInstance = (component) => {
  let currentComponent = component && typeof component.parent === 'function' ? component.parent() : null;
  while (currentComponent) {
    if (String(currentComponent.get('type') || '') === 'db-symbol') return true;
    currentComponent = typeof currentComponent.parent === 'function' ? currentComponent.parent() : null;
  }
  return false;
};

export default isInsideSymbolInstance;
