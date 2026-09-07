const resolveAuditElementComponent = (element) => {
  if (!element) return null;
  if (element.getId && element.getAttributes) return element;
  const elementView = element.__gjsv;
  return elementView && elementView.model ? elementView.model : null;
};

export default resolveAuditElementComponent;
