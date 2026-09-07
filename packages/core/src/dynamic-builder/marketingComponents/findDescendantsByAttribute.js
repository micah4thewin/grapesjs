import walkComponentTree from '../support/walkComponentTree.js';

const findDescendantsByAttribute = (rootComponent, attributeName) => {
  const matchedComponents = [];
  walkComponentTree(rootComponent, (currentComponent) => {
    if (currentComponent === rootComponent || !currentComponent.getAttributes) return;
    if (currentComponent.getAttributes()[attributeName] !== undefined) matchedComponents.push(currentComponent);
  });
  return matchedComponents;
};

export default findDescendantsByAttribute;
