import walkComponentTree from '../support/walkComponentTree.js';

const readComponentPlainText = (rootComponent) => {
  const textParts = [];
  walkComponentTree(rootComponent, (visitedComponent) => {
    if (!visitedComponent || !visitedComponent.is || !visitedComponent.is('textnode')) return;
    textParts.push(String(visitedComponent.get('content') || ''));
  });
  return textParts.join('').replace(/\s+/g, ' ').trim();
};

export default readComponentPlainText;
