const demoteHeadingComponent = (editor, component) => {
  if (!component || !component.get) return false;
  const tagName = String(component.get('tagName') || '').toLowerCase();
  if (tagName !== 'h1') return false;
  const componentAttributes = component.getAttributes ? component.getAttributes() : {};
  if (componentAttributes['data-db-level'] !== undefined) component.addAttributes({ 'data-db-level': '2' });
  component.set({ tagName: 'h2' });
  return true;
};

export default demoteHeadingComponent;
