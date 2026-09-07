const componentHasAttribute = (targetComponent, attributeName) => {
  const componentAttributes = targetComponent && targetComponent.getAttributes ? targetComponent.getAttributes() : {};
  return componentAttributes[attributeName] !== undefined;
};

export default componentHasAttribute;
