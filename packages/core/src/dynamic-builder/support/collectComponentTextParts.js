const collectComponentTextParts = (component) => {
  if (!component || !component.get) return '';
  const ownContent = String(component.get('content') || '');
  const childComponents = component.components ? component.components() : null;
  const childText = childComponents
    ? childComponents.map((childComponent) => collectComponentTextParts(childComponent)).join('')
    : '';
  return `${ownContent}${childText}`;
};

export default collectComponentTextParts;
