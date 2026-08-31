import decodeBasicHtmlEntities from './decodeBasicHtmlEntities.js';

const collectComponentPlainText = (rootComponent) => {
  const textFragments = [];
  const visitComponent = (visitedComponent) => {
    if (!visitedComponent) return;
    const tagName = String((visitedComponent.get && visitedComponent.get('tagName')) || '').toLowerCase();
    if (tagName === 'svg' || tagName === 'style' || tagName === 'script') return;
    const componentType = visitedComponent.get ? visitedComponent.get('type') : '';
    if (componentType === 'comment') return;
    if (componentType === 'textnode') {
      textFragments.push(String(visitedComponent.get('content') || ''));
      return;
    }
    const childComponents = visitedComponent.components ? visitedComponent.components() : null;
    childComponents && childComponents.forEach((childComponent) => visitComponent(childComponent));
  };
  visitComponent(rootComponent);
  return decodeBasicHtmlEntities(textFragments.join(' '))
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export default collectComponentPlainText;
