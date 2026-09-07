const resolveSymbolLeafPath = (instanceComponent, leafComponent) => {
  const indexPath = [];
  let currentComponent = leafComponent;
  while (currentComponent && currentComponent !== instanceComponent) {
    const parentComponent = currentComponent.parent ? currentComponent.parent() : null;
    if (!parentComponent) return '';
    const componentIndex = parentComponent.components().indexOf(currentComponent);
    if (componentIndex < 0) return '';
    indexPath.unshift(componentIndex);
    currentComponent = parentComponent;
  }
  return currentComponent === instanceComponent && indexPath.length ? indexPath.join('.') : '';
};

export default resolveSymbolLeafPath;
