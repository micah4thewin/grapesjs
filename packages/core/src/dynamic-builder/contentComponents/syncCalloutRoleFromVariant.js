const syncCalloutRoleFromVariant = (component) => {
  if (!component || !component.get || component.get('type') !== 'db-callout') return;
  const componentAttributes = component.getAttributes();
  const nextRoleValue = componentAttributes['data-db-variant'] === 'error' ? 'alert' : 'note';
  if (componentAttributes.role !== nextRoleValue) component.addAttributes({ role: nextRoleValue });
};

export default syncCalloutRoleFromVariant;
