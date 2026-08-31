const syncButtonRelFromTarget = (component) => {
  if (!component || !component.get || component.get('type') !== 'db-button') return;
  const componentAttributes = component.getAttributes();
  if (componentAttributes.target === '_blank') {
    if (componentAttributes.rel !== 'noopener noreferrer') component.addAttributes({ rel: 'noopener noreferrer' });
    return;
  }
  if (componentAttributes.rel) component.removeAttributes('rel');
};

export default syncButtonRelFromTarget;
