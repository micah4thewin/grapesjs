import walkComponentTree from '../support/walkComponentTree.js';

const findComponentsByAttribute = (rootComponent, attributeName) => {
  const matchingComponents = [];
  walkComponentTree(rootComponent, (currentComponent) => {
    if (currentComponent === rootComponent || typeof currentComponent.getAttributes !== 'function') return;
    if (currentComponent.getAttributes()[attributeName] !== undefined) matchingComponents.push(currentComponent);
  });
  return matchingComponents;
};

export default findComponentsByAttribute;
