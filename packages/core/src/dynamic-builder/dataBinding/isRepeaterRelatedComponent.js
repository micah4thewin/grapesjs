const isRepeaterRelatedComponent = (component) => {
  if (!component || typeof component.get !== 'function') return false;
  const componentType = component.get('type');
  if (componentType === 'db-repeater' || componentType === 'db-repeater-item') return true;
  return typeof component.findType === 'function' && component.findType('db-repeater').length > 0;
};

export default isRepeaterRelatedComponent;
