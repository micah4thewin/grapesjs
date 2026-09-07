const readComponentPlainText = (component) => {
  if (!component || !component.get) return '';
  const ownContent = String(component.get('content') || '');
  const childComponents = component.components ? component.components() : null;
  const childText = childComponents
    ? childComponents.map((childComponent) => readComponentPlainText(childComponent)).join('')
    : '';
  return `${ownContent}${childText}`.replace(/\s+/g, ' ').trim();
};

export default readComponentPlainText;
