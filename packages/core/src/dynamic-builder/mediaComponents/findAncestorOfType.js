const findAncestorOfType = (startComponent, typeName) => {
  let currentComponent = startComponent && startComponent.parent ? startComponent.parent() : null;
  while (currentComponent) {
    if (currentComponent.is && currentComponent.is(typeName)) return currentComponent;
    currentComponent = currentComponent.parent ? currentComponent.parent() : null;
  }
  return null;
};

export default findAncestorOfType;
