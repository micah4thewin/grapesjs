const hasSymbolPlaceholderOnly = (instanceComponent) => {
  const childComponents = instanceComponent && instanceComponent.components ? instanceComponent.components() : null;
  if (!childComponents || !childComponents.length) return false;
  return childComponents.every((childComponent) => {
    const attributesRecord = childComponent.getAttributes ? childComponent.getAttributes() : {};
    return attributesRecord['data-db-symbol-placeholder'] === 'true';
  });
};

export default hasSymbolPlaceholderOnly;
