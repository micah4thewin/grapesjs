const writeComponentAttributeValue = (targetComponent, attributeName, attributeValue) => {
  if (!targetComponent || !targetComponent.addAttributes) return;
  if (attributeValue === '' || attributeValue === undefined || attributeValue === null) {
    targetComponent.removeAttributes([attributeName]);
    return;
  }
  targetComponent.addAttributes({ [attributeName]: attributeValue });
};

export default writeComponentAttributeValue;
