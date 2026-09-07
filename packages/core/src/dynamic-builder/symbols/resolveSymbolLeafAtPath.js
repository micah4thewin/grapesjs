const resolveSymbolLeafAtPath = (instanceComponent, leafPath) => {
  if (!instanceComponent || !leafPath) return null;
  return String(leafPath)
    .split('.')
    .reduce((currentComponent, indexText) => {
      if (!currentComponent || typeof currentComponent.components !== 'function') return null;
      return currentComponent.components().at(Number(indexText)) || null;
    }, instanceComponent);
};

export default resolveSymbolLeafAtPath;
