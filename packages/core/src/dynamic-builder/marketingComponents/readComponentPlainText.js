import walkComponentTree from '../support/walkComponentTree.js';

const readComponentPlainText = (component) => {
  if (!component) return '';
  const textParts = [];
  walkComponentTree(component, (currentComponent) => {
    const isTextNode = String(currentComponent.get('type') || '') === 'textnode';
    const hasChildren = Boolean(currentComponent.components && currentComponent.components().length);
    if (isTextNode || !hasChildren) textParts.push(String(currentComponent.get('content') || ''));
  });
  return textParts.join('').trim();
};

export default readComponentPlainText;
