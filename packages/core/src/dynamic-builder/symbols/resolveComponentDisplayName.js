const resolveComponentDisplayName = (component) => {
  if (!component) return '';
  if (typeof component.getName === 'function') return String(component.getName() || '');
  return String((component.get && component.get('name')) || '');
};

export default resolveComponentDisplayName;
