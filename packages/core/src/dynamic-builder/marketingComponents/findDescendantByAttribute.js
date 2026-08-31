const findDescendantByAttribute = (rootComponent, attributeName) => {
  if (!rootComponent || !rootComponent.components) return null;
  const childCollection = rootComponent.components();
  const childModels = childCollection && childCollection.models ? childCollection.models : [];
  for (const childComponent of childModels) {
    const childAttributes = childComponent.getAttributes ? childComponent.getAttributes() : {};
    if (childAttributes[attributeName] !== undefined) return childComponent;
    const nestedMatch = findDescendantByAttribute(childComponent, attributeName);
    if (nestedMatch) return nestedMatch;
  }
  return null;
};

export default findDescendantByAttribute;
