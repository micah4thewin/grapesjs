const syncCodeCardFromAttribute = (component, attributeName, buildCardChildren) => {
  if (!component || !component.components || !component.getAttributes) return;
  const codeValue = String(component.getAttributes()[attributeName] || '');
  component.components(buildCardChildren(codeValue));
};

export default syncCodeCardFromAttribute;
