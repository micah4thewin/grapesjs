const isComponentOfType = (component, typeName) =>
  Boolean(component && typeof component.get === 'function') && String(component.get('type') || '') === typeName;

export default isComponentOfType;
