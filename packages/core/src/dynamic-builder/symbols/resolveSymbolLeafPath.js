const resolveSymbolLeafPath = (instanceComponent, leafComponent) => {
  const indexPath = [];
  let currentComponent = leafComponent;
  while (currentComponent && currentComponent !== instanceComponent) {
    const parentComponent = currentComponent.parent ? currentComponent.parent() : null;
    if (!parentComponent) return '';
    indexPath.unshift(parentComponent.components().indexOf(currentComponent));
    currentComponent = parentComponent;
  }
  return currentComponent === instanceComponent && indexPath.length ? indexPath.join('.') : '';
};

export default resolveSymbolLeafPath;
