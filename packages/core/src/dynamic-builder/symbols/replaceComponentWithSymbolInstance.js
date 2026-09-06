const replaceComponentWithSymbolInstance = (sourceComponent, symbolId) => {
  const parentComponent = sourceComponent && sourceComponent.parent ? sourceComponent.parent() : null;
  if (!parentComponent) return null;
  const siblingCollection = parentComponent.components();
  const insertIndex = siblingCollection.indexOf(sourceComponent);
  const addedComponents = parentComponent.append(
    { type: 'db-symbol', attributes: { 'data-db-type': 'symbol', 'data-db-symbol': symbolId } },
    { at: insertIndex },
  );
  sourceComponent.remove();
  return addedComponents && addedComponents[0];
};

export default replaceComponentWithSymbolInstance;
