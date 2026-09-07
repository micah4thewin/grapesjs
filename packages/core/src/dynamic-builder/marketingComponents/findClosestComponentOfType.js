const findClosestComponentOfType = (startComponent, typeName) => {
  let currentComponent = startComponent;
  while (currentComponent && currentComponent.get) {
    if (String(currentComponent.get('type') || '') === typeName) return currentComponent;
    currentComponent = currentComponent.parent ? currentComponent.parent() : null;
  }
  return null;
};

export default findClosestComponentOfType;
