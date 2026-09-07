const findComponentAncestorByType = (component, componentType) => {
  let currentComponent = component && component.parent ? component.parent() : null;
  while (currentComponent && currentComponent.get) {
    if (String(currentComponent.get('type') || '') === componentType) return currentComponent;
    currentComponent = currentComponent.parent ? currentComponent.parent() : null;
  }
  return null;
};

export default findComponentAncestorByType;
