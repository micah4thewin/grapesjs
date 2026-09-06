const resolveComponentLabel = (component) => {
  if (!component) return 'this element';
  if (typeof component.getName === 'function') {
    const componentName = String(component.getName() || '').trim();
    if (componentName) return componentName;
  }
  return String((component.get && component.get('tagName')) || 'element');
};

export default resolveComponentLabel;
