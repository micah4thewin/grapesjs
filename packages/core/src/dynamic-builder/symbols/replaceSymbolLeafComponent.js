const replaceSymbolLeafComponent = (leafComponent, leafDefinition) => {
  const parentComponent = leafComponent && leafComponent.parent ? leafComponent.parent() : null;
  if (!parentComponent || !leafDefinition) return null;
  const leafIndex = parentComponent.components().indexOf(leafComponent);
  leafComponent.remove();
  const addedComponents = parentComponent.append(JSON.parse(JSON.stringify(leafDefinition)), { at: leafIndex });
  return (addedComponents && addedComponents[0]) || null;
};

export default replaceSymbolLeafComponent;
